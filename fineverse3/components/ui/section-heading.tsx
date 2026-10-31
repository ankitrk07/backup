import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Pick the level that fits the page outline. Each page has exactly one h1. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Optional trailing element, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        centered && "items-center text-center sm:flex-col sm:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow ? (
          <p className="mb-2 font-display text-eyebrow uppercase text-accent">{eyebrow}</p>
        ) : null}
        <Heading className="text-balance font-display text-display-md uppercase text-fg">
          {title}
        </Heading>
        {description ? <p className="mt-3 text-base text-muted sm:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}