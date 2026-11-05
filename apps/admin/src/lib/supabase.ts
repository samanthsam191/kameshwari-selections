import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/** True once the Supabase env vars are present (set at build time). */
export const isSupabaseConfigured = Boolean(url && anon);

let browser: SupabaseClient | null = null;

/** Singleton browser client — carries the admin's auth session for reads & writes. */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!browser) {
    browser = createClient(url, anon, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  }
  return browser;
}
