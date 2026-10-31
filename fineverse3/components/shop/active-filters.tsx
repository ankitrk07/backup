import { X } from "lucide-react";
import Link from "next/link";
import { getActiveFilterChips, type ShopFilters } from "@/lib/shop-query";

export function ActiveFilters({ filters }: { filters: ShopFilters }) {
  const chips = getActiveFilterChips(filters);
  if (chips.length === 0) return null;

  return (
    <ul aria-label="Active filters" className="mt-4 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <Link
            href={chip.href}
            scroll={false}
            aria-label={`Remove filter: ${chip.label}`}
            className="inline-flex min-h-tap items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {chip.label}
            <X className="size-4" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}