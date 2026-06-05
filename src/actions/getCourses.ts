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

      // Query user-specific courses, joining the course title and icon metadata
      const { data, error } = await supabase
        .from("user_courses")
        .select(`
          progress,
          created_at,
          courses (
            id,
            title,
            icon_name
          )
        `)
        .eq("user_id", user.id)
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

      // Map rows (casting nested structure) to match standard Course shape
      const rawData = (data as unknown) as Array<{
        progress: number;
        created_at: string;
        courses: {
          id: string;
          title: string;
          icon_name: string;
        } | null;
      }>;

      const mappedCourses: Course[] = (rawData ?? [])
        .filter((row) => row.courses !== null)
        .map((row) => {
          const c = row.courses!;
          return {
            id: c.id,
            title: c.title,
            progress: row.progress,
            icon_name: c.icon_name,
            created_at: row.created_at,
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
