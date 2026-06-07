import React from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getCourses } from "@/actions/getCourses";
import { getProfile } from "@/actions/getProfile";
import DashboardShell from "@/components/DashboardShell";
import CourseSearchWrapper from "@/components/CourseSearchWrapper";

// Force dynamic render
export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const result = await getCourses();
  const profileResult = await getProfile();

  const userName =
    profileResult.status === "success" && profileResult.data.full_name
      ? profileResult.data.full_name
      : "Learner";

  if (result.status === "error") {
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
                  The courses server encountered an error while querying your database.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4.5 bg-black/60 rounded-2xl border border-zinc-800/80 font-mono text-xs text-red-300/90 leading-relaxed overflow-x-auto">
              Error: {result.message}
            </div>

            <div className="mt-8 flex gap-3">
              <Link 
                href="/courses" 
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

  return (
    <DashboardShell
      title="Courses"
      subtitle="Browse and manage your enrolled learning tracks."
      userName={userName}
    >
      <CourseSearchWrapper courses={result.data} />
    </DashboardShell>
  );
}
