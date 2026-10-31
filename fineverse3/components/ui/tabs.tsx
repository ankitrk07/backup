"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  /** e.g. a review count */
  badge?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  ariaLabel: string;
  className?: string;
}

export function Tabs({ tabs, defaultTabId, ariaLabel, className }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? "");
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const target = tabs[nextIndex];
    if (!target) return;
    setActiveId(target.id);
    buttonRefs.current[target.id]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(element) => {
                buttonRefs.current[tab.id] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "-mb-px inline-flex min-h-tap shrink-0 items-center gap-2 border-b-2 px-4 font-display text-base uppercase tracking-wider transition-colors",
                selected
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-fg",
              )}
            >
              {tab.label}
              {tab.badge ? <span className="text-xs text-subtle">{tab.badge}</span> : null}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-${tab.id}-panel`}
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="pt-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}