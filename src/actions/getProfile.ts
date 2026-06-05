"use server";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

type ProfileResult =
  | { status: "success"; data: Profile }
  | { status: "error"; message: string };

/**
 * Fetches the current authenticated user's profile from the `profiles` table.
 *
 * Must be called from a Server Component or Server Action context.
 * Returns a discriminated union for safe error handling.
 */
export async function getProfile(): Promise<ProfileResult> {
  try {
    const supabase = await createClient();

    // Get the current authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        status: "error",
        message: "Not authenticated.",
      };
    }

    // Fetch the profile row
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return {
        status: "error",
        message: error.message,
      };
    }

    return {
      status: "success",
      data: data as Profile,
    };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to fetch profile.",
    };
  }
}
