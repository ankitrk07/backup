"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1 border-b border-white/10 overflow-x-auto no-scrollbar",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-3 text-xs sm:text-sm font-display uppercase tracking-wider font-bold transition-colors whitespace-nowrap min-h-[44px] focus-visible:outline-none focus-visible:text-acid",
              isActive ? "text-acid" : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[10px] font-mono",
                    isActive
                      ? "bg-acid/20 text-acid"
                      : "bg-space-800 text-zinc-400"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-acid shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
