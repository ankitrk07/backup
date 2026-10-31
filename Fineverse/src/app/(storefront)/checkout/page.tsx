"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { CheckoutSteps, type CheckoutStep } from "@/components/checkout/checkout-steps"
import { CheckoutSummary } from "@/components/checkout/checkout-summary"
import { AddressStep } from "@/components/checkout/address-step"
import { DeliveryStep } from "@/components/checkout/delivery-step"
import { PaymentStep } from "@/components/checkout/payment-step"
import { ReviewStep } from "@/components/checkout/review-step"
import { useCartStore } from "@/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import type { Address } from "@/generated/prisma/client"
import type { PaymentMethod } from "@/generated/prisma/client"
import type { DeliveryMethod } from "@/lib/pricing"

export default function CheckoutPage() {
  const router = useRouter()
  const mounted = useMounted()

  const allItems = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clear)
  const coupon = useCartStore((s) => s.coupon)
  const couponError = useCartStore((s) => s.couponError)
  const couponLoading = useCartStore((s) => s.couponLoading)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)
  const items = allItems.filter((i) => !i.savedForLater)

  const [step, setStep] = useState<CheckoutStep>("address")
  const [addresses, setAddresses] = useState<Address[]>([])
  const [addressesLoading, setAddressesLoading] = useState(true)
  const [shippingId, setShippingId] = useState<string | null>(null)
  const [billingId, setBillingId] = useState<string | null>(null)
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD")
  const [placingOrder, setPlacingOrder] = useState(false)

  const loadAddresses = () => {
    setAddressesLoading(true)
    fetch("/api/account/addresses")
      .then((res) => res.json())
      .then((data: Address[]) => {
        setAddresses(data)
        const defaultShipping = data.find((a) => a.type === "SHIPPING" && a.isDefault) ?? data.find((a) => a.type === "SHIPPING")
        if (defaultShipping) setShippingId(defaultShipping.id)
      })
      .finally(() => setAddressesLoading(false))
  }

  useEffect(() => {
    // Fetch-on-mount: no data-fetching library in this project, so the
    // effect owns request lifecycle (loading/result) directly.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAddresses()
  }, [])

  if (mounted && items.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <div className="bg-secondary flex size-16 items-center justify-center rounded-full">
          <ShoppingBag className="text-muted-foreground size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Add a few things to your cart before checking out.
          </p>
        </div>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </Container>
    )
  }

  const shippingAddress = addresses.find((a) => a.id === shippingId)
  const billingAddress = sameAsShipping ? shippingAddress : addresses.find((a) => a.id === billingId)

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !billingAddress) return
    setPlacingOrder(true)

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
        couponCode: coupon?.code,
        paymentMethod,
        deliveryMethod,
      }),
    })
    const data = await res.json()
    setPlacingOrder(false)

    if (!res.ok || !data.success) {
      if (data.unavailableItems?.length) {
        toast.error("Some items are no longer available", {
          description: data.unavailableItems.map((i: { name: string; availableStock: number }) => `${i.name} (only ${i.availableStock} left)`).join(", "),
        })
      } else {
        toast.error(data.error ?? "Failed to place order")
      }
      return
    }

    clearCart()
    router.push(`/checkout/success?order=${data.orderNumber}`)
  }

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Checkout</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <CheckoutSteps current={step} />

          {step === "address" && (
            <AddressStep
              addresses={addresses}
              loading={addressesLoading}
              shippingId={shippingId}
              billingId={billingId}
              sameAsShipping={sameAsShipping}
              onSelectShipping={setShippingId}
              onSelectBilling={setBillingId}
              onToggleSameAsShipping={setSameAsShipping}
              onAddressSaved={loadAddresses}
              onContinue={() => setStep("delivery")}
            />
          )}

          {step === "delivery" && (
            <DeliveryStep
              value={deliveryMethod}
              onChange={setDeliveryMethod}
              onContinue={() => setStep("payment")}
              onBack={() => setStep("address")}
            />
          )}

          {step === "payment" && (
            <PaymentStep
              value={paymentMethod}
              onChange={setPaymentMethod}
              onContinue={() => setStep("review")}
              onBack={() => setStep("delivery")}
            />
          )}

          {step === "review" && shippingAddress && billingAddress && (
            <ReviewStep
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              deliveryMethod={deliveryMethod}
              paymentMethod={paymentMethod}
              coupon={coupon}
              couponError={couponError}
              couponLoading={couponLoading}
              onApplyCoupon={(code) => code.trim() && applyCoupon(code.trim())}
              onRemoveCoupon={removeCoupon}
              onPlaceOrder={handlePlaceOrder}
              placingOrder={placingOrder}
              onBack={() => setStep("payment")}
            />
          )}
        </div>

        <CheckoutSummary items={items} discount={coupon?.discount ?? 0} deliveryMethod={deliveryMethod} />
      </div>
    </Container>
  )
}
