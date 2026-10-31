import { z } from "zod"

export const productVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().min(1, "SKU is required").max(64),
  size: z.string().max(20).optional().or(z.literal("")),
  color: z.string().max(40).optional().or(z.literal("")),
  colorHex: z.string().max(9).optional().or(z.literal("")),
  priceOverride: z.number().nonnegative().optional().nullable(),
  stock: z.number().int().nonnegative(),
  lowStockThreshold: z.number().int().nonnegative(),
  isDefault: z.boolean(),
})

export const productSpecificationSchema = z.object({
  group: z.string().min(1).max(60),
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(200),
})

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  highlights: z.array(z.string().min(1)).max(10),
  sku: z.string().min(1, "SKU is required").max(64),
  basePrice: z.number().positive("Base price must be greater than 0"),
  compareAtPrice: z.number().positive().optional().nullable(),
  costPrice: z.number().positive().optional().nullable(),
  condition: z.enum(["NEW", "REFURBISHED"]),
  categoryId: z.string().min(1, "Select a category"),
  brandId: z.string().optional().nullable(),
  minAgeMonths: z.number().int().nonnegative().optional().nullable(),
  maxAgeMonths: z.number().int().nonnegative().optional().nullable(),
  safetyInfo: z.string().max(2000).optional().nullable(),
  material: z.string().max(200).optional().nullable(),
  warrantyMonths: z.number().int().nonnegative().optional().nullable(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  isBestseller: z.boolean(),
  isNew: z.boolean(),
  metaTitle: z.string().max(200).optional().nullable(),
  metaDescription: z.string().max(400).optional().nullable(),
  images: z.array(z.string().url("Enter a valid image URL")).min(1, "Add at least one image"),
  variants: z.array(productVariantSchema).min(1, "Add at least one variant"),
  specifications: z.array(productSpecificationSchema),
})

export type ProductInput = z.infer<typeof productSchema>

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(500).optional().or(z.literal("")),
  image: z.string().url().optional().or(z.literal("")),
  icon: z.string().max(60).optional().or(z.literal("")),
  parentId: z.string().optional().nullable(),
  position: z.number().int(),
})

export type CategoryInput = z.infer<typeof categorySchema>

export const couponSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[A-Z0-9]+$/, "Code may only contain uppercase letters and numbers"),
  description: z.string().max(200).optional().or(z.literal("")),
  type: z.enum(["PERCENT", "FIXED"]),
  value: z.number().positive(),
  minOrderValue: z.number().nonnegative().optional().nullable(),
  maxDiscount: z.number().positive().optional().nullable(),
  usageLimit: z.number().int().positive().optional().nullable(),
  isActive: z.boolean(),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
})

export type CouponInput = z.infer<typeof couponSchema>

export const orderStatusUpdateSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ]),
  note: z.string().max(300).optional(),
})

export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>
