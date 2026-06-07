"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/profile";
import {
  Home,
  BookOpen,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from "@/components/auth/LogoutButton";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "activity", label: "Activity", icon: Activity, href: "/activity" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  // FIX #4 & #3: Proper async fetch with mounted guard and error handling
  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !mounted) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn("Profile fetch failed (using fallback profile):", error.message);
        if (mounted) {
          setProfile({
            id: user.id,
            full_name: user.user_metadata?.name || "Active Learner",
            email: user.email || "learner@nextgen.edu",
            avatar_url: "",
            created_at: new Date().toISOString(),
          } as Profile);
        }
        return;
      }

      if (data && mounted) {
        setProfile(data as Profile);
      }
    };

    fetchProfile();

    // Cleanup: prevent state update on unmounted component
    return () => {
      mounted = false;
    };
  }, []);

  // Auto-collapse sidebar on tablet viewports (768px to 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        setCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 80 : 260;

  return (
    <aside
      className="hidden md:flex flex-col sticky top-0 left-0 z-30 h-screen bg-zinc-950 border-r border-white/[0.06] transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      {/* ── Header ── */}
      {/* FIX #5: Collapse toggle merged into header row for cleaner layout */}
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
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

        {/* Collapse toggle — always visible in header */}
        <motion.button
          onClick={() => setCollapsed((c) => !c)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
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
        className="flex-1 flex flex-col gap-1 px-3 mt-4"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="w-full block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <motion.div
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`
                  relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-semibold
                  transition-colors duration-150 outline-none cursor-pointer
                  ${isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-200"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 pb-6 pt-4 border-t border-white/[0.05] space-y-3">
        {/* Logout button */}
        <LogoutButton collapsed={collapsed} />

        {/* User info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[11px] font-black text-white shadow-md shadow-emerald-500/20">
            {profile?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
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
                  {profile?.full_name ?? "User"}
                </p>
                <p className="text-[10px] text-zinc-500 truncate">
                  {profile?.email ?? "Active Learner"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}