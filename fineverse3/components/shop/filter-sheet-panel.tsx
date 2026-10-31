"use client";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import type { CatalogFacets } from "@/lib/data";
import { pluralize } from "@/lib/format";
import type { ShopFilters } from "@/lib/shop-query";
import { FilterPanel } from "./shop-filters";

interface FilterSheetPanelProps {
  open: boolean;
  onClose: () => void;
  filters: ShopFilters;
  facets: CatalogFacets;
  resultCount: number;
}

export function FilterSheetPanel({
  open,
  onClose,
  filters,
  facets,
  resultCount,
}: FilterSheetPanelProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Filters"
      side="bottom"
      footer={
        <Button fullWidth size="lg" onClick={onClose}>
          Show {resultCount} {pluralize(resultCount, "product")}
        </Button>
      }
    >
      <FilterPanel filters={filters} facets={facets} showHeading={false} />
    </Drawer>
  );
}