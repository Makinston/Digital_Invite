import { NextResponse } from "next/server";
import { db, isDbConfigured, ensureSchema } from "@/lib/db";

// Public endpoint — powers the Love Wall on the site itself, so it only ever
// exposes what a guest already chose to share (name + message), nothing else.
export async function GET() {
  if (!isDbConfigured || !db) {
    return NextResponse.json({ messages: [] });
  }
  await ensureSchema();

  const result = await db.execute(
    `select name, message, created_at from rsvps
     where message is not null and trim(message) <> ''
     order by created_at desc
     limit 60`
  );

  const messages = result.rows.map((r) => ({
    name: r.name as string,
    message: r.message as string,
    created_at: r.created_at as string,
  }));

  return NextResponse.json({ messages });
}
