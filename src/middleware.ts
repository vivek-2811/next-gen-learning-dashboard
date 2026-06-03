import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js Middleware — runs on every matched request before it reaches
 * the route handler or page.
 *
 * Primary responsibility: refresh the Supabase auth session so the
 * server-side client always has a valid, non-expired access token.
 *
 * To add route protection (redirect unauthenticated users), extend this
 * file by checking `supabase.auth.getUser()` and returning a redirect
 * response for protected paths.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   - _next/static  (Next.js static assets)
     *   - _next/image   (Next.js image optimisation)
     *   - favicon.ico   (browser favicon)
     *   - *.png / *.svg / *.jpg / *.jpeg / *.gif / *.webp (public images)
     *
     * This ensures the middleware only runs on actual page/API routes,
     * not on every static file request (which would add unnecessary latency).
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|svg|jpg|jpeg|gif|webp)$).*)",
  ],
};
