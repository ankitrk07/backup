import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "acid" | "cosmic" | "outline" | "ghost" | "danger" | "surface";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "acid",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-display font-black tracking-wider uppercase transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-space-950 active:scale-[0.98]";

    const variantStyles = {
      acid: "bg-acid text-void hover:bg-acid-hover hover:shadow-acid hover:text-black border border-acid font-bold",
      cosmic:
        "bg-cosmic-purple text-white hover:bg-purple-600 hover:shadow-purple border border-cosmic-purple",
      outline:
        "bg-transparent text-white border border-white/20 hover:border-acid hover:text-acid hover:bg-acid/5",
      ghost:
        "bg-transparent text-zinc-300 hover:text-acid hover:bg-white/5 border border-transparent",
      danger:
        "bg-cosmic-crimson text-white hover:bg-red-600 hover:shadow-card border border-transparent",
      surface:
        "bg-space-850 text-white border border-white/10 hover:border-white/25 hover:bg-space-800",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs tracking-wider min-w-[36px]",
      md: "h-11 px-5 text-sm tracking-wider min-h-[44px]", // 44px touch target
      lg: "h-13 px-8 text-base tracking-widest min-h-[48px]",
      icon: "h-11 w-11 min-h-[44px] min-w-[44px] p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>LOADING...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
