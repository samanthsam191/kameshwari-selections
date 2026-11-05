import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/** True once the Supabase env vars are present (set at build time). */
export const isSupabaseConfigured = Boolean(url && anon);

/** Stateless client for server-side public reads (no session). */
export function getServerSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}
