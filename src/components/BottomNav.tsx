"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Activity, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "activity", label: "Activity", icon: Activity, href: "/activity" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/85 backdrop-blur-xl border-t border-white/[0.06] h-16 flex items-center justify-around px-4 pb-safe shadow-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 py-1.5 relative h-full outline-none focus-visible:text-blue-400"
          >
            {/* Active sliding bubble background */}
            {isActive && (
              <motion.div
                layoutId="bottom-nav-active-bubble"
                className="absolute inset-x-2 inset-y-1.5 rounded-xl bg-white/[0.06] border border-white/[0.08]"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            <Icon
              className={`relative z-10 h-5 w-5 transition-colors duration-250 ${
                isActive ? "text-blue-400" : "text-zinc-500"
              }`}
            />
            <span
              className={`relative z-10 text-[9px] font-bold mt-1 tracking-tight transition-colors duration-250 ${
                isActive ? "text-white" : "text-zinc-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
