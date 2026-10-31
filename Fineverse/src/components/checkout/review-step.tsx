"use client"

import { useState } from "react"
import { Loader2, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import type { Address } from "@/generated/prisma/client"
import type { PaymentMethod } from "@/generated/prisma/client"
import type { DeliveryMethod } from "@/lib/pricing"

const paymentLabels: Record<PaymentMethod, string> = {
  CARD: "Credit / Debit Card",
  UPI: "UPI",
  NET_BANKING: "Net Banking",
  WALLET: "Wallet",
  COD: "Cash on Delivery",
}

export function ReviewStep({
  shippingAddress,
  billingAddress,
  deliveryMethod,
  paymentMethod,
  coupon,
  couponError,
  couponLoading,
  onApplyCoupon,
  onRemoveCoupon,
  onPlaceOrder,
  placingOrder,
  onBack,
}: {
  shippingAddress: Address
  billingAddress: Address
  deliveryMethod: DeliveryMethod
  paymentMethod: PaymentMethod
  coupon: { code: string; discount: number } | null
  couponError: string | null
  couponLoading: boolean
  onApplyCoupon: (code: string) => void
  onRemoveCoupon: () => void
  onPlaceOrder: () => void
  placingOrder: boolean
  onBack: () => void
}) {
  const [couponInput, setCouponInput] = useState("")

  return (
    <div>
      <h2 className="text-foreground text-lg font-semibold">Review Your Order</h2>

      <div className="mt-4 flex flex-col gap-4">
        <div className="border-border rounded-xl border p-4">
          <p className="text-foreground text-sm font-semibold">Shipping Address</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {shippingAddress.fullName} · {shippingAddress.phone}
            <br />
            {shippingAddress.line1}
            {shippingAddress.line2 && `, ${shippingAddress.line2}`}, {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.postalCode}
          </p>
        </div>

        {billingAddress.id !== shippingAddress.id && (
          <div className="border-border rounded-xl border p-4">
            <p className="text-foreground text-sm font-semibold">Billing Address</p>
            <p className="text-muted-foreground mt-1 text-sm">
              {billingAddress.fullName} · {billingAddress.phone}
              <br />
              {billingAddress.line1}
              {billingAddress.line2 && `, ${billingAddress.line2}`}, {billingAddress.city}, {billingAddress.state}{" "}
              {billingAddress.postalCode}
            </p>
          </div>
        )}

        <div className="border-border flex items-center justify-between rounded-xl border p-4">
          <div>
            <p className="text-foreground text-sm font-semibold">Delivery</p>
            <p className="text-muted-foreground text-sm">
              {deliveryMethod === "express" ? "Express Delivery" : "Standard Delivery"}
            </p>
          </div>
          <div>
            <p className="text-foreground text-sm font-semibold">Payment</p>
            <p className="text-muted-foreground text-sm">{paymentLabels[paymentMethod]}</p>
          </div>
        </div>

        <div className="border-border rounded-xl border p-4">
          <p className="text-foreground mb-2 text-sm font-semibold">Coupon Code</p>
          {coupon ? (
            <div className="bg-secondary flex items-center justify-between rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Tag className="text-success size-3.5" />
                <span className="text-sm font-medium text-foreground">
                  {coupon.code} (-{formatPrice(coupon.discount)})
                </span>
              </div>
              <button onClick={onRemoveCoupon} aria-label="Remove coupon">
                <X className="text-muted-foreground size-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="e.g. WELCOME10"
                onKeyDown={(e) => e.key === "Enter" && onApplyCoupon(couponInput)}
              />
              <Button variant="outline" disabled={couponLoading} onClick={() => onApplyCoupon(couponInput)}>
                Apply
              </Button>
            </div>
          )}
          {couponError && <p className="text-sale mt-1.5 text-xs">{couponError}</p>}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} disabled={placingOrder}>
          Back
        </Button>
        <Button size="lg" onClick={onPlaceOrder} disabled={placingOrder}>
          {placingOrder && <Loader2 className="size-4 animate-spin" />}
          Place Order
        </Button>
      </div>
    </div>
  )
}
