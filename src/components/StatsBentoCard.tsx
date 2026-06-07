"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookOpenCheck, TrendingUp, Award, Clock } from "lucide-react";
import { CardBackgroundMesh } from "./CardBackgroundMesh";
import type { Course } from "@/types/course";

interface StatsBentoCardProps {
  courses: Course[];
  variants?: Variants;
}

export function StatsBentoCard({ courses, variants }: StatsBentoCardProps) {
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100);

  const totalCourses = courses.length;
  const completedCourses = courses.filter((c) => clamp(c.progress) === 100).length;
  const inProgressCourses = courses.filter((c) => clamp(c.progress) > 0 && clamp(c.progress) < 100).length;
  const avgProgress = totalCourses
    ? Math.round(courses.reduce((sum, c) => sum + clamp(c.progress), 0) / totalCourses)
    : 0;

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      icon: BookOpenCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/15",
    },
    {
      label: "Avg Progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/15",
    },
    {
      label: "Completed",
      value: completedCourses,
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/15",
    },
    {
      label: "In Progress",
      value: inProgressCourses,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/15",
    },
  ];

  return (
    <motion.section
      variants={variants}
      whileHover={{
        scale: 1.015,
        borderColor: "rgba(59, 130, 246, 0.4)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
      className="p-6 bg-zinc-900/50 backdrop-blur-xl border rounded-3xl relative overflow-hidden flex flex-col justify-between h-full group"
    >
      {/* Premium Textured Background */}
      <CardBackgroundMesh />

      <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-4">
        <div>
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            Learning Progress
          </h3>
          <p className="text-lg font-black text-white mt-1">Metrics Summary</p>
        </div>

        <div className="grid grid-cols-2 gap-3.5 w-full">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-4 bg-zinc-950/40 border border-white/[0.03] rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-white/[0.08]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
                  {s.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${s.bg} ${s.color}`}>
                  <s.icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <span className="text-xl font-black text-white mt-3.5 block leading-none">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
