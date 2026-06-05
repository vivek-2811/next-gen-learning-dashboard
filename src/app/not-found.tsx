"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 p-6 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 z-10">
        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.08] flex items-center justify-center shadow-xl shadow-zinc-200/50 dark:shadow-black/50"
        >
          <Compass className="h-12 w-12 text-blue-550 dark:text-blue-400" />
        </motion.div>

        {/* Text Section */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-8xl font-black tracking-tighter bg-gradient-to-b from-zinc-800 to-zinc-400 dark:from-white dark:to-zinc-650 bg-clip-text text-transparent select-none"
          >
            404
          </motion.h1>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Lost in Cyberspace
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm mx-auto font-medium">
            {"The page you are looking for doesn't exist or has been moved to a new learning path."}
          </p>
        </div>

        {/* Buttons / Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-500/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl text-sm border border-zinc-200 dark:border-white/[0.08] transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
