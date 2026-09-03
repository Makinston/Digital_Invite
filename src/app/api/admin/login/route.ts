import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  createSessionToken,
  verifyPassword,
} from "@/lib/session";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Admin login is not configured (ADMIN_PASSWORD / ADMIN_SESSION_SECRET missing)" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ success: true });
}
