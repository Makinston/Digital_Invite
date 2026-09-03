import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";
import { isAdminRequest } from "@/lib/session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured || !db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  await ensureSchema();

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const seatNumber = body?.seat_number;

  if (seatNumber !== null && typeof seatNumber !== "string") {
    return NextResponse.json(
      { error: "seat_number must be a string or null" },
      { status: 400 }
    );
  }

  const cleaned = typeof seatNumber === "string" ? seatNumber.trim() || null : null;

  try {
    await db.execute({
      sql: "update guests set seat_number = ? where id = ?",
      args: [cleaned, id],
    });
    const result = await db.execute({
      sql: "select id, seat_number from guests where id = ?",
      args: [id],
    });
    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json({
      guest: { id: row.id as string, seat_number: row.seat_number as string | null },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDbConfigured || !db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  await ensureSchema();

  const { id } = await params;

  try {
    // RSVPs are kept even if the guest is deleted — a submitted message
    // shouldn't disappear just because the guest entry was removed; it just
    // shows up as unlinked ("No invite link") in the submissions panel.
    const result = await db.execute({ sql: "delete from guests where id = ?", args: [id] });
    if (result.rowsAffected === 0) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
