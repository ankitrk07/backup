import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RadioCardProps extends Omit<ComponentProps<"input">, "type" | "title"> {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned content, e.g. a price. */
  trailing?: ReactNode;
}

/** Selectable card for payment and delivery methods. A real radio input underneath. */
export function RadioCard({ title, description, trailing, className, ...props }: RadioCardProps) {
  return (
    <label className={cn("relative block cursor-pointer", className)}>
      <input type="radio" className="peer sr-only" {...props} />
      <div className="flex min-h-[4.25rem] items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-subtle peer-checked:border-accent peer-checked:bg-raised peer-checked:shadow-glow-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-checked:[&_[data-dot]]:scale-100">
        <span
          aria-hidden="true"
          className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-subtle"
        >
          <span
            data-dot
            className="size-2.5 scale-0 rounded-full bg-accent transition-transform motion-reduce:transition-none"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold text-fg">{title}</span>
          {description ? <span className="block text-sm text-muted">{description}</span> : null}
        </span>
        {trailing ? <span className="shrink-0 text-sm font-semibold text-fg">{trailing}</span> : null}
      </div>
    </label>
  );
}