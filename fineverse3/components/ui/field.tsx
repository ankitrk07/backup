"use client";

import { CircleAlert } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FieldControlProps {
  id: string;
  "aria-invalid": true | undefined;
  "aria-describedby": string | undefined;
  "aria-required": true | undefined;
}

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  hideLabel?: boolean;
  className?: string;
  /** Receives the id and ARIA props to spread onto the control. */
  children: (control: FieldControlProps) => ReactNode;
}

/**
 * Wires label, hint and error message to a control for screen readers.
 * Usage with react-hook-form:
 *   <Field label="Email" error={errors.email?.message}>
 *     {(control) => <Input {...control} {...register("email")} />}
 *   </Field>
 */
export function Field({ label, error, hint, required, hideLabel, className, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ");

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn("mb-1.5 block text-sm font-semibold text-fg", hideLabel && "sr-only")}
      >
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
        "aria-required": required ? true : undefined,
      })}
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}