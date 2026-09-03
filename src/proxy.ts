import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/session";

// Next.js 16 renamed Middleware to Proxy — same mechanics, new filename/export.
// This is an optimistic check only (cookie signature + expiry, no DB round trip).
// The real gate lives in each admin Route Handler via isAdminRequest().
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
