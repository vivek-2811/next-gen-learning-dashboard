import Sidebar from "@/components/Sidebar";
import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto max-w-7xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <BookOpen className="h-5 w-5" />
            <span className="text-xs uppercase tracking-widest font-extrabold">
              Course Library
            </span>
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Courses
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Browse and manage your enrolled courses.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-900/50 backdrop-blur-xl p-12 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Course catalog coming soon
          </h2>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-md mx-auto">
            This page will display your full course library with search, filters, and enrollment options.
          </p>
        </div>
      </main>
    </div>
  );
}
