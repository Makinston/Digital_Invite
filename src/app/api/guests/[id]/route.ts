import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabaseAdmin";
import { isAdminRequest } from "@/lib/session";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const seatNumber = body?.seat_number;

  if (seatNumber !== null && typeof seatNumber !== "string") {
    return NextResponse.json(
      { error: "seat_number must be a string or null" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("guests")
    .update({ seat_number: seatNumber?.trim() || null })
    .eq("id", id)
    .select("id, seat_number")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data });
}
