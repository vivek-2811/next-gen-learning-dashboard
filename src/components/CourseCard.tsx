"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  FlaskConical,
  Globe,
  Terminal,
  Cpu,
  Database,
  Layout,
  LineChart,
  Shield,
  Sparkles,
  Calculator,
  Palette,
  Atom,
  Calendar
} from "lucide-react";
import type { Course } from "@/types/course";
import { ProgressBar } from "./ProgressBar";

// Safe, tree-shakeable icon dictionary
const iconMap = {
  BookOpen,
  Code,
  FlaskConical,
  Globe,
  Terminal,
  Cpu,
  Database,
  Layout,
  LineChart,
  Shield,
  Sparkles,
  Calculator,
  Palette,
  Atom,
} as const;

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { title, icon_name, created_at } = course;

  // Clamp progress to 0–100 to handle any out-of-range database values
  const progress = Math.min(Math.max(course.progress, 0), 100);

  // Resolve icon or fallback to BookOpen
  const IconComponent = iconMap[icon_name as keyof typeof iconMap] || BookOpen;

  // Determine progress color variant
  let progressVariant: "primary" | "success" | "warning" | "danger" | "purple" = "primary";
  if (progress === 100) {
    progressVariant = "success";
  } else if (progress >= 75) {
    progressVariant = "purple";
  } else if (progress < 25) {
    progressVariant = "danger";
  } else if (progress < 50) {
    progressVariant = "warning";
  }

  // Format date cleanly
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.15)",
        borderColor: "rgba(59, 130, 246, 0.4)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col justify-between p-6 bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-zinc-800/80 transition-all duration-300 h-60 relative overflow-hidden"
    >
      {/* Background glow overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top bar with Icon and Completion badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700/30 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-colors duration-300">
            <IconComponent className="h-6 w-6 text-zinc-300 group-hover:text-blue-400 transition-colors duration-300" />
          </div>
          {progress === 100 ? (
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              Completed
            </span>
          ) : (
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
              In Progress
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white line-clamp-2 leading-snug mb-2 transition-colors">
          {title}
        </h3>
      </div>

      {/* Progress & Bottom Bar */}
      <div className="space-y-4">
        <ProgressBar value={progress} showValue variant={progressVariant} size="sm" />

        <div className="flex items-center text-xs text-zinc-500 gap-1.5 pt-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Created {formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
