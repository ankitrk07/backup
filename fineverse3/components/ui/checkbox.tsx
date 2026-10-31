import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  label: ReactNode;
  description?: ReactNode;
}

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex min-h-tap cursor-pointer items-start gap-3 py-1.5", className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded border border-line bg-surface text-accent-fg transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:opacity-50 peer-aria-[invalid=true]:border-danger [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <Check className="size-4" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-sm leading-6 text-muted">
        {label}
        {description ? <span className="block text-subtle">{description}</span> : null}
      </span>
    </label>
  );
}