import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import type { CartLine } from "@/types"
import type { DeliveryMethod } from "@/lib/pricing"
import { calculateOrderTotals } from "@/lib/pricing"

export function CheckoutSummary({
  items,
  discount,
  deliveryMethod,
}: {
  items: CartLine[]
  discount: number
  deliveryMethod: DeliveryMethod
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const { shipping, tax, total } = calculateOrderTotals(subtotal, discount, deliveryMethod)

  return (
    <div className="border-border h-fit rounded-xl border p-5">
      <h2 className="text-foreground text-lg font-semibold">Order Summary</h2>

      <ul className="mt-4 flex max-h-64 flex-col gap-3 overflow-y-auto">
        {items.map((item) => (
          <li key={item.variantId} className="flex gap-3">
            <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-md">
              {item.image && <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />}
              <span className="bg-foreground text-background absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full text-[10px] font-semibold">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm text-foreground">{item.name}</p>
              {(item.color || item.size) && (
                <p className="text-muted-foreground text-xs">{[item.color, item.size].filter(Boolean).join(" / ")}</p>
              )}
            </div>
            <span className="font-mono text-sm text-foreground">{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <Separator className="my-4" />

      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-mono text-foreground">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-success">Discount</dt>
            <dd className="text-success font-mono">-{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd className="font-mono text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tax (5%)</dt>
          <dd className="font-mono text-foreground">{formatPrice(tax)}</dd>
        </div>
      </dl>

      <Separator className="my-4" />

      <div className="flex justify-between">
        <span className="text-foreground font-semibold">Total</span>
        <span className="font-mono text-lg font-semibold text-foreground">{formatPrice(total)}</span>
      </div>
    </div>
  )
}
