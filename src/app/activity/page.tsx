import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Clock, BookOpen, Flame } from "lucide-react";
import { getActivityLogs } from "@/actions/getActivityLogs";
import { getProfile } from "@/actions/getProfile";
import DashboardShell from "@/components/DashboardShell";
import ActivityChart from "@/components/ActivityChart";
import { CardBackgroundMesh } from "@/components/CardBackgroundMesh";

// Force dynamic render
export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  const activityResult = await getActivityLogs();
  const profileResult = await getProfile();

  const userName =
    profileResult.status === "success" && profileResult.data.full_name
      ? profileResult.data.full_name
      : "Learner";

  if (activityResult.status === "error") {
    return (
      <DashboardShell>
        <div className="space-y-6 max-w-2xl py-4">
          <div className="bg-zinc-900/80 border border-red-500/20 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50" />
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mt-1 shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white">Database Query Failed</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  The activity server encountered an error while querying your database.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4.5 bg-black/60 rounded-2xl border border-zinc-800/80 font-mono text-xs text-red-300/90 leading-relaxed overflow-x-auto">
              Error: {activityResult.message}
            </div>

            <div className="mt-8 flex gap-3">
              <Link 
                href="/activity" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold rounded-xl border border-zinc-700/50 transition-all cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry Request
              </Link>
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  const data = activityResult.data;
  const totalHours = data.reduce((s, d) => s + d.hours, 0);
  const totalLessons = data.reduce((s, d) => s + d.lessons, 0);
  const defaultDay = { day: "Mon", hours: 0, lessons: 0, date: "" };
  const bestDay = data.reduce((best, d) => (d.hours > best.hours ? d : best), data[0] || defaultDay);

  return (
    <DashboardShell
      title="Activity"
      subtitle="Track your daily learning habits and overall progress metrics."
      userName={userName}
    >
      <div className="space-y-8 w-full">
        {/* Main Chart Card */}
        <div className="w-full">
          <ActivityChart data={data} />
        </div>

        {/* Detailed Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Total Study Time */}
          <div className="p-6 bg-zinc-900/40 border border-white/[0.06] rounded-3xl relative overflow-hidden group">
            <CardBackgroundMesh />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Learning Time</span>
                <div className="p-2 bg-blue-500/10 border border-blue-500/15 rounded-xl text-blue-450 dark:text-blue-400">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">{totalHours.toFixed(1)}h</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">Total accumulated studying time</p>
              </div>
            </div>
          </div>

          {/* Card 2: Lessons Completed */}
          <div className="p-6 bg-zinc-900/40 border border-white/[0.06] rounded-3xl relative overflow-hidden group">
            <CardBackgroundMesh />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Lessons Finished</span>
                <div className="p-2 bg-purple-500/10 border border-purple-500/15 rounded-xl text-purple-450 dark:text-purple-400">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">{totalLessons}</h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">Total completed lectures & modules</p>
              </div>
            </div>
          </div>

          {/* Card 3: Best Streak */}
          <div className="p-6 bg-zinc-900/40 border border-white/[0.06] rounded-3xl relative overflow-hidden group">
            <CardBackgroundMesh />
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Best Day</span>
                <div className="p-2 bg-orange-500/10 border border-orange-500/15 rounded-xl text-orange-450 dark:text-orange-400">
                  <Flame className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white">
                  {bestDay.day}{" "}
                  <span className="text-sm font-bold text-orange-450 dark:text-orange-400">({bestDay.hours}h)</span>
                </h4>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1">Peak learning output this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
