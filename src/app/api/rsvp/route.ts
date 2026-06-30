import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, whatsapp, attending, plusOne, message, guestToken } = body;

  if (!name || attending === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("rsvps").insert({
      guest_token: guestToken ?? null,
      name,
      whatsapp: whatsapp ?? null,
      attending,
      plus_one: plusOne ?? false,
      message: message ?? null,
    });

    if (error) {
      console.error("Supabase RSVP error:", error.message);
    }
  }

  return NextResponse.json({ success: true });
}
