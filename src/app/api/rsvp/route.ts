import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, attending, plusOne, dietary, message, guestToken } = body;

  if (!name || attending === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("rsvps").insert({
      guest_token: guestToken ?? null,
      name,
      attending,
      plus_one: plusOne ?? false,
      dietary: dietary ?? null,
      message: message ?? null,
    });

    if (error) {
      console.error("Supabase RSVP error:", error.message);
      // Still return success to the guest — don't let DB errors break the UX
    }
  }

  return NextResponse.json({ success: true });
}
