"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 z-10">
        {/* Warning Icon Container */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-lg"
        >
          <AlertCircle className="h-10 w-10 text-red-550 dark:text-red-400" />
        </motion.div>

        {/* Info */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-zinc-505 dark:text-zinc-400 text-sm max-w-xs mx-auto font-medium">
            An unexpected error occurred while loading this section.
          </p>
          {error.message && (
            <div className="mt-2 p-3 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.04] rounded-xl text-xs font-mono text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto break-all overflow-hidden text-ellipsis">
              {error.message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-505 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/15 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl text-sm border border-zinc-200 dark:border-white/[0.08] transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
