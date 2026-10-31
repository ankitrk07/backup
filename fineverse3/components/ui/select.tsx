import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { controlClassName } from "./input";

/** Native <select> (best accessibility and mobile UX) with a custom chevron. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(controlClassName, "h-12 appearance-none pr-11", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-subtle"
        aria-hidden="true"
      />
    </div>
  );
}