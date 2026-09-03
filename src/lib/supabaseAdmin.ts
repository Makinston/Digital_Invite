import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client using the Supabase service_role key — bypasses RLS.
 * Only ever import this from Route Handlers, never from a "use client" file.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseAdminConfigured =
  Boolean(supabaseUrl) && Boolean(serviceRoleKey);

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;
