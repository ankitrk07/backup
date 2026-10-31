import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "live" | "upcoming" | "soldOut" | "limited" | "discount" | "gsm" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  size = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center gap-1.5 font-mono uppercase font-semibold tracking-wider select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    live: "bg-acid/10 text-acid border border-acid/50 shadow-[0_0_10px_rgba(204,255,0,0.2)]",
    upcoming: "bg-cosmic-purple/15 text-purple-300 border border-cosmic-purple/40",
    soldOut: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    limited: "bg-void text-acid border border-acid font-bold",
    discount: "bg-cosmic-crimson/15 text-red-400 border border-cosmic-crimson/40",
    gsm: "bg-space-800 text-zinc-300 border border-white/10 font-mono",
    outline: "bg-transparent text-zinc-300 border border-white/20",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {variant === "live" && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-acid"></span>
        </span>
      )}
      {children}
    </span>
  );
};
