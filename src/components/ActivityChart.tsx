"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, TrendingUp, Flame, Clock, BookOpen, CalendarOff } from "lucide-react";
import type { DayActivity } from "@/actions/getActivityLogs";

interface ActivityChartProps {
  data: DayActivity[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Derived stats
  const hasActivity = data.some((d) => d.hours > 0 || d.lessons > 0);
  const maxHours = Math.max(...data.map((d) => d.hours), 0.1); // min 0.1 to avoid division by zero
  const totalHours = data.reduce((s, d) => s + d.hours, 0);
  const totalLessons = data.reduce((s, d) => s + d.lessons, 0);
  const avgHours = +(totalHours / 7).toFixed(1);
  const defaultDay: DayActivity = { day: "Mon", hours: 0, lessons: 0, date: "" };
  const bestDay = data.reduce((best, d) => (d.hours > best.hours ? d : best), data[0] || defaultDay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className="rounded-3xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15 text-blue-400">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Weekly Activity
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 font-medium">
              Last 7 days learning summary
            </p>
          </div>
        </div>

        {/* Summary pills */}
        {hasActivity && (
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/40 text-xs font-bold text-zinc-300">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
              {totalHours.toFixed(1)}h total
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/70 border border-zinc-700/40 text-xs font-bold text-zinc-300">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              {avgHours}h avg
            </div>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!hasActivity ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 space-y-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-500">
            <CalendarOff className="h-7 w-7" />
          </div>
          <div className="text-center space-y-1.5 max-w-xs">
            <h4 className="text-base font-bold text-white">No activity yet</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Start learning to see your weekly activity chart. Your hours and
              lessons will appear here automatically.
            </p>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Chart Area */}
          <div className="relative flex items-end justify-between gap-2 sm:gap-3 h-48 sm:h-56 px-1 mb-4">
            {/* Y-Axis Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-6 pl-8">
              {[0, 1, 2, 3].map((val) => (
                <div key={val} className="w-full flex items-center gap-2">
                  <span className="text-[9px] font-mono text-zinc-600 select-none w-6 text-right">
                    {((maxHours / 3) * (3 - val)).toFixed(1)}h
                  </span>
                  <div className="flex-1 border-t border-dashed border-zinc-800/60" />
                </div>
              ))}
            </div>

            {/* Chart Bars */}
            <div className="relative flex items-end justify-between w-full h-full pl-10 z-10">
              {data.map((item, i) => {
                const heightPct = (item.hours / maxHours) * 85;
                const isMax = bestDay && item.day === bestDay.day && item.date === bestDay.date;

                return (
                  <div
                    key={item.date}
                    className="flex-1 flex flex-col items-center gap-2 min-w-0 h-full justify-end relative"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -12, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{ bottom: `${heightPct}%` }}
                          className="absolute z-20 bg-zinc-950/90 border border-white/10 px-3 py-2 rounded-xl shadow-xl pointer-events-none flex flex-col gap-1 min-w-[105px] items-center text-center"
                        >
                          <p className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wider">
                            {item.day} Stats
                          </p>
                          <div className="flex items-center gap-1 text-xs text-white font-bold">
                            <Clock className="h-3 w-3 text-blue-400" />
                            <span>{item.hours}h</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white font-bold">
                            <BookOpen className="h-3 w-3 text-purple-400" />
                            <span>{item.lessons} lessons</span>
                          </div>
                          <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-950 border-r border-b border-white/10 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bar Container */}
                    <div className="relative w-full flex justify-center h-full items-end">
                      <div className="relative w-6 sm:w-8 md:w-10 h-full flex items-end">
                        {/* Background track */}
                        <div className="absolute inset-0 rounded-lg bg-zinc-800/20 border border-zinc-800/10" />

                        {/* Animated Fill */}
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          whileHover={{
                            scale: 1.05,
                            filter: "brightness(1.15)",
                          }}
                          style={{
                            transformOrigin: "bottom",
                            height: `${heightPct}%`,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 20,
                            delay: 0.15 + i * 0.07,
                          }}
                          className={`relative w-full rounded-lg transition-all duration-200 cursor-pointer ${
                            isMax
                              ? "bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
                              : "bg-gradient-to-t from-blue-600/70 to-blue-500/50 border border-blue-500/20"
                          }`}
                        >
                          <div className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-white/20" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Day Label */}
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-1 transition-colors duration-200 ${
                        isMax || hoveredIndex === i ? "text-cyan-400 font-extrabold" : "text-zinc-500"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 pt-5 border-t border-white/[0.05] grid grid-cols-3 gap-4"
          >
            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Lessons
              </p>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                {totalLessons}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Best Day
              </p>
              <p className="text-lg sm:text-xl font-black text-white mt-0.5">
                {bestDay.day}{" "}
                <span className="text-xs text-cyan-400 font-bold font-mono">
                  {bestDay.hours}h
                </span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
                Daily Goal
              </p>
              <p className={`text-lg sm:text-xl font-black mt-0.5 ${
                avgHours >= 3 ? "text-emerald-400" : "text-amber-400"
              }`}>
                {avgHours >= 3 ? "On Track" : "Keep Going"}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
