import type { Prisma } from "@/generated/prisma/client"
import type { ProductBadge, ProductCardData, ProductDetail } from "@/types"

const cardInclude = {
  images: { orderBy: { position: "asc" as const } },
  brand: true,
  category: { include: { parent: true } },
  variants: true,
} satisfies Prisma.ProductInclude

export type ProductWithCard = Prisma.ProductGetPayload<{ include: typeof cardInclude }>

export const productCardInclude = cardInclude

function computeBadges(product: ProductWithCard): ProductBadge[] {
  const badges: ProductBadge[] = []
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)

  if (product.isNew) badges.push("new")
  if (product.isBestseller) badges.push("bestseller")
  if (product.compareAtPrice && Number(product.compareAtPrice) > Number(product.basePrice)) {
    badges.push("sale")
  }
  if (totalStock > 0 && totalStock <= 10) badges.push("limited-stock")

  return badges
}

export function toProductCardData(product: ProductWithCard): ProductCardData {
  const images = product.images
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand?.name ?? null,
    categorySlug: product.category.slug,
    categoryName: product.category.name,
    topCategorySlug: product.category.parent?.slug ?? product.category.slug,
    topCategoryName: product.category.parent?.name ?? product.category.name,
    image: images[0]?.url ?? "/placeholder-product.svg",
    hoverImage: images[1]?.url ?? null,
    price: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    rating: Number(product.avgRating),
    reviewCount: product.reviewCount,
    stock: totalStock,
    badges: computeBadges(product),
    variantCount: product.variants.length,
    defaultVariantId:
      product.variants.find((v) => v.isDefault)?.id ?? product.variants[0]?.id ?? null,
  }
}

const detailInclude = {
  ...cardInclude,
  specifications: { orderBy: { position: "asc" as const } },
} satisfies Prisma.ProductInclude

export const productDetailInclude = detailInclude

export type ProductWithDetail = Prisma.ProductGetPayload<{ include: typeof detailInclude }>

export function toProductDetail(product: ProductWithDetail): ProductDetail {
  const card = toProductCardData(product)

  const specGroups = new Map<string, { label: string; value: string }[]>()
  for (const spec of product.specifications) {
    const list = specGroups.get(spec.group) ?? []
    list.push({ label: spec.label, value: spec.value })
    specGroups.set(spec.group, list)
  }

  return {
    ...card,
    description: product.description,
    highlights: product.highlights,
    images: product.images.map((i) => i.url),
    variants: product.variants.map((v) => ({
      id: v.id,
      size: v.size,
      color: v.color,
      colorHex: v.colorHex,
      stock: v.stock,
      priceOverride: v.priceOverride ? Number(v.priceOverride) : null,
    })),
    specifications: Array.from(specGroups.entries()).map(([group, items]) => ({ group, items })),
    material: product.material,
    warrantyMonths: product.warrantyMonths,
    minAgeMonths: product.minAgeMonths,
    maxAgeMonths: product.maxAgeMonths,
    safetyInfo: product.safetyInfo,
  }
}
