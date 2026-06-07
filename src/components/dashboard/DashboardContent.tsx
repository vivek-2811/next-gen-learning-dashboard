"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, SearchX } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import HeroCard from "@/components/HeroCard";
import ActivityChart from "@/components/ActivityChart";
import { StatsBentoCard } from "@/components/StatsBentoCard";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { CardBackgroundMesh } from "@/components/CardBackgroundMesh";
import { SkeletonCard, SkeletonStats, SkeletonChart } from "@/components/Skeleton";
import { useToast } from "@/providers/ToastProvider";
import type { Course } from "@/types/course";
import type { DayActivity } from "@/actions/getActivityLogs";

interface DashboardContentProps {
  initialCourses: Course[];
  userName: string;
  activityData: DayActivity[];
}

// Framer Motion staggered grid variants
const bentoContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const bentoTileVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 24,
    },
  },
};

export function DashboardContent({ initialCourses, userName, activityData }: DashboardContentProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back, ${userName}!`, "success");
    }, 800);
    return () => clearTimeout(timer);
  }, [userName, showToast]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter courses based on selected categories AND search query
  const filteredCourses = initialCourses.filter((course) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(course.category);

    if (!searchQuery) return categoryMatch;

    const lowerQuery = searchQuery.toLowerCase();
    const titleMatch = course.title.toLowerCase().includes(lowerQuery);
    const categoryStringMatch =
      course.category.toLowerCase().includes(lowerQuery) ||
      course.icon_name.toLowerCase().includes(lowerQuery);

    return categoryMatch && (titleMatch || categoryStringMatch);
  });

  if (isLoading) {
    return (
      <div className="space-y-8 w-full">
        {/* Stats and Welcome Card Skeleton */}
        <SkeletonStats />
        
        {/* Chart Skeleton */}
        <SkeletonChart />

        {/* Course Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={bentoContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-auto"
    >
      {/* 1. Hero Bento Tile (2 columns on large viewports) */}
      <div className="lg:col-span-2 md:col-span-2">
        <HeroCard
          userName={userName}
          activeCoursesCount={filteredCourses.length}
          variants={bentoTileVariants}
          streakDays={12}
        />
      </div>

      {/* 2. Stats Bento Tile (1 column on large viewports) */}
      <StatsBentoCard
        courses={filteredCourses}
        variants={bentoTileVariants}
      />

      {/* 3. Activity Chart Bento Tile (2 columns on large viewports) */}
      <div className="lg:col-span-2 md:col-span-2">
        <ActivityChart
          data={activityData}
          variants={bentoTileVariants}
        />
      </div>

      {/* 4. Search & Filters Bento Tile (1 column on large viewports) */}
      <motion.section
        variants={bentoTileVariants}
        whileHover={{
          scale: 1.015,
          borderColor: "rgba(59, 130, 246, 0.4)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 25px rgba(59, 130, 246, 0.15)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
        className="p-6 bg-zinc-900/50 backdrop-blur-xl border rounded-3xl relative overflow-hidden flex flex-col justify-between h-full group"
      >
        <CardBackgroundMesh />
        <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-6">
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Discovery Engine
            </h3>
            <p className="text-lg font-black text-white mt-1">Search & Filters</p>
          </div>

          <div className="space-y-4 w-full">
            <SearchBar
              onSearch={handleSearch}
              resultCount={filteredCourses.length}
              totalCount={initialCourses.length}
            />
            <CategoryFilter
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              className="flex flex-wrap gap-2 items-center"
            />
          </div>
        </div>
      </motion.section>

      {/* Course Cards / Empty States in the same Bento grid flow */}
      {initialCourses.length === 0 ? (
        <div className="lg:col-span-3 md:col-span-2 col-span-1 py-12">
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-zinc-900/30 border border-white/[0.06] rounded-3xl backdrop-blur-md space-y-5 shadow-2xl relative overflow-hidden group">
            <CardBackgroundMesh />
            <div className="relative z-10 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-zinc-700/30 text-zinc-400">
                <FolderOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white">No Courses Enrolled</h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  We couldn&apos;t find any records in your courses profile. Add rows in Supabase to see them displayed here.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg transition-colors cursor-pointer"
                >
                  Open Supabase Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="lg:col-span-3 md:col-span-2 col-span-1 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-16 space-y-4 bg-zinc-900/30 border border-white/[0.06] rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden group"
            >
              <CardBackgroundMesh />
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-500">
                  <SearchX className="h-7 w-7" />
                </div>
                <div className="space-y-1.5 max-w-xs px-4">
                  <h4 className="text-base font-bold text-white">No courses match query</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    No courses match your active search queries or category filters. Try clearing filters or changing queries.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Render individual course cards inside the bento grid directly */
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      )}
    </motion.div>
  );
}
