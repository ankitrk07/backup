"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { CatalogFacets } from "@/lib/data";
import { CATEGORY_LABEL, sizeLabel } from "@/lib/labels";
import {
  PRICE_BANDS,
  buildShopHref,
  clearFilters,
  hasActiveFilters,
  type ShopFilters,
} from "@/lib/shop-query";
import { cn } from "@/lib/utils";
import { CATEGORY_IDS, type SizeId } from "@/types/product";

interface FilterOptionProps {
  selected: boolean;
  onClick: () => void;
  count?: number;
  children: ReactNode;
}

function FilterOption({ selected, onClick, count, children }: FilterOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-tap w-full items-center justify-between gap-3 rounded px-3 text-left text-base transition-colors",
        selected ? "bg-raised text-accent" : "text-muted hover:text-fg",
      )}
    >
      <span>{children}</span>
      {count !== undefined ? <span className="text-sm text-subtle tabular">{count}</span> : null}
    </button>
  );
}

const LEGEND = "font-display text-eyebrow uppercase text-subtle";

interface FilterPanelProps {
  filters: ShopFilters;
  facets: CatalogFacets;
  /** the bottom sheet already shows its own title */
  showHeading?: boolean;
}

/** URL-driven: every click navigates to a new URL, the server re-renders the results. */
export function FilterPanel({ filters, facets, showHeading = true }: FilterPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function go(next: Partial<ShopFilters>) {
    startTransition(() => {
      router.push(buildShopHref({ ...filters, ...next, page: 1 }), { scroll: false });
    });
  }

  function toggleSize(size: SizeId) {
    go({
      sizes: filters.sizes.includes(size)
        ? filters.sizes.filter((item) => item !== size)
        : [...filters.sizes, size],
    });
  }

  const active = hasActiveFilters(filters);

  return (
    <div
      aria-busy={isPending}
      className={cn("space-y-7 transition-opacity motion-reduce:transition-none", isPending && "opacity-60")}
    >
      <div className="flex min-h-tap items-center justify-between gap-3">
        {showHeading ? (
          <h2 className="font-display text-xl uppercase tracking-wide text-fg">Filters</h2>
        ) : (
          <span />
        )}
        {active ? (
          <Link
            href={buildShopHref(clearFilters(filters))}
            scroll={false}
            className="inline-flex min-h-tap items-center text-sm text-accent underline underline-offset-4"
          >
            Clear all
          </Link>
        ) : null}
      </div>

      <fieldset>
        <legend className={LEGEND}>Category</legend>
        <div className="mt-2 flex flex-col">
          <FilterOption selected={filters.category === null} onClick={() => go({ category: null })}>
            All
          </FilterOption>
          {CATEGORY_IDS.map((id) => (
            <FilterOption
              key={id}
              selected={filters.category === id}
              count={facets.categoryCounts[id]}
              onClick={() => go({ category: filters.category === id ? null : id })}
            >
              {CATEGORY_LABEL[id]}
            </FilterOption>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={LEGEND}>Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {facets.sizes.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSize(size)}
                className={cn(
                  "inline-flex min-h-tap min-w-tap items-center justify-center rounded border px-3 text-sm font-semibold transition-colors",
                  selected
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-line text-fg hover:border-subtle",
                )}
              >
                {sizeLabel(size)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={LEGEND}>Price</legend>
        <div className="mt-2 flex flex-col">
          {PRICE_BANDS.map((band) => {
            const selected = filters.minPrice === band.min && filters.maxPrice === band.max;
            return (
              <FilterOption
                key={band.id}
                selected={selected}
                onClick={() =>
                  selected
                    ? go({ minPrice: null, maxPrice: null })
                    : go({ minPrice: band.min, maxPrice: band.max })
                }
              >
                {band.label}
              </FilterOption>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={LEGEND}>Availability</legend>
        <div className="mt-1">
          <Checkbox
            label="In stock only"
            checked={filters.inStockOnly}
            onChange={(event) => go({ inStockOnly: event.target.checked })}
          />
        </div>
      </fieldset>
    </div>
  );
}