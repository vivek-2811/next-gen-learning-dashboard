"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Flame } from "lucide-react";

const weekData = [
  { day: "Mon", hours: 3.2, lessons: 5 },
  { day: "Tue", hours: 5.1, lessons: 8 },
  { day: "Wed", hours: 2.0, lessons: 3 },
  { day: "Thu", hours: 7.8, lessons: 12 },
  { day: "Fri", hours: 6.4, lessons: 9 },
  { day: "Sat", hours: 4.3, lessons: 6 },
  { day: "Sun", hours: 5.6, lessons: 7 },
];

const maxHours = Math.max(...weekData.map((d) => d.hours));
const totalHours = weekData.reduce((s, d) => s + d.hours, 0);
const totalLessons = weekData.reduce((s, d) => s + d.lessons, 0);
const avgHours = +(totalHours / 7).toFixed(1);
const bestDay = weekData.reduce((best, d) => (d.hours > best.hours ? d : best));

export default function ActivityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
      className="rounded-3xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* ── Header ── */}
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

        {/* ── Summary pills ── */}
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
      </div>

      {/* ── Chart area ── */}
      <div className="flex items-end justify-between gap-2 sm:gap-3 h-48 sm:h-56 px-1">
        {weekData.map((item, i) => {
          const heightPct = (item.hours / maxHours) * 100;
          const isMax = item.day === bestDay.day;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2 min-w-0"
            >
              {/* Hour label on top */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                className={`text-[10px] sm:text-xs font-bold tabular-nums ${
                  isMax ? "text-blue-400" : "text-zinc-500"
                }`}
              >
                {item.hours}h
              </motion.span>

              {/* Bar container */}
              <div className="relative w-full flex justify-center h-full">
                <div className="relative w-6 sm:w-8 md:w-10 h-full flex items-end">
                  {/* Background track */}
                  <div className="absolute inset-0 rounded-lg bg-zinc-800/40 border border-zinc-800/30" />

                  {/* Animated fill */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 20,
                      delay: 0.15 + i * 0.07,
                    }}
                    className={`relative w-full rounded-lg ${
                      isMax
                        ? "bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20"
                        : "bg-gradient-to-t from-blue-600/60 to-blue-500/40"
                    }`}
                  >
                    {/* Glossy highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-lg bg-gradient-to-b from-white/[0.08] to-transparent" />
                  </motion.div>
                </div>
              </div>

              {/* Day label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={`text-[10px] sm:text-xs font-bold ${
                  isMax ? "text-blue-400" : "text-zinc-500"
                }`}
              >
                {item.day}
              </motion.span>
            </div>
          );
        })}
      </div>

      {/* ── Bottom stats row ── */}
      <div className="mt-8 pt-5 border-t border-white/[0.05] grid grid-cols-3 gap-4">
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
            <span className="text-xs text-blue-400 font-bold">
              {bestDay.hours}h
            </span>
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
            Daily Goal
          </p>
          <p className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">
            On Track
          </p>
        </div>
      </div>
    </motion.div>
  );
}
