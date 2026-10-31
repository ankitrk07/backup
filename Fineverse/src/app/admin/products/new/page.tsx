import type { Metadata } from "next"
import { getAdminBrandOptions, getAdminCategoryOptions } from "@/lib/services/admin-service"
import { ProductForm } from "@/components/admin/product-form"
import type { ProductInput } from "@/lib/validations/admin"

export const metadata: Metadata = { title: "Add Product" }

const emptyProduct: ProductInput = {
  name: "",
  slug: "",
  description: "",
  highlights: [],
  sku: "",
  basePrice: 0,
  compareAtPrice: null,
  costPrice: null,
  condition: "NEW",
  categoryId: "",
  brandId: null,
  minAgeMonths: null,
  maxAgeMonths: null,
  safetyInfo: null,
  material: null,
  warrantyMonths: null,
  isActive: true,
  isFeatured: false,
  isBestseller: false,
  isNew: true,
  metaTitle: null,
  metaDescription: null,
  images: [""],
  variants: [
    {
      sku: "",
      size: "",
      color: "",
      colorHex: "",
      priceOverride: null,
      stock: 0,
      lowStockThreshold: 5,
      isDefault: true,
    },
  ],
  specifications: [],
}

export default async function NewProductPage() {
  const categories = await getAdminCategoryOptions()
  const brands = await getAdminBrandOptions()

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">Add Product</h1>
      <div className="mt-4">
        <ProductForm defaultValues={emptyProduct} categories={categories} brands={brands} />
      </div>
    </div>
  )
}
