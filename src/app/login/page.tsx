import React, { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { GraduationCap, Loader2 } from "lucide-react";

export const metadata = {
  title: "Login | Next-Gen Academy",
  description: "Log in to access your futuristic student learning dashboard.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center p-4 selection:bg-blue-500/30 overflow-hidden transition-colors duration-300">
      {/* Background glow filters */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Card wrapper */}
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-white/[0.06] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col space-y-6">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-650 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-550 dark:text-zinc-500">
              Sign in to continue your learning journey
            </p>
          </div>
        </div>

        {/* Login Form wrapped in Suspense to resolve useSearchParams bailout during static generation */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-bold">
            or
          </span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Footer Nav */}
        <div className="text-center">
          <Link href="/signup" className="inline-flex items-center gap-1 text-sm text-zinc-550 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
