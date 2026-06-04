"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { CourseFetchResult, CourseRow } from "@/types/course";

// ---------------------------------------------------------------------------
// Column projection — kept as a constant so it stays in sync with CourseRow.
// TypeScript will catch any mismatch between this string and the interface
// when the returned data is assigned.
// ---------------------------------------------------------------------------
const COURSE_COLUMNS = "id, title, progress, icon_name, created_at" as const;

// ---------------------------------------------------------------------------
// getCourses — deduplicated, typed, server-only data fetcher
// ---------------------------------------------------------------------------

/**
 * Fetches all rows from the `courses` table, ordered newest-first.
 *
 * ### Key behaviours
 *
 * **Server-only** — the `"use server"` directive at the top of this file
 * ensures this function is never included in the browser bundle.
 *
 * **Request deduplication** — wrapped in React's `cache()` so that multiple
 * Server Components calling `getCourses()` within the same render pass share
 * a single Supabase round-trip. The cache is scoped to one request/response
 * cycle; it does not persist between requests.
 *
 * **RLS-aware** — uses the authenticated server client, so Supabase Row Level
 * Security policies on the `courses` table are enforced automatically.
 *
 * **Typed result** — returns a `CourseFetchResult` discriminated union rather
 * than `Course[] | null`. Callers must handle both `"success"` and `"error"`
 * branches, making error states explicit in the component tree.
 *
 * **Never throws** — all Supabase errors are caught and surfaced through the
 * `"error"` branch. The calling Server Component always receives a value it
 * can render safely.
 *
 * @returns {Promise<CourseFetchResult>}
 *
 * @example
 * ```tsx
 * // app/dashboard/page.tsx  (Server Component)
 * import { getCourses } from "@/actions/getCourses"
 *
 * export default async function DashboardPage() {
 *   const result = await getCourses()
 *
 *   if (result.status === "error") {
 *     return <p>Failed to load courses: {result.message}</p>
 *   }
 *
 *   return <CourseGrid courses={result.data} />
 * }
 * ```
 */
export const getCourses: () => Promise<CourseFetchResult> = cache(
  async (): Promise<CourseFetchResult> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("courses")
      .select(COURSE_COLUMNS)
      .order("created_at", { ascending: false })
      .returns<CourseRow[]>();

    if (error) {
      // Log structured error on the server — never expose raw Supabase
      // internals to the client response.
      console.error("[getCourses] Query failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return {
        status: "error",
        message: error.message,
        code: error.code ?? null,
      };
    }

    return {
      status: "success",
      // `data` is `CourseRow[] | null` — Supabase returns null when no rows
      // match. Normalise to an empty array so callers never handle null.
      data: data ?? [],
    };
  },
);
