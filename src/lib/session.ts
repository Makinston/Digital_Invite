import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

/** Stateless, HMAC-signed session token — no database round trip needed. */
export function createSessionToken(): string {
  const expires = Date.now() + ADMIN_COOKIE_MAX_AGE * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  let a: Buffer, b: Buffer;
  try {
    a = Buffer.from(signature, "base64url");
    b = Buffer.from(sign(payload), "base64url");
  } catch {
    return false;
  }
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now();
}

/** Constant-time password check against ADMIN_PASSWORD. */
export function verifyPassword(candidate: string): boolean {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  const a = createHmac("sha256", getSecret()).update(candidate).digest();
  const b = createHmac("sha256", getSecret()).update(real).digest();
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Use inside Route Handlers — Proxy's check is optimistic only, this is the real gate. */
export function isAdminRequest(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}
