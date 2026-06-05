"use client";

import { useState } from "react";
import {
  Home,
  BookOpen,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export default function Sidebar() {
  const [activeId, setActiveId] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <>
      {/* ── Mobile hamburger toggle ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 left-5 z-50 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/60 text-zinc-300 backdrop-blur-md md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <AnimatePresence mode="wait">
        {(mobileOpen || true) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0, width: sidebarWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              fixed md:sticky top-0 left-0 z-50 md:z-auto
              min-h-screen h-screen
              bg-zinc-950/95 backdrop-blur-xl
              border-r border-white/[0.06]
              flex flex-col
              overflow-hidden
              ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
            style={{ width: sidebarWidth }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 pt-6 pb-2">
              <motion.div
                className="flex items-center gap-3 overflow-hidden"
                layout
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm font-extrabold text-white tracking-tight whitespace-nowrap"
                    >
                      Next-Gen Academy
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 transition-colors md:hidden"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── Collapse toggle (desktop only) ── */}
            <div className="hidden md:flex justify-end px-3 py-2">
              <motion.button
                onClick={() => setCollapsed((c) => !c)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </motion.button>
            </div>

            {/* ── Navigation ── */}
            <nav
              className="flex-1 flex flex-col gap-1 px-3 mt-2"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveId(item.id);
                      setMobileOpen(false);
                    }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-semibold
                      transition-colors duration-150 outline-none
                      ${isActive
                        ? "text-white"
                        : "text-zinc-500 hover:text-zinc-200"
                      }
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Active background indicator (shared layoutId) */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bg"
                        className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Active left accent bar */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <Icon className="relative z-10 h-[18px] w-[18px] shrink-0" />

                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.12 }}
                          className="relative z-10 whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </nav>

            {/* ── Footer ── */}
            <div className="px-4 pb-6 pt-4 border-t border-white/[0.05]">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[11px] font-black text-white shadow-md shadow-emerald-500/20">
                  V
                </div>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.12 }}
                      className="min-w-0"
                    >
                      <p className="text-xs font-bold text-zinc-200 truncate">
                        Vivek
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate">
                        Active Learner
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
