"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToastStore, type Toast, type ToastVariant } from "@/store/toast-store";

const ICONS = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
} satisfies Record<ToastVariant, typeof Info>;

const ACCENTS: Record<ToastVariant, string> = {
  success: "border-l-success text-success",
  error: "border-l-danger text-danger",
  info: "border-l-violet-soft text-violet-soft",
};

export function ToastItem({ toast }: { toast: Toast }) {
  const dismiss = useToastStore((state) => state.dismiss);
  const prefersReducedMotion = useReducedMotion();
  const Icon = ICONS[toast.variant];

  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, dismiss]);

  return (
    <motion.li
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0, transition: { duration: 0.01 } }
          : { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.15 } }
      }
      role={toast.variant === "error" ? "alert" : "status"}
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-lg border border-l-4 border-line bg-raised p-3 pl-4 shadow-card",
        ACCENTS[toast.variant],
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1 text-fg">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description ? <p className="mt-0.5 text-sm text-muted">{toast.description}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => dismiss(toast.id)}
        aria-label="Dismiss notification"
        className="-my-1.5 -mr-1.5 flex size-11 shrink-0 items-center justify-center rounded text-subtle transition-colors hover:text-fg"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </motion.li>
  );
}