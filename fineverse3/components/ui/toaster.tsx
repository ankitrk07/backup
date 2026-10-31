"use client";

import { AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/toast-store";
import { ToastItem } from "./toast";

/** Mount once in Providers. Sits above the mobile sticky CTA bar. */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div
      role="region"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-toast flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)_+_5.5rem)] md:justify-end md:pb-6 md:pr-6"
    >
      <ol aria-live="polite" className="flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </ol>
    </div>
  );
}