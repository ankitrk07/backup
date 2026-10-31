// Lightweight, UI-facing shapes used across components. These are distinct
// from Prisma's generated model types: components should never need to know
// about DB-only fields (costPrice, internal ids, etc.), and Decimal fields
// are normalized to `number` here so client components can render/format
// them without importing Prisma's Decimal type.

export type ProductBadge = "new" | "bestseller" | "sale" | "limited-stock"

export type ProductCardData = {
  id: string
  slug: string
  name: string
  brand: string | null
  categorySlug: string
  categoryName: string
  /** Top-level category slug (electronics/fashion/toys) — categorySlug is the subcategory. */
  topCategorySlug: string
  topCategoryName: string
  image: string
  hoverImage?: string | null
  price: number
  compareAtPrice: number | null
  rating: number
  reviewCount: number
  stock: number
  badges: ProductBadge[]
  variantCount: number
  defaultVariantId: string | null
}

export type ProductVariantOption = {
  id: string
  size: string | null
  color: string | null
  colorHex: string | null
  stock: number
  priceOverride: number | null
}

export type ProductSpecGroup = {
  group: string
  items: { label: string; value: string }[]
}

export type ProductDetail = ProductCardData & {
  description: string
  highlights: string[]
  images: string[]
  variants: ProductVariantOption[]
  specifications: ProductSpecGroup[]
  material: string | null
  warrantyMonths: number | null
  minAgeMonths: number | null
  maxAgeMonths: number | null
  safetyInfo: string | null
};

export type CartLine = {
  cartItemId?: string
  productId: string
  variantId: string
  slug: string
  name: string
  image: string | null
  price: number
  compareAtPrice: number | null
  size?: string | null
  color?: string | null
  quantity: number
  stock: number
  savedForLater: boolean
}

export type WishlistLine = {
  productId: string
  variantId: string | null
  slug: string
  name: string
  image: string | null
  price: number
  compareAtPrice: number | null
  inStock: boolean
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular"
  | "discount"

export type ProductFilters = {
  category?: string
  subcategory?: string
  brand?: string[]
  minPrice?: number
  maxPrice?: number
  rating?: number
  featuredOnly?: boolean
  inStockOnly?: boolean
  minDiscount?: number
  color?: string[]
  size?: string[]
  sort?: SortOption
  page?: number
  q?: string
}
