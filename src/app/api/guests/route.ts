import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";
import { isAdminRequest } from "@/lib/session";
import { generateToken, slugify } from "@/lib/tokens";

interface RsvpRow {
  id: string;
  guest_token: string | null;
  attending: boolean;
  plus_one: boolean;
  name: string;
  whatsapp: string | null;
  message: string | null;
  created_at: string;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured || !db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  await ensureSchema();

  const [guestsResult, rsvpsResult] = await Promise.all([
    db.execute("select * from guests order by created_at asc"),
    db.execute(
      "select id, guest_token, attending, plus_one, name, whatsapp, message, created_at from rsvps order by created_at desc"
    ),
  ]);

  const guests = guestsResult.rows.map((r) => ({
    id: r.id as string,
    token: r.token as string,
    name: r.name as string,
    email: r.email as string | null,
    seat_number: r.seat_number as string | null,
    created_at: r.created_at as string,
  }));

  const rsvps: RsvpRow[] = rsvpsResult.rows.map((r) => ({
    id: r.id as string,
    guest_token: r.guest_token as string | null,
    attending: Boolean(r.attending),
    plus_one: Boolean(r.plus_one),
    name: r.name as string,
    whatsapp: r.whatsapp as string | null,
    message: r.message as string | null,
    created_at: r.created_at as string,
  }));

  const rsvpMap = new Map(rsvps.map((r) => [r.guest_token ?? r.name, r]));

  const enriched = guests.map((g) => ({
    ...g,
    rsvp: rsvpMap.get(g.token) ?? null,
  }));

  const stats = {
    total: enriched.length,
    responded: enriched.filter((g) => g.rsvp).length,
    attending: enriched.filter((g) => g.rsvp?.attending).length,
    declined: enriched.filter((g) => g.rsvp && !g.rsvp.attending).length,
    plusOnes: enriched.filter((g) => g.rsvp?.plus_one).length,
    pending: enriched.filter((g) => !g.rsvp).length,
  };

  return NextResponse.json({ guests: enriched, stats, rsvps });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured || !db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  await ensureSchema();

  const body = await request.json();
  const { names } = body as { names: string[] };

  if (!Array.isArray(names) || names.length === 0) {
    return NextResponse.json({ error: "names array required" }, { status: 400 });
  }

  const rows = names
    .filter((n) => n.trim())
    .map((name, i) => ({
      id: crypto.randomUUID(),
      name: name.trim(),
      token: slugify(name) + "-" + generateToken(name, i),
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "names array required" }, { status: 400 });
  }

  try {
    await db.batch(
      rows.map((r) => ({
        sql: `insert into guests (id, token, name) values (?, ?, ?)
              on conflict(token) do update set name = excluded.name`,
        args: [r.id, r.token, r.name],
      })),
      "write"
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Insert failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ created: rows.map((r) => ({ name: r.name, token: r.token })) });
}
