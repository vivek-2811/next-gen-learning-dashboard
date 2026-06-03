import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client for use in:
 *   - Server Components
 *   - Server Actions  (`"use server"`)
 *   - Route Handlers  (app/api/*)
 *
 * Auth tokens are read from and written back to the request's cookie store
 * via Next.js `cookies()`. This keeps the session in sync with the browser
 * without any client-side JavaScript for the auth token exchange.
 *
 * IMPORTANT: This function must be `await`-ed because `cookies()` is async
 * in Next.js 15+.
 *
 * Usage (Server Component):
 *   const supabase = await createClient()
 *   const { data, error } = await supabase.from('courses').select()
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
            // The `setAll` method is called from a Server Component.
            // This error can safely be ignored if a Middleware is refreshing
            // the session — the Middleware will write the updated cookies.
          }
        },
      },
    },
  );
}
