import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { controlClassName } from "./input";

export function Textarea({ className, rows = 5, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      rows={rows}
      className={cn(controlClassName, "min-h-[8rem] resize-y py-3", className)}
      {...props}
    />
  );
}