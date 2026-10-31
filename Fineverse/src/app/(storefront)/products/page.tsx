import type { Metadata } from "next"
import { ProductListing } from "@/components/product/product-listing"
import { productFiltersCache, toProductFilters } from "@/lib/validations/product-filters"

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse the full Fineverse catalog of electronics, fashion, and toys.",
}

export const revalidate = 60

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const params = await productFiltersCache.parse(searchParams)
  const filters = toProductFilters(params)

  return (
    <ProductListing
      title="All Products"
      description="Everything Fineverse has to offer, in one place."
      filters={filters}
      basePath="/products"
      rawSearchParams={await searchParams}
    />
  )
}
