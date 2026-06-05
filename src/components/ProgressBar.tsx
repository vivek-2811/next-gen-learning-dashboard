"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "warning" | "danger" | "purple";
}

export function ProgressBar({
  value,
  className = "",
  showValue = false,
  size = "md",
  variant = "primary",
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // Height configurations
  const heightMap = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  // Modern HSL gradient palettes
  const colorMap = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]",
    success: "bg-gradient-to-r from-emerald-400 to-teal-500 shadow-[0_0_12px_rgba(52,211,153,0.3)]",
    warning: "bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(251,191,36,0.3)]",
    danger: "bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_12px_rgba(244,63,94,0.3)]",
    purple: "bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]",
  };

  return (
    <div className={`w-full ${className}`}>
      {showValue && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-semibold text-zinc-400">Progress</span>
          <span className="text-xs font-bold text-zinc-200">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={`w-full bg-zinc-800/80 backdrop-blur-sm rounded-full overflow-hidden border border-zinc-700/30 ${heightMap[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${colorMap[variant]}`}
        />
      </div>
    </div>
  );
}
