"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50, transition: { duration: 0.2 } }}
              className={`
                pointer-events-auto
                flex items-start gap-3 p-4 rounded-2xl
                shadow-lg dark:shadow-black/20
                border backdrop-blur-xl
                transition-all duration-300
                ${toast.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 dark:text-emerald-400"
                  : toast.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-900 dark:text-red-400"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-400"
                }
              `}
              role="alert"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                {toast.type === "info" && <Info className="h-5 w-5 text-blue-500" />}
              </div>

              {/* Message */}
              <div className="flex-1 text-sm font-semibold leading-relaxed">
                {toast.message}
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 ml-1 p-0.5 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none outline-none cursor-pointer"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
