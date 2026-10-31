import { db } from "@/lib/db"

export type CouponValidationResult =
  | { valid: true; code: string; description: string | null; discount: number }
  | { valid: false; message: string }

export async function validateCoupon(code: string, subtotal: number): Promise<CouponValidationResult> {
  const coupon = await db.coupon.findUnique({ where: { code: code.trim().toUpperCase() } })

  if (!coupon || !coupon.isActive) {
    return { valid: false, message: "Invalid coupon code" }
  }
  if (coupon.startsAt && coupon.startsAt > new Date()) {
    return { valid: false, message: "This coupon is not active yet" }
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { valid: false, message: "This coupon has expired" }
  }
  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: "This coupon has reached its usage limit" }
  }
  const minOrderValue = coupon.minOrderValue ? Number(coupon.minOrderValue) : 0
  if (subtotal < minOrderValue) {
    return {
      valid: false,
      message: `Add ${minOrderValue - subtotal > 0 ? "more items — minimum order is" : ""} ₹${minOrderValue.toLocaleString("en-IN")} to use this coupon`,
    }
  }

  const rawDiscount =
    coupon.type === "PERCENT" ? (subtotal * Number(coupon.value)) / 100 : Number(coupon.value)
  const maxDiscount = coupon.maxDiscount ? Number(coupon.maxDiscount) : Infinity
  const discount = Math.min(rawDiscount, maxDiscount, subtotal)

  return { valid: true, code: coupon.code, description: coupon.description, discount: Math.round(discount) }
}
