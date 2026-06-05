"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Lock, Mail, User, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    setError(null);

    if (!name.trim()) {
      setError("Full name is required.");
      return false;
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email address is required.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (authError) {
        // Map common errors or use Supabase message
        if (
          authError.status === 422 ||
          authError.message.toLowerCase().includes("already registered") ||
          authError.message.toLowerCase().includes("already exists")
        ) {
          setError("Account already exists. Please log in instead.");
        } else {
          setError(`Registration failed: ${authError.message}`);
        }
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Delay redirect to allow user to see success state
      setTimeout(() => {
        router.push("/login");
      }, 2500);

    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6 space-y-4"
      >
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="h-6 w-6 animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-white">Account Created!</h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Your account has been registered successfully. Redirecting you to the login page...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSignup} className="space-y-5">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-xs font-semibold"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-400 tracking-wider uppercase">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="John Doe"
            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-650 outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-400 tracking-wider uppercase">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="name@example.com"
            className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-650 outline-none transition-all disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-zinc-400 tracking-wider uppercase">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
            className="w-full pl-11 pr-11 py-3 bg-zinc-950/50 border border-zinc-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 rounded-xl text-sm text-zinc-100 placeholder:text-zinc-650 outline-none transition-all disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Registering...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </motion.button>
    </form>
  );
}
