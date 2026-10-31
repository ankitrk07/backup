"use client"

import { useQueryStates } from "nuqs"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/shared/star-rating"
import { cn, formatPrice } from "@/lib/utils"
import { productFilterParsers } from "@/lib/validations/product-filters"
import type { CatalogFacets } from "@/lib/services/catalog-service"

const RATING_OPTIONS = [4, 3, 2, 1]

export function FiltersPanel({
  facets,
  fixedCategorySlug,
}: {
  facets: CatalogFacets
  fixedCategorySlug?: string
}) {
  const [filters, setFilters] = useQueryStates(productFilterParsers, {
    shallow: false,
    history: "replace",
  })

  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice ?? facets.priceMin,
    filters.maxPrice ?? facets.priceMax,
  ])

  const toggleArrayValue = (key: "brand" | "color" | "size", value: string) => {
    const current = filters[key]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    setFilters({ [key]: next, page: 1 })
  }

  return (
    <div className="flex flex-col gap-5">
      {!fixedCategorySlug && (
        <FilterSection title="Category">
          <RadioGroup
            value={filters.category ?? ""}
            onValueChange={(value) => setFilters({ category: value || null, page: 1 })}
            className="gap-1"
          >
            <RadioOption
              id="cat-all"
              value=""
              label="All Categories"
              active={!filters.category}
            />
            {["electronics", "fashion", "toys"].map((slug) => (
              <RadioOption
                key={slug}
                id={`cat-${slug}`}
                value={slug}
                label={slug[0].toUpperCase() + slug.slice(1)}
                active={filters.category === slug}
              />
            ))}
          </RadioGroup>
        </FilterSection>
      )}

      {fixedCategorySlug && facets.subcategories.length > 0 && (
        <FilterSection title="Subcategory">
          <RadioGroup
            value={filters.sub ?? ""}
            onValueChange={(value) => setFilters({ sub: value || null, page: 1 })}
            className="gap-1"
          >
            <RadioOption
              id="sub-all"
              value=""
              label="All"
              active={!filters.sub}
            />
            {facets.subcategories.map((sub) => (
              <RadioOption
                key={sub.slug}
                id={`sub-${sub.slug}`}
                value={sub.slug}
                label={sub.name}
                active={filters.sub === sub.slug}
              />
            ))}
          </RadioGroup>
        </FilterSection>
      )}

      {facets.brands.length > 0 && (
        <>
          <Separator />
          <FilterSection title="Brand">
            <div className="flex max-h-52 flex-col gap-1 overflow-y-auto pr-1">
              {facets.brands.map((brand) => {
                const isChecked = filters.brand.includes(brand.slug)
                return (
                  <label
                    key={brand.slug}
                    className={cn(
                      "group flex h-8.5 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-xs sm:text-sm transition-all duration-150 select-none",
                      isChecked
                        ? "bg-indigo-500/15 font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 shadow-xs"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-normal border border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggleArrayValue("brand", brand.slug)}
                      className={cn(
                        "size-4 transition-colors",
                        isChecked && "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500"
                      )}
                    />
                    <span className="truncate">{brand.name}</span>
                  </label>
                )
              })}
            </div>
          </FilterSection>
        </>
      )}

      {facets.priceMax > facets.priceMin && (
        <>
          <Separator />
          <FilterSection title="Price Range">
            <div className="px-1 pt-1">
              <Slider
                min={facets.priceMin}
                max={facets.priceMax}
                step={Math.max(1, Math.round((facets.priceMax - facets.priceMin) / 100))}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                onValueCommit={(value) =>
                  setFilters({ minPrice: value[0], maxPrice: value[1], page: 1 })
                }
              />
              <div className="text-muted-foreground mt-2.5 flex justify-between text-xs font-mono font-medium">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </FilterSection>
        </>
      )}

      <Separator />
      <FilterSection title="Rating">
        <RadioGroup
          value={filters.rating ? String(filters.rating) : ""}
          onValueChange={(value) => setFilters({ rating: value ? Number(value) : null, page: 1 })}
          className="gap-1"
        >
          <RadioOption
            id="rating-all"
            value=""
            label="All Ratings"
            active={!filters.rating}
          />
          {RATING_OPTIONS.map((r) => {
            const isSelected = filters.rating === r
            return (
              <label
                key={r}
                htmlFor={`rating-${r}`}
                className={cn(
                  "group flex h-8.5 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-xs sm:text-sm transition-all duration-150 select-none",
                  isSelected
                    ? "bg-indigo-500/15 font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 shadow-xs"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-normal border border-transparent"
                )}
              >
                <RadioGroupItem
                  value={String(r)}
                  id={`rating-${r}`}
                  className={cn(
                    "size-4 transition-colors",
                    isSelected && "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  )}
                />
                <div className="flex items-center gap-1.5">
                  <StarRating rating={r} size="xs" />
                  <span className="text-xs">& up</span>
                </div>
              </label>
            )
          })}
        </RadioGroup>
      </FilterSection>

      {(facets.colors.length > 0 || facets.sizes.length > 0) && <Separator />}

      {facets.colors.length > 0 && (
        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {facets.colors.map((color) => {
              const active = filters.color.includes(color.name)
              return (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => toggleArrayValue("color", color.name)}
                  className={`size-7 rounded-full border-2 transition-all ${
                    active ? "border-indigo-500 ring-2 ring-indigo-500/30 scale-110" : "border-border/60 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.hex ?? "#ccc" }}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      {facets.sizes.length > 0 && (
        <FilterSection title="Size">
          <div className="flex flex-wrap gap-2">
            {facets.sizes.map((size) => {
              const active = filters.size.includes(size)
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleArrayValue("size", size)}
                  className={`min-w-9 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    active ? "border-indigo-600 bg-indigo-600 text-white shadow-xs" : "border-border/70 hover:border-indigo-500/50"
                  }`}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      <Separator />
      <FilterSection title="Availability">
        <label className="flex h-9 cursor-pointer items-center justify-between rounded-lg px-2.5 text-xs sm:text-sm text-foreground hover:bg-muted/40 transition-colors">
          <span className="font-medium">In Stock Only</span>
          <Switch
            checked={filters.inStock ?? false}
            onCheckedChange={(checked) => setFilters({ inStock: checked || null, page: 1 })}
          />
        </label>
      </FilterSection>

      <FilterSection title="Deals">
        <label className="flex h-9 cursor-pointer items-center justify-between rounded-lg px-2.5 text-xs sm:text-sm text-foreground hover:bg-muted/40 transition-colors">
          <span className="font-medium">On Sale Only</span>
          <Switch
            checked={filters.discount ?? false}
            onCheckedChange={(checked) => setFilters({ discount: checked || null, page: 1 })}
          />
        </label>
      </FilterSection>
    </div>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-foreground mb-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground/90">{title}</h3>
      {children}
    </div>
  )
}

function RadioOption({
  id,
  value,
  label,
  active,
}: {
  id: string
  value: string
  label: string
  active?: boolean
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex h-8.5 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-xs sm:text-sm transition-all duration-150 select-none",
        active
          ? "bg-indigo-500/15 font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 shadow-xs"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-normal border border-transparent"
      )}
    >
      <RadioGroupItem
        value={value}
        id={id}
        className={cn(
          "size-4 transition-colors",
          active && "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
        )}
      />
      <span className="truncate">{label}</span>
    </label>
  )
}
