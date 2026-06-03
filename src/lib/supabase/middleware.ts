import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Refreshes the Supabase auth session on every request.
 *
 * This helper MUST be called from the root `src/middleware.ts` file on every
 * matched route. Without it, the server-side session will expire and users
 * will be unexpectedly logged out.
 *
 * What it does:
 *   1. Reads the current session cookie from the incoming request.
 *   2. Calls `supabase.auth.getUser()` which transparently refreshes an
 *      expired access token using the stored refresh token.
 *   3. Writes any updated cookies (new access/refresh tokens) onto the
 *      outgoing response so the browser receives them.
 *
 * Usage in `src/proxy.ts` (Next.js 16+ — previously `src/middleware.ts`):
 *   import { updateSession } from "@/lib/supabase/middleware"
 *   export async function proxy(request: NextRequest) {
 *     return await updateSession(request)
 *   }
 *
 * @param request - The incoming Next.js middleware request object.
 * @returns A NextResponse with refreshed auth cookies applied.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  // Start with a pass-through response that we will mutate.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // First, write cookies back onto the request so subsequent
          // server-side reads in this same request see the updated values.
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Recreate the response to include the mutated request cookies,
          // then also set them on the response so the browser receives them.
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // CRITICAL: Do not add logic between createServerClient and getUser().
  // A seemingly innocent early return could prevent the token refresh from
  // writing back to the browser, causing a subtle auth desync bug.
  await supabase.auth.getUser();

  return supabaseResponse;
}
