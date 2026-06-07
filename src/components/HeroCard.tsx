"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, BookOpen } from "lucide-react";
import { CardBackgroundMesh } from "./CardBackgroundMesh";

interface HeroCardProps {
  userName?: string;
  activeCoursesCount?: number;
  variants?: any;
}

export default function HeroCard({ userName = "Learner", activeCoursesCount = 0, variants }: HeroCardProps) {
  return (
    <motion.section
      variants={variants}
      whileHover={{
        scale: 1.015,
        borderColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-3xl border border-white/[0.06] p-6 sm:p-8 bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between h-full group"
    >
      {/* Reusable premium textured gradient mesh */}
      <CardBackgroundMesh />

      <div className="relative z-10 space-y-6 w-full flex flex-col justify-between h-full">
        <div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-1">
            Personal Sandbox Space
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium leading-relaxed max-w-md">
            Step back into your lessons. Your personal workspace and RLS databases are synced and ready.
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {/* Streak Indicator */}
          <div className="flex items-center gap-3 bg-zinc-950/45 border border-white/[0.03] px-4 py-3 rounded-2xl">
            <motion.div
              animate={{ scale: [1, 1.12, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400"
            >
              <Flame className="h-5 w-5 fill-current" />
            </motion.div>
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Streak</span>
              <span className="text-sm font-black text-white block">12 Days</span>
            </div>
          </div>

          {/* Active Courses Indicator */}
          <div className="flex items-center gap-3 bg-zinc-950/45 border border-white/[0.03] px-4 py-3 rounded-2xl">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Catalog</span>
              <span className="text-sm font-black text-white block">
                {activeCoursesCount} Active {activeCoursesCount === 1 ? "Track" : "Tracks"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
