import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Client Components.
 *
 * This client reads/writes auth tokens via browser cookies, which are
 * automatically kept in sync by @supabase/ssr.
 *
 * Usage:
 *   const supabase = createClient()
 *   const { data } = await supabase.from('courses').select()
 *
 * Call this function inside a component or hook — never at module scope —
 * so that each render gets a fresh client tied to the current cookie state.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
