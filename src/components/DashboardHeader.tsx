"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Clock,
  TrendingUp,
  BookOpenCheck
} from "lucide-react";
import type { Course } from "@/types/course";

interface DashboardHeaderProps {
  courses: Course[];
}

export function DashboardHeader({ courses }: DashboardHeaderProps) {
  // Clamp progress values to 0–100 to handle any out-of-range database values
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100);

  const totalCourses = courses.length;

  const completedCourses = courses.filter((c) => clamp(c.progress) === 100).length;

  const inProgressCourses = courses.filter((c) => clamp(c.progress) > 0 && clamp(c.progress) < 100).length;

  const avgProgress = totalCourses
    ? Math.round(courses.reduce((sum, c) => sum + clamp(c.progress), 0) / totalCourses)
    : 0;

  // Animation variants for statistics cards
  const cardVariants = {
    hidden: { opacity: 0, y: -10 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring" as const,
        stiffness: 260,
        damping: 20
      }
    })
  };

  return (
    <header className="space-y-8 w-full">
      {/* Branding and welcome bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <GraduationCap className="h-5 w-5" />
            <span className="text-xs uppercase tracking-widest font-extrabold">Next-Gen Academy</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400 mt-1.5 font-medium">
            Welcome back! Here is a summary of your learning journey.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto bg-zinc-900/55 border border-zinc-800/80 px-4 py-2 rounded-xl backdrop-blur-md">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-zinc-300">Logged in as Active Learner</span>
        </div>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Stat Card 1: Total Courses */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between backdrop-blur-sm shadow-sm"
        >
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Total Courses</span>
            <span className="text-2xl lg:text-3xl font-black text-white block mt-1">{totalCourses}</span>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <BookOpenCheck className="h-6 w-6" />
          </div>
        </motion.div>

        {/* Stat Card 2: Avg Progress */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between backdrop-blur-sm shadow-sm"
        >
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Average Progress</span>
            <span className="text-2xl lg:text-3xl font-black text-white block mt-1">{avgProgress}%</span>
          </div>
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <TrendingUp className="h-6 w-6" />
          </div>
        </motion.div>

        {/* Stat Card 3: Completed */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between backdrop-blur-sm shadow-sm"
        >
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl lg:text-3xl font-black text-white block mt-1">{completedCourses}</span>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Award className="h-6 w-6" />
          </div>
        </motion.div>

        {/* Stat Card 4: In Progress */}
        <motion.div
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between backdrop-blur-sm shadow-sm"
        >
          <div>
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">In Progress</span>
            <span className="text-2xl lg:text-3xl font-black text-white block mt-1">{inProgressCourses}</span>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <Clock className="h-6 w-6" />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
