"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Course } from "@/types/course";
import SearchBar from "./SearchBar";
import { CourseGrid } from "./CourseGrid";

interface CourseSearchWrapperProps {
  courses: Course[];
}

/**
 * Client wrapper that provides search filtering over server-fetched courses.
 * No page refresh — filtering happens entirely client-side with debouncing.
 */
export default function CourseSearchWrapper({ courses }: CourseSearchWrapperProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      if (!query) {
        setFilteredCourses(courses);
        return;
      }

      const lowerQuery = query.toLowerCase();

      const results = courses.filter((course) => {
        const titleMatch = course.title.toLowerCase().includes(lowerQuery);
        // icon_name acts as a category proxy (e.g., "Code", "Globe", "Terminal")
        const categoryMatch = course.icon_name.toLowerCase().includes(lowerQuery);
        return titleMatch || categoryMatch;
      });

      setFilteredCourses(results);
    },
    [courses]
  );

  return (
    <div className="space-y-6 w-full">
      {/* Search bar */}
      <SearchBar
        onSearch={handleSearch}
        resultCount={filteredCourses.length}
        totalCount={courses.length}
      />

      {/* Results */}
      <AnimatePresence mode="wait">
        {filteredCourses.length === 0 && searchQuery ? (
          /* No results state */
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center py-16 space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/30 flex items-center justify-center text-zinc-500">
              <SearchX className="h-7 w-7" />
            </div>
            <div className="text-center space-y-1.5 max-w-xs">
              <h4 className="text-base font-bold text-white">
                No courses found
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                No courses match &ldquo;
                <span className="text-zinc-300 font-semibold">{searchQuery}</span>
                &rdquo;. Try searching by title or category.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`results-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <CourseGrid courses={filteredCourses} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
