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
          created_at
        `)
        .order("created_at", { ascending: false });

      console.log("RAW DATA:", data);

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
        created_at: string;
      }>;

      const mappedCourses: Course[] = (rawData ?? []).map((row) => {
        // Dynamically map category to satisfy the TypeScript Course interface and UI filtering
        let category: Course["category"] = "Frontend";
        const icon = (row.icon_name || "").toLowerCase();
        const title = (row.title || "").toLowerCase();

        if (icon === "database" || title.includes("database") || title.includes("supabase")) {
          category = "Backend";
        } else if (icon === "cpu" || title.includes("neural") || title.includes("ai") || title.includes("learning")) {
          category = "AI";
        } else if (icon === "shield" || title.includes("ci/cd") || title.includes("devops") || title.includes("pipelines")) {
          category = "DevOps";
        } else if (icon === "calculator" || title.includes("data structures") || title.includes("algorithms") || title.includes("dsa")) {
          category = "DSA";
        }

        return {
          id: row.id,
          title: row.title,
          progress: row.progress,
          icon_name: row.icon_name,
          created_at: row.created_at,
          category,
        };
      });

      console.log("COURSES FOUND:", mappedCourses);

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
