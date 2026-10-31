// Shared between the cart/checkout pages (display) and order-service
// (authoritative server-side charge) so the number a customer sees is
// always the number they're charged — never recompute these independently
// in two places.
export const FREE_SHIPPING_THRESHOLD = 999
export const SHIPPING_FEE = 99
export const EXPRESS_DELIVERY_FEE = 149
export const TAX_RATE = 0.05

export type DeliveryMethod = "standard" | "express"

export function calculateOrderTotals(
  subtotal: number,
  discount: number,
  deliveryMethod: DeliveryMethod = "standard"
) {
  const afterDiscount = Math.max(0, subtotal - discount)
  const baseShipping = afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  // Express delivery always costs extra, even when standard shipping is free.
  const shipping = afterDiscount === 0 ? 0 : deliveryMethod === "express" ? baseShipping + EXPRESS_DELIVERY_FEE : baseShipping
  const tax = Math.round(afterDiscount * TAX_RATE)
  const total = afterDiscount + shipping + tax
  return { afterDiscount, shipping, tax, total }
}
