import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "w-full h-11 min-h-[44px] bg-space-900 border border-white/10 rounded-none px-4 text-sm text-zinc-100 placeholder:text-zinc-500 font-sans transition-all duration-150 focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-cosmic-crimson focus:border-cosmic-crimson focus:ring-cosmic-crimson",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-zinc-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-cosmic-crimson font-mono tracking-wide">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-zinc-400 font-mono">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
