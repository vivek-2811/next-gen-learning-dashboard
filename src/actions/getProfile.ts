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
      // Fallback if profiles table is not found in schema cache
      if (error.message.includes("Could not find the table") || error.code === "42P01") {
        return {
          status: "success",
          data: {
            id: user.id,
            full_name: user.user_metadata?.name || "Active Learner",
            email: user.email || "learner@nextgen.edu",
            avatar_url: "",
            created_at: new Date().toISOString(),
          },
        };
      }
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
