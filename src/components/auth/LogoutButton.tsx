"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <motion.button
      onClick={handleLogout}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
        text-sm font-semibold
        text-zinc-500 hover:text-red-400
        hover:bg-red-500/10
        transition-colors duration-150 outline-none cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      aria-label="Sign out"
    >
      <LogOut className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && (
        <span className="whitespace-nowrap">
          {loading ? "Signing out…" : "Sign Out"}
        </span>
      )}
    </motion.button>
  );
}
