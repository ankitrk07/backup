import type { Metadata } from "next"
import Link from "next/link"
import { getAdminOrders } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { OrderStatusFilter } from "@/components/admin/order-status-filter"
import { AdminSearchInput } from "@/components/admin/admin-search-input"
import { PaginationControls } from "@/components/product/pagination-controls"
import { formatDate, formatPrice } from "@/lib/utils"
import type { OrderStatus } from "@/generated/prisma/client"

export const metadata: Metadata = { title: "Orders" }

export default async function AdminOrdersPage({ searchParams }: PageProps<"/admin/orders">) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const status = typeof params.status === "string" && params.status !== "all" ? (params.status as OrderStatus) : undefined
  const page = typeof params.page === "string" ? Number(params.page) : 1

  const { orders, total, pageCount } = await getAdminOrders({ q, status, page })

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">Orders</h1>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <AdminSearchInput placeholder="Search by order # or customer..." />
        </div>
        <OrderStatusFilter />
      </div>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Order</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Payment</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-border border-b last:border-0">
                  <td className="py-2.5">
                    <Link href={`/admin/orders/${order.id}`} className="text-foreground font-medium hover:underline">
                      #{order.orderNumber}
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      {order.items.length} item{order.items.length === 1 ? "" : "s"}
                    </p>
                  </td>
                  <td className="py-2.5">
                    <p className="text-foreground">{order.user.name ?? "—"}</p>
                    <p className="text-muted-foreground text-xs">{order.user.email}</p>
                  </td>
                  <td className="text-muted-foreground py-2.5">{formatDate(order.createdAt)}</td>
                  <td className="text-muted-foreground py-2.5">
                    {order.payment?.method === "COD" ? "COD" : order.payment?.method} · {order.payment?.status ?? "—"}
                  </td>
                  <td className="py-2.5">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="text-foreground py-2.5 text-right font-mono">{formatPrice(Number(order.total))}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-muted-foreground py-8 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-3 text-sm">{total} order{total === 1 ? "" : "s"} total</p>

      <div className="mt-4">
        <PaginationControls basePath="/admin/orders" currentSearchParams={params} page={page} pageCount={pageCount} />
      </div>
    </div>
  )
}
