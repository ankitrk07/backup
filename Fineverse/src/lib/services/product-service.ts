import { db } from "@/lib/db"
import type { ProductCardData, ProductDetail } from "@/types"
import {
  productCardInclude,
  productDetailInclude,
  toProductCardData,
  toProductDetail,
} from "./product-mapper"

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const product = await db.product.findUnique({
    where: { slug, isActive: true },
    include: productDetailInclude,
  })
  return product ? toProductDetail(product) : null
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeProductId: string,
  limit = 8
): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: {
      isActive: true,
      category: { slug: categorySlug },
      id: { not: excludeProductId },
    },
    include: productCardInclude,
    orderBy: { soldCount: "desc" },
    take: limit,
  })

  // A narrow subcategory can easily have too few (or zero) siblings — widen
  // to the parent category (or the category itself, if already top-level)
  // rather than showing an empty "related products" section.
  if (products.length < 4) {
    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      select: { parentId: true, parent: { select: { slug: true } } },
    })
    const widerSlug = category?.parent?.slug ?? categorySlug

    const wider = await db.product.findMany({
      where: {
        isActive: true,
        id: { not: excludeProductId, notIn: products.map((p) => p.id) },
        category: { OR: [{ slug: widerSlug }, { parent: { slug: widerSlug } }] },
      },
      include: productCardInclude,
      orderBy: { soldCount: "desc" },
      take: limit - products.length,
    })
    products.push(...wider)
  }

  return products.map(toProductCardData)
}

export async function getFeaturedProducts(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: productCardInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  })
  return products.map(toProductCardData)
}

export async function getBestsellers(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, isBestseller: true },
    include: productCardInclude,
    orderBy: { soldCount: "desc" },
    take: limit,
  })
  return products.map(toProductCardData)
}

export async function getNewArrivals(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, isNew: true },
    include: productCardInclude,
    orderBy: { createdAt: "desc" },
    take: limit,
  })
  return products.map(toProductCardData)
}

export async function getDeals(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, compareAtPrice: { not: null } },
    include: productCardInclude,
    orderBy: { updatedAt: "desc" },
    take: limit * 2, // over-fetch, filter by real discount below, then trim
  })
  return products
    .map(toProductCardData)
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .slice(0, limit)
}

export async function getRecommendedProducts(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true, avgRating: { gt: 0 } },
    include: productCardInclude,
    orderBy: { avgRating: "desc" },
    take: limit,
  })
  return products.map(toProductCardData)
}

export async function getTrendingProducts(limit = 8): Promise<ProductCardData[]> {
  const products = await db.product.findMany({
    where: { isActive: true },
    include: productCardInclude,
    orderBy: [{ soldCount: "desc" }, { avgRating: "desc" }],
    take: limit,
  })
  return products.map(toProductCardData)
}
