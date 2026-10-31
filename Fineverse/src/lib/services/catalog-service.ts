import { db } from "@/lib/db"
import type { Prisma } from "@/generated/prisma/client"
import type { ProductCardData, ProductFilters } from "@/types"
import { productCardInclude, toProductCardData } from "./product-mapper"

export const PAGE_SIZE = 24

function buildWhere(filters: ProductFilters): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = { isActive: true }

  if (filters.q?.trim()) {
    where.OR = [
      { name: { contains: filters.q, mode: "insensitive" } },
      { description: { contains: filters.q, mode: "insensitive" } },
      { brand: { name: { contains: filters.q, mode: "insensitive" } } },
      { category: { name: { contains: filters.q, mode: "insensitive" } } },
    ]
  }

  if (filters.subcategory) {
    where.category = { slug: filters.subcategory }
  } else if (filters.category) {
    where.category = { OR: [{ slug: filters.category }, { parent: { slug: filters.category } }] }
  }

  if (filters.brand?.length) {
    where.brand = { slug: { in: filters.brand } }
  }

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.basePrice = {
      ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
    }
  }

  if (filters.rating) {
    where.avgRating = { gte: filters.rating }
  }

  if (filters.featuredOnly) {
    where.isFeatured = true
  }

  if (filters.minDiscount) {
    where.compareAtPrice = { not: null }
  }

  const variantConditions: Prisma.ProductVariantWhereInput[] = []
  if (filters.inStockOnly) variantConditions.push({ stock: { gt: 0 } })
  if (filters.color?.length) variantConditions.push({ color: { in: filters.color } })
  if (filters.size?.length) variantConditions.push({ size: { in: filters.size } })
  if (variantConditions.length) {
    where.variants = { some: { AND: variantConditions } }
  }

  return where
}

function buildOrderBy(sort: ProductFilters["sort"]): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" }]
    case "price-asc":
      return [{ basePrice: "asc" }]
    case "price-desc":
      return [{ basePrice: "desc" }]
    case "rating":
      return [{ avgRating: "desc" }, { reviewCount: "desc" }]
    case "popular":
      return [{ soldCount: "desc" }]
    case "discount":
      // No direct DB expression for a computed percentage; approximated by
      // sorting on the markdown amount, refined client-side isn't needed at
      // this catalog scale (see getFilteredProducts for the exact handling).
      return [{ compareAtPrice: "desc" }]
    case "featured":
    default:
      return [{ isFeatured: "desc" }, { createdAt: "desc" }]
  }
}

export type FilteredProductsResult = {
  products: ProductCardData[]
  total: number
  page: number
  pageCount: number
}

export async function getFilteredProducts(filters: ProductFilters): Promise<FilteredProductsResult> {
  const where = buildWhere(filters)
  const page = Math.max(1, filters.page ?? 1)

  // "Biggest discount" needs a computed (compareAtPrice - basePrice) / compareAtPrice
  // ratio that Prisma can't express in `orderBy`. The catalog here is small
  // enough (tens to low hundreds of products) that fetching the full matching
  // set and sorting/paginating in memory is simpler and more correct than a
  // raw-SQL query builder, at the cost of not scaling to a huge catalog.
  if (filters.sort === "discount") {
    const all = await db.product.findMany({ where, include: productCardInclude })
    const sorted = all
      .map(toProductCardData)
      .filter((p) => !filters.minDiscount || (p.compareAtPrice && p.compareAtPrice > p.price))
      .sort((a, b) => {
        const discountOf = (p: ProductCardData) =>
          p.compareAtPrice ? (p.compareAtPrice - p.price) / p.compareAtPrice : 0
        return discountOf(b) - discountOf(a)
      })
    const total = sorted.length
    const start = (page - 1) * PAGE_SIZE
    return {
      products: sorted.slice(start, start + PAGE_SIZE),
      total,
      page,
      pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
    }
  }

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: productCardInclude,
      orderBy: buildOrderBy(filters.sort),
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    db.product.count({ where }),
  ])

  let mapped = products.map(toProductCardData)
  if (filters.minDiscount) {
    mapped = mapped.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
  }

  return {
    products: mapped,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  }
}

export type CatalogFacets = {
  brands: { name: string; slug: string }[]
  priceMin: number
  priceMax: number
  colors: { name: string; hex: string | null }[]
  sizes: string[]
  subcategories: { name: string; slug: string }[]
}

export async function getCatalogFacets(categorySlug?: string, q?: string): Promise<CatalogFacets> {
  const categoryFilter: Prisma.ProductWhereInput = categorySlug
    ? { category: { OR: [{ slug: categorySlug }, { parent: { slug: categorySlug } }] } }
    : {}
  const searchFilter: Prisma.ProductWhereInput = q?.trim()
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { brand: { name: { contains: q, mode: "insensitive" } } },
          { category: { name: { contains: q, mode: "insensitive" } } },
        ],
      }
    : {}

  const [brands, priceAgg, variants, category] = await Promise.all([
    db.brand.findMany({
      where: { products: { some: { isActive: true, ...categoryFilter, ...searchFilter } } },
      select: { name: true, slug: true },
      orderBy: { name: "asc" },
    }),
    db.product.aggregate({
      where: { isActive: true, ...categoryFilter, ...searchFilter },
      _min: { basePrice: true },
      _max: { basePrice: true },
    }),
    db.productVariant.findMany({
      where: { product: { isActive: true, ...categoryFilter, ...searchFilter } },
      select: { color: true, colorHex: true, size: true },
    }),
    categorySlug
      ? db.category.findUnique({
          where: { slug: categorySlug },
          include: { children: { orderBy: { position: "asc" } } },
        })
      : Promise.resolve(null),
  ])

  const colors = new Map<string, string | null>()
  const sizes = new Set<string>()
  for (const v of variants) {
    if (v.color) colors.set(v.color, v.colorHex)
    if (v.size) sizes.add(v.size)
  }

  return {
    brands,
    priceMin: priceAgg._min.basePrice ? Math.floor(Number(priceAgg._min.basePrice)) : 0,
    priceMax: priceAgg._max.basePrice ? Math.ceil(Number(priceAgg._max.basePrice)) : 0,
    colors: Array.from(colors.entries()).map(([name, hex]) => ({ name, hex })),
    sizes: Array.from(sizes).sort(),
    subcategories: category?.children.map((c) => ({ name: c.name, slug: c.slug })) ?? [],
  }
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({ where: { slug } })
}
