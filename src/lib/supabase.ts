import { createClient } from "@supabase/supabase-js";

export type Guest = {
  id: string;
  token: string;
  name: string;
  email?: string;
  created_at: string;
};

export type RSVP = {
  id: string;
  guest_token?: string;
  name: string;
  whatsapp?: string;
  attending: boolean;
  plus_one: boolean;
  message?: string;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const SUPABASE_SCHEMA = `
-- Run this in your Supabase SQL editor

create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  name text not null,
  email text,
  created_at timestamptz default now()
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_token text references guests(token) on delete set null,
  name text not null,
  whatsapp text,
  attending boolean not null,
  plus_one boolean default false,
  message text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table guests enable row level security;
alter table rsvps enable row level security;

-- Allow public reads on guests (for token lookup)
create policy "Public can read guests by token"
  on guests for select using (true);

-- Allow public inserts on rsvps
create policy "Anyone can submit RSVP"
  on rsvps for insert with check (true);

-- Allow public reads on rsvps (for guest wall)
create policy "Public can read RSVPs"
  on rsvps for select using (true);
`;
