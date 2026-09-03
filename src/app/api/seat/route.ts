import { NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";

// Public endpoint for the "Check Seat Number" directory — deliberately
// returns only name + seat_number, nothing else (no token, whatsapp, etc.).
// The guest list is small (a few hundred at most), so we just return
// everyone and let the client filter as they type — instant, no round trips.
export async function GET() {
  if (!isDbConfigured || !db) {
    return NextResponse.json({ guests: [] });
  }
  await ensureSchema();

  const result = await db.execute("select name, seat_number from guests order by name asc");

  const guests = result.rows.map((r) => ({
    name: r.name as string,
    seat_number: r.seat_number as string | null,
  }));

  return NextResponse.json({ guests });
}
