"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Course, CourseFetchResult } from "@/types/course";

// ---------------------------------------------------------------------------
// Column projection — kept as a constant so it stays in sync with Course.
// ---------------------------------------------------------------------------
const COURSE_COLUMNS = "id, title, progress, icon_name, created_at" as const;

/**
 * Fetches all rows from the `courses` table, ordered newest-first.
 *
 * **Server-only** — the `"use server"` directive ensures this function is
 * never included in the browser bundle.
 *
 * **Request deduplication** — wrapped in React's `cache()` so that multiple
 * Server Components calling `getCourses()` within the same render pass share
 * a single Supabase round-trip. The cache is scoped to one request/response
 * cycle; it does not persist between requests.
 *
 * **RLS-aware** — uses the authenticated server client, so Supabase Row Level
 * Security policies on the `courses` table are enforced automatically.
 *
 * **Typed result** — returns a `CourseFetchResult` discriminated union.
 * Callers must handle both `"success"` and `"error"` branches.
 *
 * **Never throws** — all Supabase errors are caught and surfaced through the
 * `"error"` branch.
 *
 * @returns {Promise<CourseFetchResult>}
 *
 * @example
 * ```tsx
 * import { getCourses } from "@/actions/getCourses"
 *
 * export default async function DashboardPage() {
 *   const result = await getCourses()
 *   if (result.status === "error") {
 *     return <p>Failed to load courses: {result.message}</p>
 *   }
 *   return <CourseGrid courses={result.data} />
 * }
 * ```
 */
export const getCourses: () => Promise<CourseFetchResult> = cache(
  async (): Promise<CourseFetchResult> => {
    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("courses")
        .select(COURSE_COLUMNS)
        .order("created_at", { ascending: false })
        .returns<Course[]>();

      if (error) {
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
        data: data ?? [],
      };
    } catch (err) {
      console.error("[getCourses] Initialization or Query threw error:", err);
      
      return {
        status: "error",
        message: err instanceof Error ? err.message : String(err),
        code: "INITIALIZATION_ERROR",
      };
    }
  },
);
