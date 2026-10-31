"use client";

import { SlidersHorizontal } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CatalogFacets } from "@/lib/data";
import { countActiveFilters, type ShopFilters } from "@/lib/shop-query";

// The sheet (and Framer Motion) is only downloaded when the shopper taps "Filters".
const FilterSheetPanel = dynamic(
  () => import("./filter-sheet-panel").then((module) => module.FilterSheetPanel),
  { ssr: false },
);

interface FilterSheetProps {
  filters: ShopFilters;
  facets: CatalogFacets;
  resultCount: number;
}

/** Mobile / tablet only: desktop shows the sidebar instead. */
export function FilterSheet({ filters, facets, resultCount }: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const activeCount = countActiveFilters(filters);

  if (open && !loaded) setLoaded(true);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onPointerEnter={() => void import("./filter-sheet-panel")}
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </Button>
      {loaded ? (
        <FilterSheetPanel
          open={open}
          onClose={close}
          filters={filters}
          facets={facets}
          resultCount={resultCount}
        />
      ) : null}
    </>
  );
}