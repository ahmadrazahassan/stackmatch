import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cookie-less anon client for public data fetching.
// Keeps public pages statically renderable (ISR) — RLS exposes published rows only.
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes("placeholder") && url !== "your_supabase_url");
}
