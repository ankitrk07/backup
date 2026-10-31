"use client"

import { useQueryStates } from "nuqs"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { productFilterParsers } from "@/lib/validations/product-filters"
import type { CatalogFacets } from "@/lib/services/catalog-service"

export function ActiveFilterChips({ facets }: { facets: CatalogFacets }) {
  const [filters, setFilters] = useQueryStates(productFilterParsers, {
    shallow: false,
    history: "replace",
  })

  const chips: { key: string; label: string; onRemove: () => void }[] = []

  if (filters.category) {
    chips.push({
      key: "category",
      label: filters.category[0].toUpperCase() + filters.category.slice(1),
      onRemove: () => setFilters({ category: null }),
    })
  }
  if (filters.sub) {
    const sub = facets.subcategories.find((s) => s.slug === filters.sub)
    chips.push({
      key: "sub",
      label: sub?.name ?? filters.sub,
      onRemove: () => setFilters({ sub: null }),
    })
  }
  for (const slug of filters.brand) {
    const brand = facets.brands.find((b) => b.slug === slug)
    chips.push({
      key: `brand-${slug}`,
      label: brand?.name ?? slug,
      onRemove: () => setFilters({ brand: filters.brand.filter((b) => b !== slug) }),
    })
  }
  for (const color of filters.color) {
    chips.push({
      key: `color-${color}`,
      label: color,
      onRemove: () => setFilters({ color: filters.color.filter((c) => c !== color) }),
    })
  }
  for (const size of filters.size) {
    chips.push({
      key: `size-${size}`,
      label: `Size ${size}`,
      onRemove: () => setFilters({ size: filters.size.filter((s) => s !== size) }),
    })
  }
  if (filters.rating) {
    chips.push({ key: "rating", label: `${filters.rating}★ & up`, onRemove: () => setFilters({ rating: null }) })
  }
  if (filters.minPrice != null || filters.maxPrice != null) {
    chips.push({
      key: "price",
      label: "Price range",
      onRemove: () => setFilters({ minPrice: null, maxPrice: null }),
    })
  }
  if (filters.featured) {
    chips.push({ key: "featured", label: "Featured", onRemove: () => setFilters({ featured: null }) })
  }
  if (filters.inStock) {
    chips.push({ key: "inStock", label: "In Stock", onRemove: () => setFilters({ inStock: null }) })
  }
  if (filters.discount) {
    chips.push({ key: "discount", label: "On Sale", onRemove: () => setFilters({ discount: null }) })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Badge key={chip.key} variant="secondary" className="gap-1 py-1 pl-2.5 pr-1.5">
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove ${chip.label} filter`}
            className="hover:bg-muted-foreground/20 ml-0.5 flex size-4 items-center justify-center rounded-full"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <button
        type="button"
        onClick={() =>
          setFilters({
            category: null,
            sub: null,
            brand: [],
            minPrice: null,
            maxPrice: null,
            rating: null,
            featured: null,
            inStock: null,
            discount: null,
            color: [],
            size: [],
            page: 1,
          })
        }
        className="text-muted-foreground text-xs font-medium underline-offset-2 hover:text-foreground hover:underline"
      >
        Clear all
      </button>
    </div>
  )
}
