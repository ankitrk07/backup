import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, children, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full h-11 min-h-[44px] appearance-none bg-space-900 border border-white/10 rounded-none px-4 pr-10 text-sm text-zinc-100 font-sans transition-all duration-150 focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              error && "border-cosmic-crimson focus:border-cosmic-crimson focus:ring-cosmic-crimson",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    className="bg-space-950 text-zinc-100 py-2"
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs text-cosmic-crimson font-mono tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
