"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FiltersPanel } from "@/components/product/filters-panel"
import type { CatalogFacets } from "@/lib/services/catalog-service"

export function FiltersDrawer({
  facets,
  fixedCategorySlug,
}: {
  facets: CatalogFacets
  fixedCategorySlug?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 lg:hidden">
          <SlidersHorizontal className="size-3.5" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <FiltersPanel facets={facets} fixedCategorySlug={fixedCategorySlug} />
        </div>
        <SheetFooter className="border-t border-border">
          <Button onClick={() => setOpen(false)}>Show Results</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
