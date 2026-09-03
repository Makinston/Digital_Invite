import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";

// Public endpoint for the "Check Seat Number" lookup — deliberately returns
// only name + seat_number, nothing else (no token, whatsapp, email, etc.).
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name")?.trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Enter at least 2 characters" }, { status: 400 });
  }

  if (!isDbConfigured || !db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  await ensureSchema();

  const result = await db.execute({
    sql: "select name, seat_number from guests where lower(name) like lower(?) order by name limit 10",
    args: [`%${name}%`],
  });

  const matches = result.rows.map((r) => ({
    name: r.name as string,
    seat_number: r.seat_number as string | null,
  }));

  return NextResponse.json({ matches });
}
