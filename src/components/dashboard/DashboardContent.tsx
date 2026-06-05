"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, SearchX } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CourseGrid } from "@/components/CourseGrid";
import HeroCard from "@/components/HeroCard";
import ActivityChart from "@/components/ActivityChart";
import { CategoryFilter, Category } from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { SkeletonCard, SkeletonStats, SkeletonChart } from "@/components/Skeleton";
import { useToast } from "@/providers/ToastProvider";
import type { Course } from "@/types/course";
import type { DayActivity } from "@/actions/getActivityLogs";

interface DashboardContentProps {
  initialCourses: Course[];
  userName: string;
  activityData: DayActivity[];
}

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
    // 1. Category filter match
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(course.category);

    // 2. Search query match
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
    <div className="space-y-8 w-full">
      {/* Welcome card with dynamic course count */}
      <HeroCard userName={userName} activeCoursesCount={filteredCourses.length} />

      {/* Dynamic Header Metrics (re-calculates progress stats dynamically) */}
      <DashboardHeader courses={filteredCourses} />

      {/* Categories Filter (Multi-Select) */}
      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
      />

      {/* Search Input Bar */}
      <SearchBar
        onSearch={handleSearch}
        resultCount={filteredCourses.length}
        totalCount={initialCourses.length}
      />

      {/* Weekly Activity Logs Chart */}
      <ActivityChart data={activityData} />

      {/* Dynamic Course Grid or Empty State */}
      <div className="w-full">
        {initialCourses.length === 0 ? (
          /* Enrolled Empty State */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/40 rounded-3xl backdrop-blur-sm space-y-5 shadow-sm">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-zinc-150 dark:bg-zinc-800/80 flex items-center justify-center border border-zinc-200 dark:border-zinc-700/30 text-zinc-505 dark:text-zinc-400">
              <FolderOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">No Courses Available</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                We couldn&apos;t find any records in your courses profile. Add some rows in Supabase to see them displayed here.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl shadow-md shadow-blue-600/10 transition-colors"
              >
                Open Supabase Dashboard
              </a>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Filtered No Results State */
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-16 space-y-4 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/40 rounded-3xl backdrop-blur-sm shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-250 dark:border-zinc-700/30 flex items-center justify-center text-zinc-405 dark:text-zinc-500">
                <SearchX className="h-7 w-7" />
              </div>
              <div className="text-center space-y-1.5 max-w-xs px-4">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  No courses found
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  No courses match your active search queries or category filters. Try resetting the filters or clearing the search query.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Filtered Success Grid */
          <CourseGrid courses={filteredCourses} />
        )}
      </div>
    </div>
  );
}
