import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Runtime environment validation
// Validated once at module load; throws before any query can silently fail.
// ---------------------------------------------------------------------------
function getEnvVars(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "[supabase/client] Missing required environment variables.\n" +
        "  NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.\n" +
        "  Copy .env.example → .env.local and fill in your Supabase project credentials.",
    );
  }

  return { url, anonKey };
}

// ---------------------------------------------------------------------------
// Singleton — one SupabaseClient instance per browser tab.
// Avoids the "Multiple GoTrue instances" console warning in development and
// prevents redundant auth listeners from being registered on every render.
// ---------------------------------------------------------------------------
let _client: SupabaseClient | null = null;

/**
 * Returns a Supabase client for use in **Client Components** and hooks.
 *
 * Auth tokens are managed via browser cookies and kept in sync automatically
 * by `@supabase/ssr`. The same instance is returned on every call within a
 * single browser session (singleton pattern).
 *
 * ⚠️  Do NOT call this at module scope — call it inside a component body or
 * custom hook so React's rendering lifecycle controls its initialization.
 *
 * @example
 * ```tsx
 * "use client"
 * import { createClient } from "@/lib/supabase/client"
 *
 * export function CourseList() {
 *   const supabase = createClient()
 *   // ...
 * }
 * ```
 */
export function createClient(): SupabaseClient {
  if (_client) return _client;

  const { url, anonKey } = getEnvVars();
  _client = createBrowserClient(url, anonKey);
  return _client;
}
