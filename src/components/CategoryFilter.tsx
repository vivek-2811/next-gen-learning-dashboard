"use client";

import React from "react";
import { motion } from "framer-motion";

export type Category = "Frontend" | "Backend" | "AI" | "DevOps" | "DSA";

interface CategoryFilterProps {
  selectedCategories: Category[];
  onChange: (categories: Category[]) => void;
  className?: string;
}

const CATEGORIES: Category[] = ["Frontend", "Backend", "AI", "DevOps", "DSA"];

export function CategoryFilter({
  selectedCategories,
  onChange,
  className = "flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-4 backdrop-blur-md"
}: CategoryFilterProps) {
  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  const handleClear = () => {
    onChange([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      role="group"
      aria-label="Filter courses by category"
      className={className}
    >
      <div className="flex flex-wrap gap-2 items-center">
        <span id="category-filter-label" className="text-xs font-bold text-zinc-500 uppercase tracking-wider mr-2">
          Filter by Category:
        </span>
        <button
          onClick={handleClear}
          onKeyDown={(e) => handleKeyDown(e, handleClear)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${selectedCategories.length === 0
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
              : "bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 border border-zinc-700/20"
            }`}
          aria-pressed={selectedCategories.length === 0}
          aria-describedby="category-filter-label"
        >
          All
        </button>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <motion.button
              key={category}
              onClick={() => toggleCategory(category)}
              onKeyDown={(e) => handleKeyDown(e, () => toggleCategory(category))}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${isSelected
                  ? "bg-zinc-100 text-zinc-900 border-zinc-200 shadow-md shadow-white/5 font-extrabold"
                  : "bg-zinc-800/40 text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-850"
                }`}
              aria-pressed={isSelected}
            >
              {category}
            </motion.button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <button
          onClick={handleClear}
          onKeyDown={(e) => handleKeyDown(e, handleClear)}
          className="text-xs font-semibold text-blue-450 dark:text-blue-400 hover:text-blue-300 transition-colors self-end sm:self-auto cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
