"use client";

import { Home, BookOpen, Activity, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-white/10 p-6">
      <h2 className="text-xl font-bold mb-8">
        Next-Gen Academy
      </h2>

      <nav className="space-y-4">
        <a className="flex items-center gap-3">
          <Home size={18} />
          Dashboard
        </a>

        <a className="flex items-center gap-3">
          <BookOpen size={18} />
          Courses
        </a>

        <a className="flex items-center gap-3">
          <Activity size={18} />
          Activity
        </a>

        <a className="flex items-center gap-3">
          <Settings size={18} />
          Settings
        </a>
      </nav>
    </aside>
  );
}
