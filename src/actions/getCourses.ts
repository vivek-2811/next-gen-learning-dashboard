"use server";

import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/course";

/**
 * Server Action: Fetches all courses from the `courses` table.
 *
 * This action runs exclusively on the server — it is never bundled into the
 * client. It uses the authenticated Supabase server client so Row Level
 * Security (RLS) policies are respected automatically.
 *
 * Ordering: courses are returned newest-first by `created_at`.
 *
 * @returns An array of Course objects, or an empty array on error.
 * @throws  Never — errors are caught, logged, and an empty array is returned
 *          so the calling Server Component can always render safely.
 *
 * Usage in a Server Component:
 *   import { getCourses } from "@/actions/getCourses"
 *   const courses = await getCourses()
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    // Log to server console — never expose raw Supabase errors to the client.
    console.error("[getCourses] Supabase query failed:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    // Return empty array so the UI degrades gracefully rather than crashing.
    return [];
  }

  // `data` is `Course[] | null` — normalize null to an empty array.
  return data ?? [];
}
