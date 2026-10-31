import { Container } from "@/components/shared/container"
import { ProductGrid } from "@/components/product/product-grid"
import { EmptyResults } from "@/components/product/empty-results"
import { FiltersPanel } from "@/components/product/filters-panel"
import { FiltersDrawer } from "@/components/product/filters-drawer"
import { ActiveFilterChips } from "@/components/product/active-filter-chips"
import { SortSelect } from "@/components/product/sort-select"
import { PaginationControls } from "@/components/product/pagination-controls"
import { getFilteredProducts, getCatalogFacets } from "@/lib/services/catalog-service"
import type { ProductFilters } from "@/types"

export async function ProductListing({
  title,
  description,
  filters,
  fixedCategorySlug,
  basePath,
  rawSearchParams,
}: {
  title: string
  description?: string
  filters: ProductFilters
  fixedCategorySlug?: string
  basePath: string
  rawSearchParams: Record<string, string | string[] | undefined>
}) {
  // Sequential rather than Promise.all — see homepage for why (the local
  // dev database only reliably serves one query at a time).
  const { products, total, page, pageCount } = await getFilteredProducts(filters)
  const facets = await getCatalogFacets(fixedCategorySlug ?? filters.category, filters.q)

  return (
    <Container className="py-8 sm:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">{description}</p>}
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FiltersPanel facets={facets} fixedCategorySlug={fixedCategorySlug} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FiltersDrawer facets={facets} fixedCategorySlug={fixedCategorySlug} />
              <p className="text-muted-foreground text-sm">
                {total.toLocaleString("en-IN")} {total === 1 ? "product" : "products"}
              </p>
            </div>
            <SortSelect />
          </div>

          <div className="mb-5">
            <ActiveFilterChips facets={facets} />
          </div>

          {products.length === 0 ? (
            <EmptyResults clearHref={basePath} />
          ) : (
            <>
              <ProductGrid products={products} />
              <div className="mt-10">
                <PaginationControls
                  basePath={basePath}
                  currentSearchParams={rawSearchParams}
                  page={page}
                  pageCount={pageCount}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}
