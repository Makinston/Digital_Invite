import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { generateToken, slugify } from "@/lib/tokens";

export async function GET() {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data: guests, error: gErr } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: rsvps, error: rErr } = await supabase
    .from("rsvps")
    .select("guest_token, attending, plus_one, name, created_at");

  if (gErr || rErr) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const rsvpMap = new Map(rsvps?.map((r) => [r.guest_token ?? r.name, r]) ?? []);

  const enriched = (guests ?? []).map((g) => ({
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

  return NextResponse.json({ guests: enriched, stats });
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body = await request.json();
  const { names } = body as { names: string[] };

  if (!Array.isArray(names) || names.length === 0) {
    return NextResponse.json({ error: "names array required" }, { status: 400 });
  }

  const rows = names
    .filter((n) => n.trim())
    .map((name, i) => ({
      name: name.trim(),
      token: slugify(name) + "-" + generateToken(name, i),
    }));

  const { data, error } = await supabase
    .from("guests")
    .upsert(rows, { onConflict: "token" })
    .select("name, token");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ created: data });
}
