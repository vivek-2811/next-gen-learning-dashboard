"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { GraduationCap } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  userName?: string;
}

export default function DashboardShell({ children, title, subtitle, userName }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
      {/* Sidebar - Collapses automatically on Tablet, hidden on Mobile */}
      <Sidebar />

      {/* Main dashboard content container */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto pb-24 md:pb-8">
        <div className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Page Header (if title is provided) */}
          {title && (
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/60 pb-6 w-full">
              <div>
                <div className="flex items-center gap-2 text-blue-500 mb-1">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-xs uppercase tracking-widest font-extrabold">Next-Gen Academy</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight leading-none">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-zinc-400 mt-1.5 font-medium">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 self-start md:self-auto bg-zinc-900/55 border border-zinc-800/80 px-4 py-2 rounded-xl backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-300">
                  {userName ? `Logged in as ${userName}` : "Logged in as Active Learner"}
                </span>
              </div>
            </header>
          )}

          {/* Children content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}
