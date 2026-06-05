"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected client runtime/hydration errors to console
    console.error("[Dashboard Boundary Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-6 selection:bg-red-500/30">
      <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden text-center space-y-6">
        {/* Glow Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/30 via-red-500 to-red-500/30" />

        {/* Warning Icon Container */}
        <div className="mx-auto w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertTriangle className="h-6 w-6" />
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white tracking-tight">Application Error</h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred during dashboard rendering. This could be due to a layout hydration conflict or network issue.
          </p>
        </div>

        {/* Diagnostic Stack */}
        <div className="p-4 bg-black/60 border border-zinc-800/80 rounded-xl font-mono text-[10px] text-red-300/80 text-left overflow-x-auto max-h-36">
          <span className="text-zinc-500">Message:</span> {error.message || "Unknown error"}
          {error.digest && (
            <div className="mt-1">
              <span className="text-zinc-500">Digest ID:</span> {error.digest}
            </div>
          )}
        </div>

        {/* Retry controls */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md shadow-red-600/10 transition-colors"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Reload Component
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-xl cursor-pointer border border-zinc-700/50 transition-colors"
          >
            Full Page Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
