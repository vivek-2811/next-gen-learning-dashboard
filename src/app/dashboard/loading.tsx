import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col">
      {/* Navbar Skeleton */}
      <div className="border-b border-zinc-900/60 bg-zinc-950/45 h-16 w-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="h-4 w-24 bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-20 bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Main Container Skeleton */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Header Block Skeleton */}
        <div className="space-y-6 w-full border-b border-zinc-800/60 pb-6">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-zinc-800 rounded animate-pulse" />
            <div className="h-8 w-48 bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>

        {/* 4 Stats Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl flex items-center justify-between"
            >
              <div className="space-y-2">
                <div className="h-3.5 w-20 bg-zinc-800 rounded animate-pulse" />
                <div className="h-7 w-12 bg-zinc-800 rounded-lg animate-pulse" />
              </div>
              <div className="h-10 w-10 bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>

        {/* 4 Course Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i} 
              className="p-6 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl h-60 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 bg-zinc-800 rounded-xl animate-pulse" />
                  <div className="h-5 w-16 bg-zinc-800 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-5/6 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-5 w-3/6 bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 w-12 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-8 bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full animate-pulse" />
                </div>
                <div className="h-3 w-28 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
