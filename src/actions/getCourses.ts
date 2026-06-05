"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Course, CourseFetchResult } from "@/types/course";

/**
 * Fetches course enrollments for the currently logged-in user from the
 * `user_courses` table, joining static details from the `courses` table.
 *
 * **Server-only** — respects RLS policies on both tables.
 *
 * @returns {Promise<CourseFetchResult>}
 */
export const getCourses: () => Promise<CourseFetchResult> = cache(
  async (): Promise<CourseFetchResult> => {
    try {
      const supabase = await createClient();

      // Retrieve the authenticated user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        return {
          status: "error",
          message: "User not authenticated.",
          code: "NOT_AUTHENTICATED",
        };
      }

      // Query courses directly
      const { data, error } = await supabase
        .from("courses")
        .select(`
          id,
          title,
          progress,
          icon_name,
          category,
          created_at
        `)
        .order("created_at", { ascending: false });

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

      // Map rows directly to match standard Course shape
      const rawData = (data as unknown) as Array<{
        id: string;
        title: string;
        progress: number;
        icon_name: string;
        category: string;
        created_at: string;
      }>;

      const mappedCourses: Course[] = (rawData ?? []).map((row) => {
        return {
          id: row.id,
          title: row.title,
          progress: row.progress,
          icon_name: row.icon_name,
          created_at: row.created_at,
          category: row.category as Course["category"],
        };
      });

      return {
        status: "success",
        data: mappedCourses,
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
