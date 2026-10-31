import { ProductListing } from "@/components/product/product-listing"
import { productFiltersCache, toProductFilters } from "@/lib/validations/product-filters"

export async function CategoryListingPage({
  slug,
  title,
  description,
  searchParams,
}: {
  slug: string
  title: string
  description: string
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await productFiltersCache.parse(searchParams)
  const filters = toProductFilters(params, { category: slug })

  return (
    <ProductListing
      title={title}
      description={description}
      filters={filters}
      fixedCategorySlug={slug}
      basePath={`/${slug}`}
      rawSearchParams={await searchParams}
    />
  )
}
