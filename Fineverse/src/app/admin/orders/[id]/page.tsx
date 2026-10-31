import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAdminOrderById, VALID_TRANSITIONS } from "@/lib/services/admin-service"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { OrderStatusUpdate } from "@/components/admin/order-status-update"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Order Details" }

export default async function AdminOrderDetailPage({ params }: PageProps<"/admin/orders/[id]">) {
  const { id } = await params
  const order = await getAdminOrderById(id)
  if (!order) notFound()

  const nextStatuses = VALID_TRANSITIONS[order.status]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-foreground text-xl font-semibold">Order #{order.orderNumber}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <OrderStatusUpdate orderId={order.id} nextStatuses={nextStatuses} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-border flex flex-col divide-y">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Link
                      href={`/product/${item.productId}`}
                      target="_blank"
                      className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-md"
                    >
                      {item.image && <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground text-sm">{item.name}</p>
                      {(item.color || item.size) && (
                        <p className="text-muted-foreground text-xs">{[item.color, item.size].filter(Boolean).join(" / ")}</p>
                      )}
                      <p className="text-muted-foreground text-xs">SKU {item.sku} · Qty {item.quantity}</p>
                    </div>
                    <span className="font-mono text-sm text-foreground">{formatPrice(Number(item.price) * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-3">
                {order.events.map((event) => (
                  <li key={event.id} className="flex items-start gap-3 text-sm">
                    <span className="bg-foreground mt-1.5 size-1.5 shrink-0 rounded-full" />
                    <div>
                      <p className="text-foreground font-medium">{event.status.replace(/_/g, " ")}</p>
                      {event.note && <p className="text-muted-foreground">{event.note}</p>}
                      <p className="text-muted-foreground text-xs">{formatDate(event.createdAt, { hour: "numeric", minute: "2-digit" })}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm font-medium">{order.user.name ?? "—"}</p>
                <p className="text-muted-foreground text-sm">{order.user.email}</p>
                {order.user.phone && <p className="text-muted-foreground text-sm">{order.user.phone}</p>}
                <Link href={`/admin/customers/${order.user.id}`} className="text-brand mt-2 inline-block text-sm hover:underline">
                  View customer
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.line1}
                  {order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.phone}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Payment & Totals</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Method</dt>
                <dd className="text-foreground">{order.payment?.method === "COD" ? "Cash on Delivery" : order.payment?.method ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Payment Status</dt>
                <dd className="text-foreground">{order.payment?.status ?? "—"}</dd>
              </div>
            </dl>
            <Separator className="my-3" />
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="text-foreground font-mono">{formatPrice(Number(order.subtotal))}</dd>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between">
                  <dt className="text-success">Discount{order.coupon ? ` (${order.coupon.code})` : ""}</dt>
                  <dd className="text-success font-mono">-{formatPrice(Number(order.discount))}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="text-foreground font-mono">
                  {Number(order.shipping) === 0 ? "Free" : formatPrice(Number(order.shipping))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="text-foreground font-mono">{formatPrice(Number(order.tax))}</dd>
              </div>
            </dl>
            <Separator className="my-3" />
            <div className="flex justify-between">
              <span className="text-foreground font-semibold">Total</span>
              <span className="font-mono text-base font-semibold text-foreground">{formatPrice(Number(order.total))}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
