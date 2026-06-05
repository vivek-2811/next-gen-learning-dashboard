import React from "react";

export function SkeletonCard() {
  return (
    <div className="flex flex-col justify-between p-6 bg-zinc-900/60 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/80 h-60 animate-pulse">
      <div>
        <div className="flex justify-between items-start mb-4">
          {/* Icon placeholder */}
          <div className="w-12 h-12 bg-zinc-800 dark:bg-zinc-800/60 rounded-xl" />
          {/* Status badge placeholder */}
          <div className="w-20 h-6 bg-zinc-800 dark:bg-zinc-800/60 rounded-full" />
        </div>
        
        {/* Title placeholders */}
        <div className="w-3/4 h-5 bg-zinc-800 dark:bg-zinc-800/60 rounded-lg mb-2" />
        <div className="w-1/2 h-5 bg-zinc-800 dark:bg-zinc-800/60 rounded-lg" />
      </div>

      <div className="space-y-4">
        {/* Progress bar placeholder */}
        <div className="space-y-2">
          <div className="flex justify-between w-full">
            <div className="w-12 h-3 bg-zinc-800 dark:bg-zinc-800/60 rounded" />
            <div className="w-8 h-3 bg-zinc-800 dark:bg-zinc-800/60 rounded" />
          </div>
          <div className="w-full h-2.5 bg-zinc-800 dark:bg-zinc-800/60 rounded-full" />
        </div>

        {/* Date placeholder */}
        <div className="w-1/3 h-4 bg-zinc-800 dark:bg-zinc-800/60 rounded" />
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-white/10 p-8 bg-white dark:bg-zinc-900 animate-pulse space-y-6">
      {/* Title placeholder */}
      <div className="w-2/3 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      {/* Description placeholder */}
      <div className="w-1/2 h-4 bg-zinc-200 dark:bg-zinc-850 rounded" />

      {/* Streaks and courses placeholders */}
      <div className="flex gap-8 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="space-y-2">
            <div className="w-16 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="w-20 h-3 bg-zinc-200 dark:bg-zinc-850 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="space-y-2">
            <div className="w-16 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="w-20 h-3 bg-zinc-200 dark:bg-zinc-850 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-900/50 backdrop-blur-xl p-8 space-y-6 animate-pulse">
      {/* Header placeholders */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="w-32 h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-24 h-4 bg-zinc-200 dark:bg-zinc-850 rounded" />
        </div>
        <div className="w-20 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      </div>

      {/* Grid placeholder for bars */}
      <div className="h-60 flex items-end justify-between gap-2 pt-6">
        <div className="w-full h-[60%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[40%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[85%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[30%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[70%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[55%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
        <div className="w-full h-[90%] bg-zinc-200 dark:bg-zinc-800 rounded-t-lg" />
      </div>
    </div>
  );
}
