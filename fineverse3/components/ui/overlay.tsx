"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useHydrated } from "@/hooks/use-hydrated";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";

export type OverlayPlacement = "right" | "left" | "bottom" | "center" | "top";

interface MotionPreset {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLIDE = { duration: 0.3, ease: EASE };
const POP = { duration: 0.2, ease: EASE };
const INSTANT = { duration: 0.01 };

const PRESETS: Record<OverlayPlacement, MotionPreset> = {
  right: {
    initial: { x: "100%" },
    animate: { x: 0, transition: SLIDE },
    exit: { x: "100%", transition: SLIDE },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0, transition: SLIDE },
    exit: { x: "-100%", transition: SLIDE },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0, transition: SLIDE },
    exit: { y: "100%", transition: SLIDE },
  },
  center: {
    initial: { opacity: 0, scale: 0.96, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0, transition: POP },
    exit: { opacity: 0, scale: 0.96, y: 8, transition: POP },
  },
  top: {
    initial: { opacity: 0, scale: 0.97, y: -8 },
    animate: { opacity: 1, scale: 1, y: 0, transition: POP },
    exit: { opacity: 0, scale: 0.97, y: -8, transition: POP },
  },
};

/** Used when the visitor prefers reduced motion: no movement, instant fade. */
const REDUCED_PRESET: MotionPreset = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: INSTANT },
  exit: { opacity: 0, transition: INSTANT },
};

const PANEL_CLASS: Record<OverlayPlacement, string> = {
  right:
    "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-drawer",
  left: "absolute left-0 top-0 flex h-full w-full max-w-sm flex-col border-r border-line bg-surface",
  bottom:
    "absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-xl border-t border-line bg-surface shadow-sheet",
  center:
    "pointer-events-auto relative flex max-h-[90dvh] w-full flex-col rounded-xl border border-line bg-surface shadow-card",
  top: "pointer-events-auto relative flex max-h-[80dvh] w-full flex-col rounded-xl border border-line bg-surface shadow-card",
};

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog */
  labelledBy: string;
  describedBy?: string;
  placement: OverlayPlacement;
  panelClassName?: string;
  children: ReactNode;
}

/**
 * Shared behaviour for every drawer / modal / palette: portal, backdrop,
 * Escape to close, body scroll lock, focus trap and focus restore.
 */
export function Overlay({
  open,
  onClose,
  labelledBy,
  describedBy,
  placement,
  panelClassName,
  children,
}: OverlayProps) {
  const mounted = useHydrated();
  const trapRef = useFocusTrap<HTMLDivElement>(open);
  const prefersReducedMotion = useReducedMotion();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const preset = prefersReducedMotion ? REDUCED_PRESET : PRESETS[placement];
  const floating = placement === "center" || placement === "top";

  const panel = (
    <motion.div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      tabIndex={-1}
      initial={preset.initial}
      animate={preset.animate}
      exit={preset.exit}
      className={cn("outline-none", PANEL_CLASS[placement], panelClassName)}
    >
      {children}
    </motion.div>
  );

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div key="overlay" className={cn("fixed inset-0", floating ? "z-modal" : "z-drawer")}>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            onClick={onClose}
          />
          {floating ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex justify-center p-4",
                placement === "top" ? "items-start pt-[10vh]" : "items-center",
              )}
            >
              {panel}
            </div>
          ) : (
            panel
          )}
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}