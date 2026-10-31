import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAdminBrandOptions, getAdminCategoryOptions, getAdminProductById } from "@/lib/services/admin-service"
import { ProductForm } from "@/components/admin/product-form"
import { DeactivateProductButton } from "@/components/admin/deactivate-product-button"
import type { ProductInput } from "@/lib/validations/admin"

export const metadata: Metadata = { title: "Edit Product" }

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]/edit">) {
  const { id } = await params
  const product = await getAdminProductById(id)
  if (!product) notFound()

  const categories = await getAdminCategoryOptions()
  const brands = await getAdminBrandOptions()

  const defaultValues: ProductInput = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    highlights: product.highlights,
    sku: product.sku,
    basePrice: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    costPrice: product.costPrice ? Number(product.costPrice) : null,
    condition: product.condition,
    categoryId: product.categoryId,
    brandId: product.brandId,
    minAgeMonths: product.minAgeMonths,
    maxAgeMonths: product.maxAgeMonths,
    safetyInfo: product.safetyInfo,
    material: product.material,
    warrantyMonths: product.warrantyMonths,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    isBestseller: product.isBestseller,
    isNew: product.isNew,
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    images: product.images.map((i) => i.url),
    variants: product.variants.map((v) => ({
      id: v.id,
      sku: v.sku,
      size: v.size ?? "",
      color: v.color ?? "",
      colorHex: v.colorHex ?? "",
      priceOverride: v.priceOverride ? Number(v.priceOverride) : null,
      stock: v.stock,
      lowStockThreshold: v.lowStockThreshold,
      isDefault: v.isDefault,
    })),
    specifications: product.specifications.map((s) => ({ group: s.group, label: s.label, value: s.value })),
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-foreground text-2xl font-semibold">Edit Product</h1>
        <DeactivateProductButton productId={product.id} isActive={product.isActive} />
      </div>
      <div className="mt-4">
        <ProductForm productId={product.id} defaultValues={defaultValues} categories={categories} brands={brands} />
      </div>
    </div>
  )
}
