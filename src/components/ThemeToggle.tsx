"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Prevent hydration mismatch — only render after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/30 animate-pulse" />
    );
  }

  const currentTheme = themes.find((t) => t.id === theme) || themes[1];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="
          relative w-9 h-9 rounded-xl
          bg-zinc-100 dark:bg-zinc-800/60
          border border-zinc-200 dark:border-zinc-700/30
          text-zinc-600 dark:text-zinc-400
          hover:text-zinc-900 dark:hover:text-zinc-100
          hover:bg-zinc-200/80 dark:hover:bg-zinc-700/60
          transition-colors cursor-pointer
          flex items-center justify-center
        "
        aria-label={`Current theme: ${currentTheme.label}. Click to change.`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <CurrentIcon className="h-4 w-4" />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="
                absolute left-0 md:left-auto md:right-0 top-full mt-2 z-50
                w-36 py-1.5
                bg-white dark:bg-zinc-900/95
                backdrop-blur-xl
                border border-zinc-200 dark:border-white/[0.08]
                rounded-xl shadow-lg dark:shadow-2xl shadow-zinc-200/50 dark:shadow-black/40
              "
            >
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold
                      transition-colors cursor-pointer
                      ${isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-500/10"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                      }
                    `}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
