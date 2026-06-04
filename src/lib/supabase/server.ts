import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// ---------------------------------------------------------------------------
// Runtime environment validation
// Validated once when the module is first imported on the server.
// Missing vars throw immediately — never reach a silent network failure.
// ---------------------------------------------------------------------------
function getEnvVars(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "[supabase/server] Missing required environment variables.\n" +
        "  NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.\n" +
        "  Ensure .env.local is present and the dev server has been restarted.",
    );
  }

  return { url, anonKey };
}

/**
 * Creates a Supabase client for use on the **server side**:
 *   - Server Components
 *   - Server Actions (`"use server"`)
 *   - Route Handlers (`app/api/*`)
 *
 * Auth tokens are read from and written back to the request's cookie store
 * via Next.js `cookies()`. Row Level Security (RLS) policies are respected
 * automatically — no extra auth headers needed.
 *
 * **Must be `await`-ed** — `cookies()` is async in Next.js 15+.
 *
 * The `setAll` implementation wraps cookie writes in a try/catch because
 * Server Components cannot mutate cookies directly. When the proxy
 * (`src/proxy.ts`) is running, it handles token refresh and cookie writes
 * on every request, so this silent failure is safe.
 *
 * @returns A configured `SupabaseClient` bound to the current request context.
 *
 * @example
 * ```ts
 * // Server Component
 * import { createClient } from "@/lib/supabase/server"
 *
 * export default async function Page() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from("courses").select()
 *   // ...
 * }
 * ```
 */
export async function createClient(): Promise<SupabaseClient> {
  const { url, anonKey } = getEnvVars();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component where cookie mutation is not
          // permitted. The proxy layer handles token refresh cookie writes.
        }
      },
    },
  });
}
