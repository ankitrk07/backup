import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "accent" | "violet" | "outline" | "muted" | "danger" | "success" | "warning";

const VARIANTS: Record<BadgeVariant, string> = {
  accent: "bg-accent text-accent-fg",
  violet: "bg-violet text-white",
  outline: "border border-line text-muted",
  muted: "bg-raised text-muted",
  danger: "border border-danger/40 bg-danger/15 text-danger",
  success: "border border-success/40 bg-success/15 text-success",
  warning: "border border-warning/40 bg-warning/15 text-warning",
};

interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "muted", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-1 font-display text-xs uppercase leading-none tracking-wider",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}