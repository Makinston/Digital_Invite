import { NextRequest, NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";
import { isAdminRequest } from "@/lib/session";

// Accepts a partial update — any combination of name / seat_number / email.
// Only the fields actually present in the body are touched, so the existing
// seat-only PATCH calls (from the inline seat editor) keep working unchanged.
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
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const sets: string[] = [];
  const args: (string | null)[] = [];

  if ("name" in body) {
    const name = body.name;
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "name must be a non-empty string" }, { status: 400 });
    }
    sets.push("name = ?");
    args.push(name.trim());
  }

  if ("seat_number" in body) {
    const seatNumber = body.seat_number;
    if (seatNumber !== null && typeof seatNumber !== "string") {
      return NextResponse.json(
        { error: "seat_number must be a string or null" },
        { status: 400 }
      );
    }
    sets.push("seat_number = ?");
    args.push(typeof seatNumber === "string" ? seatNumber.trim() || null : null);
  }

  if ("email" in body) {
    const email = body.email;
    if (email !== null && typeof email !== "string") {
      return NextResponse.json({ error: "email must be a string or null" }, { status: 400 });
    }
    sets.push("email = ?");
    args.push(typeof email === "string" ? email.trim() || null : null);
  }

  if (sets.length === 0) {
    return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
  }

  try {
    await db.execute({
      sql: `update guests set ${sets.join(", ")} where id = ?`,
      args: [...args, id],
    });
    const result = await db.execute({
      sql: "select id, token, name, email, seat_number, created_at from guests where id = ?",
      args: [id],
    });
    const row = result.rows[0];
    if (!row) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json({
      guest: {
        id: row.id as string,
        token: row.token as string,
        name: row.name as string,
        email: row.email as string | null,
        seat_number: row.seat_number as string | null,
        created_at: row.created_at as string,
      },
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
