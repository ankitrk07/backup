import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs font-mono tracking-wider", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 text-zinc-400">
        <li>
          <Link href="/" className="hover:text-acid transition-colors">
            HOME
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" aria-hidden="true" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-acid transition-colors uppercase">
                  {item.label}
                </Link>
              ) : (
                <span className="text-zinc-200 font-bold uppercase" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
