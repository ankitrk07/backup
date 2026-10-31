import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductGrid } from "@/components/product/product-grid";
import { ActiveFilters } from "@/components/shop/active-filters";
import { FilterSheet } from "@/components/shop/filter-sheet";
import { LoadMore } from "@/components/shop/load-more";
import { SortSelect } from "@/components/shop/sort-select";
import { FilterPanel } from "@/components/shop/shop-filters";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/config/site";
import { getFacets, getProductPage } from "@/lib/data";
import { pluralize } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/labels";
import { breadcrumbJsonLd, buildMetadata, type BreadcrumbEntry } from "@/lib/seo";
import {
  DEFAULT_SORT,
  buildShopHref,
  clearFilters,
  hasActiveFilters,
  isCategoryOnly,
  parseShopParams,
  toProductQuery,
  type RawSearchParams,
} from "@/lib/shop-query";

interface ShopPageProps {
  searchParams: Promise<RawSearchParams>;
}

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const filters = parseShopParams(await searchParams);

  if (isCategoryOnly(filters) && filters.category) {
    const label = CATEGORY_LABEL[filters.category];
    return buildMetadata({
      title: label,
      description: `Shop ${siteConfig.name} ${label.toLowerCase()}. ${siteConfig.tagline}.`,
      path: buildShopHref(filters),
    });
  }

  return buildMetadata({
    title: "Shop all",
    description: `Shop every ${siteConfig.name} piece: oversized tees, hoodies, accessories and limited drops.`,
    path: "/shop",
    // Filtered / sorted / paginated views are near-duplicates, so keep them out of search results.
    noIndex: hasActiveFilters(filters) || filters.page > 1 || filters.sort !== DEFAULT_SORT,
  });
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const filters = parseShopParams(await searchParams);
  const [result, facets] = await Promise.all([
    getProductPage(toProductQuery(filters)),
    getFacets(),
  ]);

  const category = filters.category;
  const title = category ? CATEGORY_LABEL[category] : "Shop all";

  const breadcrumbs: BreadcrumbItem[] = category
    ? [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: CATEGORY_LABEL[category] },
      ]
    : [{ label: "Home", href: "/" }, { label: "Shop" }];

  const breadcrumbEntries: BreadcrumbEntry[] = category
    ? [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: CATEGORY_LABEL[category], path: buildShopHref(filters) },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
      ];

  return (
    <div className="container pb-16 pt-6">
      <JsonLd data={breadcrumbJsonLd(breadcrumbEntries)} />
      <Breadcrumbs items={breadcrumbs} />

      <header className="mt-4">
        <h1 className="font-display text-display-lg uppercase text-fg">{title}</h1>
        <p className="mt-2 max-w-2xl text-muted">
          {category
            ? `Browse ${CATEGORY_LABEL[category].toLowerCase()} from the ${siteConfig.name} universe.`
            : "Oversized tees, heavyweight hoodies, accessories and limited drops."}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] max-h-[calc(100dvh-var(--header-h)-3rem)] overflow-y-auto pr-2">
            <FilterPanel filters={filters} facets={facets} />
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <FilterSheet filters={filters} facets={facets} resultCount={result.total} />
            <p role="status" className="text-sm text-muted">
              {result.total} {pluralize(result.total, "product")}
            </p>
            <SortSelect filters={filters} />
          </div>

          <ActiveFilters filters={filters} />

          {result.items.length > 0 ? (
            <>
              <ProductGrid
                products={result.items}
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="mt-6 lg:grid-cols-3"
              />
              <LoadMore
                filters={filters}
                shown={result.items.length}
                total={result.total}
                nextPage={result.hasMore ? result.page + 1 : null}
              />
            </>
          ) : (
            <div className="mt-10 rounded-xl border border-dashed border-line px-6 py-16 text-center">
              <h2 className="font-display text-2xl uppercase text-fg">No products match</h2>
              <p className="mt-2 text-muted">Try removing a filter to see more of the universe.</p>
              <Link
                href={buildShopHref(clearFilters(filters))}
                className={buttonVariants({ variant: "outline" }, "mt-6")}
              >
                Clear all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}