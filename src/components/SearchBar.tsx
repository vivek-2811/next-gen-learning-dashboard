"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchBar({ onSearch, resultCount, totalCount }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search — 300ms delay
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      onSearch(query.trim());
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const isFiltered = query.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="w-full space-y-3"
    >
      {/* Search input container */}
      <div
        className={`
          relative flex items-center gap-3
          bg-zinc-900/60 backdrop-blur-xl
          border rounded-2xl
          transition-all duration-200
          ${isFocused
            ? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.08)]"
            : "border-white/[0.06] hover:border-white/[0.12]"
          }
        `}
      >
        {/* Search icon */}
        <div className="pl-4 flex items-center pointer-events-none">
          <Search
            className={`h-4 w-4 transition-colors duration-200 ${isFocused ? "text-blue-400" : "text-zinc-500"
              }`}
          />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search courses by title or category..."
          className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none"
          aria-label="Search courses"
        />

        {/* Clear button */}
        <AnimatePresence>
          {isFiltered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              onClick={handleClear}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Filter icon (visual indicator) */}
        <div className="pr-4 flex items-center">
          <div
            className={`p-1.5 rounded-lg transition-colors ${isFiltered
                ? "bg-blue-500/10 text-blue-400"
                : "text-zinc-600"
              }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Result counter — only shown when filtering */}
      <AnimatePresence>
        {isFiltered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-zinc-500 font-medium px-1">
              Showing{" "}
              <span className="text-zinc-300 font-bold">{resultCount}</span>
              {" "}of{" "}
              <span className="text-zinc-300 font-bold">{totalCount}</span>
              {" "}courses
              {resultCount === 0 && (
                <span className="text-zinc-600">
                  {" "}— try a different search term
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
