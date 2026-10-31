"use client"

import { useQueryState } from "nuqs"
import { ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { productFilterParsers } from "@/lib/validations/product-filters"

const sortLabels: Record<string, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
  popular: "Most Popular",
  discount: "Biggest Discount",
}

export function SortSelect() {
  const [sort, setSort] = useQueryState("sort", productFilterParsers.sort)
  const [, setPage] = useQueryState("page", productFilterParsers.page)

  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        setSort(value as typeof sort)
        setPage(1)
      }}
    >
      <SelectTrigger className="w-[190px]" aria-label="Sort products">
        <ArrowUpDown className="size-3.5" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(sortLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
