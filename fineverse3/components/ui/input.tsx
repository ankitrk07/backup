import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Shared look for Input, Textarea and Select. 16px text prevents iOS zoom-on-focus. */
export const controlClassName =
  "w-full rounded border border-line bg-surface px-4 text-base text-fg placeholder:text-subtle transition-colors hover:border-subtle focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(controlClassName, "h-12", className)} {...props} />;
}