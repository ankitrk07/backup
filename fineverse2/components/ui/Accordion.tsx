"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className,
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div key={item.id} className="py-2">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isExpanded}
              className="w-full py-3.5 flex items-center justify-between text-left font-display uppercase tracking-wider text-sm font-bold text-zinc-100 hover:text-acid transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-zinc-400 group-hover:text-acid transition-transform duration-200",
                  isExpanded && "rotate-180 text-acid"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-1 text-sm text-zinc-300 leading-relaxed font-sans">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
