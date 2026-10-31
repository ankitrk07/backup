import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { Check, Circle } from "lucide-react"
import { auth } from "@/lib/auth"
import { getOrderById } from "@/lib/services/order-service"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { CancelOrderButton } from "@/components/account/cancel-order-button"
import { PrintInvoiceButton } from "@/components/account/print-invoice-button"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Order Details" }

const TIMELINE_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"] as const
const CANCELLABLE = ["PENDING", "CONFIRMED", "PROCESSING"]

export default async function OrderDetailsPage({ params }: PageProps<"/account/orders/[id]">) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect(`/login?redirect=/account/orders/${id}`)

  const order = await getOrderById(id, session.user.id)
  if (!order) notFound()

  const isTerminalNonDelivered = order.status === "CANCELLED" || order.status === "RETURNED"
  const currentStatusIndex = TIMELINE_STATUSES.indexOf(order.status as (typeof TIMELINE_STATUSES)[number])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-foreground text-lg font-semibold">Order #{order.orderNumber}</h2>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <PrintInvoiceButton />
          {CANCELLABLE.includes(order.status) && <CancelOrderButton orderId={order.id} />}
        </div>
      </div>

      {!isTerminalNonDelivered && (
        <div className="mt-6 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6 backdrop-blur-sm shadow-xs">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order Progress</p>
          <ol className="flex items-center">
            {TIMELINE_STATUSES.map((status, i) => {
              const isCompleted = i < currentStatusIndex
              const isCurrent = i === currentStatusIndex
              const isUpcoming = i > currentStatusIndex

              return (
                <li key={status} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        "flex size-7 sm:size-8 items-center justify-center rounded-full transition-all duration-300",
                        isCompleted && "border border-emerald-500/40 bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 shadow-xs",
                        isCurrent && "bg-indigo-600 text-white ring-4 ring-indigo-500/25 shadow-lg shadow-indigo-500/30 scale-105",
                        isUpcoming && "border border-border/70 bg-muted/40 text-muted-foreground/40"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="size-3.5 sm:size-4 stroke-[2.5]" />
                      ) : isCurrent ? (
                        <span className="relative flex size-2.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <Circle className="size-2 fill-current" />
                      )}
                    </span>
                    <span
                      className={cn(
                        "hidden text-center text-[10px] sm:block max-w-[70px] leading-tight capitalize",
                        isCompleted && "text-foreground/90 font-medium",
                        isCurrent && "text-indigo-600 dark:text-indigo-400 font-bold",
                        isUpcoming && "text-muted-foreground/60 font-normal"
                      )}
                    >
                      {status.replace(/_/g, " ").toLowerCase()}
                    </span>
                  </div>
                  {i < TIMELINE_STATUSES.length - 1 && (
                    <div
                      className={cn(
                        "mx-1.5 h-0.5 flex-1 transition-colors duration-300",
                        i < currentStatusIndex ? "bg-emerald-500/70" : "bg-border/60"
                      )}
                    />
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {order.status === "CANCELLED" && (
        <div className="bg-sale/10 text-sale mt-6 rounded-xl p-4 text-sm">
          This order was cancelled{order.cancelReason ? `: ${order.cancelReason}` : "."}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h3 className="text-foreground text-sm font-semibold">Items</h3>
          <ul className="divide-border mt-3 flex flex-col divide-y">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <Link href={`/product/${item.productId}`} className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />}
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{item.name}</p>
                  {(item.color || item.size) && (
                    <p className="text-muted-foreground text-xs">{[item.color, item.size].filter(Boolean).join(" / ")}</p>
                  )}
                  <p className="text-muted-foreground text-xs">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-sm text-foreground">{formatPrice(Number(item.price) * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-5" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-foreground text-sm font-semibold">Shipping Address</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.line1}
                {order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.phone}
              </p>
            </div>
            <div>
              <h3 className="text-foreground text-sm font-semibold">Payment Information</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Method: {order.payment?.method === "COD" ? "Cash on Delivery" : order.payment?.method}
                <br />
                Status: {order.payment?.status ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-border h-fit rounded-xl border p-5">
          <h3 className="text-foreground text-sm font-semibold">Price Breakdown</h3>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-mono text-foreground">{formatPrice(Number(order.subtotal))}</dd>
            </div>
            {Number(order.discount) > 0 && (
              <div className="flex justify-between">
                <dt className="text-success">Discount{order.coupon ? ` (${order.coupon.code})` : ""}</dt>
                <dd className="text-success font-mono">-{formatPrice(Number(order.discount))}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-mono text-foreground">
                {Number(order.shipping) === 0 ? "Free" : formatPrice(Number(order.shipping))}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="font-mono text-foreground">{formatPrice(Number(order.tax))}</dd>
            </div>
          </dl>
          <Separator className="my-3" />
          <div className="flex justify-between">
            <span className="text-foreground font-semibold">Total</span>
            <span className="font-mono text-base font-semibold text-foreground">{formatPrice(Number(order.total))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
