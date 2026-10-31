import type { Metadata } from "next"
import { ProductListing } from "@/components/product/product-listing"
import { ProductCarousel } from "@/components/home/product-carousel"
import { productFiltersCache, toProductFilters } from "@/lib/validations/product-filters"
import { getFilteredProducts } from "@/lib/services/catalog-service"
import { getRecommendedProducts } from "@/lib/services/product-service"

export async function generateMetadata({
  searchParams,
}: PageProps<"/search">): Promise<Metadata> {
  const params = await productFiltersCache.parse(searchParams)
  return {
    title: params.q ? `Search results for "${params.q}"` : "Search",
  }
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await productFiltersCache.parse(searchParams)
  const filters = toProductFilters(params)
  const query = filters.q?.trim()

  if (!query) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Search Fineverse</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Use the search bar above to find products by name, brand, or category.
        </p>
      </div>
    )
  }

  const { total } = await getFilteredProducts(filters)

  if (total === 0) {
    const recommended = await getRecommendedProducts(8)
    return (
      <div className="py-10">
        <div className="mx-auto max-w-lg px-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            No results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Try checking your spelling or searching for a more general term.
          </p>
        </div>
        <ProductCarousel title="You might like" products={recommended} />
      </div>
    )
  }

  return (
    <ProductListing
      title={`Search results for "${query}"`}
      description={`${total} ${total === 1 ? "product" : "products"} found`}
      filters={filters}
      basePath="/search"
      rawSearchParams={await searchParams}
    />
  )
}
