"use client";

import { X } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Overlay } from "./overlay";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  side?: "right" | "left" | "bottom";
  /** Keeps the title for screen readers but hides it visually. */
  hideTitle?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  hideTitle = false,
  footer,
  children,
  className,
  bodyClassName,
}: DrawerProps) {
  const titleId = useId();

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      placement={side}
      panelClassName={className}
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-3">
        <h2
          id={titleId}
          className={cn("font-display text-2xl uppercase tracking-wide text-fg", hideTitle && "sr-only")}
        >
          {title}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={`Close ${title}`}>
          <X className="size-6" aria-hidden="true" />
        </Button>
      </div>
      <div className={cn("flex-1 overflow-y-auto overscroll-contain px-5 py-4", bodyClassName)}>
        {children}
      </div>
      {footer ? (
        <div className="shrink-0 border-t border-line px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4">
          {footer}
        </div>
      ) : null}
    </Overlay>
  );
}