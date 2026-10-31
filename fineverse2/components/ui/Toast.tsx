"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, options?: { description?: string; type?: ToastType; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, options?: { description?: string; type?: ToastType; duration?: number }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: Toast = {
        id,
        message,
        description: options?.description,
        type: options?.type || "success",
      };

      setToasts((prev) => [...prev, newToast]);

      const duration = options?.duration || 3500;
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto p-4 bg-space-950 border shadow-2xl flex items-start gap-3 text-zinc-100 ${
                toast.type === "error"
                  ? "border-cosmic-crimson shadow-[0_0_15px_rgba(255,0,85,0.2)]"
                  : toast.type === "info"
                  ? "border-cosmic-purple shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                  : "border-acid shadow-[0_0_15px_rgba(204,255,0,0.2)]"
              }`}
            >
              <div className="mt-0.5">
                {toast.type === "error" ? (
                  <AlertCircle className="w-5 h-5 text-cosmic-crimson" />
                ) : toast.type === "info" ? (
                  <Info className="w-5 h-5 text-cosmic-purple" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-acid" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-display uppercase tracking-wider font-bold">
                  {toast.message}
                </p>
                {toast.description && (
                  <p className="text-xs font-mono text-zinc-400 mt-1">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss toast"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
