"use client";

import { X } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Overlay } from "./overlay";

type ModalSize = "sm" | "md" | "lg";

const SIZES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: ModalSize;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
  className,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={description ? descriptionId : undefined}
      placement="center"
      panelClassName={cn(SIZES[size], className)}
    >
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <h2 id={titleId} className="font-display text-2xl uppercase tracking-wide text-fg">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-1 text-sm text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={`Close ${title}`}>
          <X className="size-6" aria-hidden="true" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
      {footer ? <div className="shrink-0 border-t border-line px-5 py-4">{footer}</div> : null}
    </Overlay>
  );
}