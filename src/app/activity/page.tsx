import Sidebar from "@/components/Sidebar";
import { Activity } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen bg-black text-zinc-100">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-7xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Activity className="h-5 w-5" />
            <span className="text-xs uppercase tracking-widest font-extrabold">
              Analytics
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Activity
          </h1>
          <p className="text-sm text-zinc-400 font-medium">
            Track your learning habits and progress over time.
          </p>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur-xl p-12 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400">
            <Activity className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-white">
            Detailed analytics coming soon
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            This page will show in-depth learning analytics, streaks, and performance trends.
          </p>
        </div>
      </main>
    </div>
  );
}
