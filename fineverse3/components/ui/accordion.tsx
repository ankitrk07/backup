"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** "single" keeps one panel open at a time. */
  type?: "single" | "multiple";
  defaultOpenIds?: string[];
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultOpenIds = [],
  headingLevel = 3,
  className,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  function toggle(id: string) {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      return type === "single" ? [id] : [...current, id];
    });
  }

  return (
    <div className={cn("divide-y divide-line rounded-lg border border-line bg-surface", className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-tap w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-fg transition-colors hover:bg-raised"
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-subtle transition-transform duration-200 motion-reduce:transition-none",
                    open && "rotate-180 text-accent",
                  )}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out-expo motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 leading-7 text-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}