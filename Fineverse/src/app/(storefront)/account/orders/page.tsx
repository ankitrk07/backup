import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Package } from "lucide-react"
import { auth } from "@/lib/auth"
import { getUserOrders } from "@/lib/services/order-service"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "My Orders" }

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user) redirect("/login?redirect=/account/orders")

  const orders = await getUserOrders(session.user.id)

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
        <Package className="text-muted-foreground size-8" />
        <p className="text-foreground font-medium">No orders yet</p>
        <p className="text-muted-foreground text-sm">When you place an order, it will show up here.</p>
        <Link href="/products" className="text-brand text-sm font-medium hover:underline">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-foreground text-lg font-semibold">My Orders</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/account/orders/${order.id}`}
              className="border-border hover:border-primary/40 block rounded-xl border p-4 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-foreground text-sm font-semibold">Order #{order.orderNumber}</p>
                  <p className="text-muted-foreground text-xs">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-3 flex items-center gap-2">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-muted relative size-12 shrink-0 overflow-hidden rounded-md">
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />}
                  </div>
                ))}
                {order.items.length > 4 && (
                  <span className="text-muted-foreground text-xs">+{order.items.length - 4} more</span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-muted-foreground text-xs">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {formatPrice(Number(order.total))}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
