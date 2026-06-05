import React from "react";
import Link from "next/link";
import { 
  AlertCircle, 
  RefreshCw, 
  Database, 
  HelpCircle
} from "lucide-react";
import { getCourses } from "@/actions/getCourses";
import { getProfile } from "@/actions/getProfile";
import { getActivityLogs } from "@/actions/getActivityLogs";
import Sidebar from "@/components/Sidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

// Force Next.js to treat this route as dynamically rendered at runtime,
// since it relies on server actions/cookies and RLS data fetching.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const result = await getCourses();
  const profileResult = await getProfile();
  const activityResult = await getActivityLogs();

  const activityData = activityResult.status === "success" ? activityResult.data : [];

  const userName =
    profileResult.status === "success" && profileResult.data.full_name
      ? profileResult.data.full_name
      : "Learner";

  return (
    <div className="flex min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main dashboard content container */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-7xl">
        {/* Render Error State */}
        {result.status === "error" ? (
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
                    The dashboard server encountered an error while querying your database.
                  </p>
                </div>
              </div>

              {/* Error Detail Display */}
              <div className="mt-6 p-4.5 bg-black/60 rounded-2xl border border-zinc-800/80 font-mono text-xs text-red-300/90 leading-relaxed overflow-x-auto space-y-1">
                <div><span className="text-zinc-500 select-none">Error:</span> {result.message}</div>
                {result.code && <div><span className="text-zinc-500 select-none">Code:</span> {result.code}</div>}
              </div>

              {/* Actionable troubleshooting checklist */}
              <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-4">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-zinc-400" />
                  Troubleshooting Checklist
                </h3>
                <ul className="text-xs text-zinc-400 space-y-2.5 list-disc pl-4 leading-normal">
                  <li>
                    <strong className="text-zinc-200">Verify Credentials:</strong> Ensure your <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">.env.local</code> contains valid <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Table Schema:</strong> Confirm that the <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">courses</code> table exists in your public schema.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Column Definitions:</strong> Make sure the columns match: <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">id (uuid)</code>, <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">title (text)</code>, <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">progress (numeric)</code>, <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">icon_name (text)</code>, and <code className="bg-zinc-800 text-zinc-300 px-1 py-0.5 rounded text-[10px]">created_at (timestamptz)</code>.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Row Level Security (RLS):</strong> Ensure RLS is active and permits SELECT actions, or create a policy permitting anonymous reads for public access.
                  </li>
                </ul>
              </div>

              {/* Reload Button */}
              <div className="mt-8 flex gap-3">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold rounded-xl border border-zinc-700/50 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Retry Request
                </Link>
                <a 
                  href="https://supabase.com/dashboard" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-zinc-900/55 text-zinc-400 hover:text-zinc-200 text-xs font-bold rounded-xl border border-transparent hover:border-zinc-800/80 transition-all"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Supabase Dashboard
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Render Success State Wrapper */
          <DashboardContent
            initialCourses={result.data}
            userName={userName}
            activityData={activityData}
          />
        )}
      </main>
    </div>
  );
}
