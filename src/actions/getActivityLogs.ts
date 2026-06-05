"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActivityLog } from "@/types/activity";

export interface DayActivity {
  day: string;
  hours: number;
  lessons: number;
  date: string;
}

type ActivityResult =
  | { status: "success"; data: DayActivity[] }
  | { status: "error"; message: string };

/**
 * Fetches the last 7 days of activity logs for the current authenticated user.
 *
 * Returns an array of 7 entries (Mon–Sun of the current week), filling in
 * zeros for days with no logged activity. This ensures the chart always
 * renders a full 7-day week.
 */
export async function getActivityLogs(): Promise<ActivityResult> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { status: "error", message: "Not authenticated." };
    }

    // Calculate date range: last 7 days including today
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const formatDate = (d: Date): string => d.toISOString().split("T")[0] || "";

    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", user.id)
      .gte("activity_date", formatDate(sevenDaysAgo))
      .lte("activity_date", formatDate(today))
      .order("activity_date", { ascending: true });

    if (error) {
      return { status: "error", message: error.message };
    }

    const logs = (data || []) as ActivityLog[];

    // Build a map of date → log for quick lookup
    const logMap = new Map<string, ActivityLog>();
    for (const log of logs) {
      logMap.set(log.activity_date, log);
    }

    // Generate full 7-day array with day names
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekData: DayActivity[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i);
      const dateStr = formatDate(date);
      const log = logMap.get(dateStr);

      weekData.push({
        day: dayNames[date.getDay()] || "",
        hours: log ? Number(log.hours) : 0,
        lessons: log ? Number(log.lessons) : 0,
        date: dateStr,
      });
    }

    return { status: "success", data: weekData };
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to fetch activity logs.",
    };
  }
}
