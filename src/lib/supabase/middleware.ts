import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------
const PROTECTED_ROUTES = ["/dashboard", "/courses", "/activity", "/settings"];

// ---------------------------------------------------------------------------
// Runtime environment validation
// ---------------------------------------------------------------------------
function getEnvVars(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn(
      "[supabase/middleware] Missing required environment variables.\n" +
        "  NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.\n" +
        "  Proxy session refreshing will be bypassed gracefully."
    );
    return null;
  }

  return { url, anonKey };
}

/**
 * Refreshes the Supabase auth session on every request and enforces
 * route-level authentication.
 *
 * - Public routes (/, /login, /signup): accessible to everyone.
 * - Protected routes (/dashboard, /courses, /activity, /settings):
 *   redirect to /login if the user has no valid session.
 * - Authenticated users visiting /login or /signup are redirected to /dashboard.
 *
 * @param request - The incoming Next.js proxy request object.
 * @returns A NextResponse — either pass-through, or a redirect.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = NextResponse.next({ request });

  const env = getEnvVars();
  if (!env) {
    return supabaseResponse;
  }

  const { url, anonKey } = env;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // CRITICAL: Do not add logic between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Redirect unauthenticated users away from protected routes ──
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect authenticated users away from auth pages ──
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}
