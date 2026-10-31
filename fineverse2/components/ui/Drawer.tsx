"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "left";
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const slideVariants = {
    initial: { x: side === "right" ? "100%" : "-100%" },
    animate: { x: 0 },
    exit: { x: side === "right" ? "100%" : "-100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div
            className={cn(
              "fixed inset-y-0 flex max-w-full",
              side === "right" ? "right-0" : "left-0"
            )}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? "drawer-title" : undefined}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className={cn(
                "relative w-screen max-w-md bg-space-950 border-white/10 shadow-2xl flex flex-col h-full text-zinc-100",
                side === "right" ? "border-l" : "border-r",
                className
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-space-900/60 backdrop-blur-md">
                {title && (
                  <h2
                    id="drawer-title"
                    className="font-display font-black text-lg tracking-wider uppercase text-white flex items-center gap-2"
                  >
                    {title}
                  </h2>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="p-2 -mr-2 text-zinc-400 hover:text-acid transition-colors rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
