import { createHash } from "crypto";

export function generateToken(name: string, index: number): string {
  const raw = `${name}-${index}-${Date.now()}`;
  return createHash("sha256").update(raw).digest("hex").slice(0, 12);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 30);
}
