import { createClient, type Client } from "@libsql/client";

/**
 * Turso (libSQL — SQLite over HTTP) replaces Supabase here: no dashboard,
 * no RLS policies, no auth/storage extras — just a database URL + token.
 * Every query in this app already goes through our own Route Handlers or
 * Server Components (never called directly from the browser), so a single
 * trusted server-side client is enough — no separate "public" vs "admin"
 * client is needed the way Supabase's RLS model required.
 *
 * Setup (free): https://turso.tech → create a database → grab the URL and
 * an auth token → put them in .env.local as TURSO_DATABASE_URL and
 * TURSO_AUTH_TOKEN. Tables are created automatically on first use below.
 */

export type Guest = {
  id: string;
  token: string;
  name: string;
  email: string | null;
  seat_number: string | null;
  created_at: string;
};

export type RSVP = {
  id: string;
  guest_token: string | null;
  name: string;
  whatsapp: string | null;
  attending: boolean;
  plus_one: boolean;
  message: string | null;
  created_at: string;
};

const url = process.env.TURSO_DATABASE_URL ?? "";
const authToken = process.env.TURSO_AUTH_TOKEN ?? "";

export const isDbConfigured = Boolean(url);

export const db: Client | null = isDbConfigured ? createClient({ url, authToken }) : null;

const SCHEMA_STATEMENTS = [
  `create table if not exists guests (
    id text primary key,
    token text unique not null,
    name text not null,
    email text,
    seat_number text,
    created_at text not null default (datetime('now'))
  )`,
  // guest_token is intentionally a plain column, not a foreign key: libSQL
  // enforces FK constraints strictly (unlike vanilla SQLite), so a mismatched
  // or stale token would silently fail the whole insert. Losing a guest's
  // RSVP is worse than an unenforced reference — it's still joined to a
  // guest in application code via a simple string match.
  `create table if not exists rsvps (
    id text primary key,
    guest_token text,
    name text not null,
    whatsapp text,
    attending integer not null,
    plus_one integer not null default 0,
    message text,
    created_at text not null default (datetime('now'))
  )`,
];

let schemaReady: Promise<void> | null = null;

/** Idempotent — safe to call on every request; only runs the DDL once per cold start. */
export function ensureSchema(): Promise<void> {
  if (!db) return Promise.resolve();
  if (!schemaReady) {
    schemaReady = db
      .batch(
        SCHEMA_STATEMENTS.map((sql) => ({ sql, args: [] })),
        "write"
      )
      .then(() => undefined);
  }
  return schemaReady;
}
