import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, whatsapp, attending, plusOne, message, guestToken } = body;

  if (!name || attending === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isDbConfigured && db) {
    await ensureSchema();
    try {
      await db.execute({
        sql: `insert into rsvps (id, guest_token, name, whatsapp, attending, plus_one, message)
              values (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          crypto.randomUUID(),
          guestToken ?? null,
          name,
          whatsapp ?? null,
          attending ? 1 : 0,
          plusOne ? 1 : 0,
          message ?? null,
        ],
      });
    } catch (err) {
      console.error("RSVP insert error:", err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ success: true });
}
