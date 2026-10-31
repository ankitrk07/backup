import type { Metadata } from "next"
import Link from "next/link"
import { IndianRupee, Package, ShoppingBag, Users, AlertTriangle, Clock } from "lucide-react"
import { getDashboardMetrics } from "@/lib/services/admin-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Dashboard" }

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics()

  const kpis = [
    { label: "Total Revenue", value: formatPrice(metrics.totalRevenue), icon: IndianRupee },
    { label: "Orders", value: metrics.orderCount.toLocaleString("en-IN"), icon: ShoppingBag },
    { label: "Customers", value: metrics.customerCount.toLocaleString("en-IN"), icon: Users },
    { label: "Active Products", value: metrics.productCount.toLocaleString("en-IN"), icon: Package },
  ]

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{kpi.label}</p>
                <p className="text-foreground mt-1 text-2xl font-semibold">{kpi.value}</p>
              </div>
              <span className="bg-muted flex size-10 items-center justify-center rounded-full">
                <kpi.icon className="text-foreground size-5" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {metrics.pendingOrderCount > 0 && (
        <Link
          href="/admin/orders?status=PENDING"
          className="border-border bg-secondary mt-4 flex items-center gap-2.5 rounded-xl border p-4 text-sm"
        >
          <Clock className="text-foreground size-4 shrink-0" />
          <span className="text-foreground">
            <strong>{metrics.pendingOrderCount}</strong> order{metrics.pendingOrderCount === 1 ? "" : "s"} awaiting
            confirmation
          </span>
        </Link>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue — Last 14 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={metrics.chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4" /> Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.lowStockVariants.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nothing running low right now.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {metrics.lowStockVariants.map((v) => (
                  <li key={v.id}>
                    <Link
                      href={`/admin/products?q=${encodeURIComponent(v.product.name)}`}
                      className="flex items-center justify-between gap-2 text-sm hover:underline"
                    >
                      <span className="text-foreground truncate">
                        {v.product.name}
                        {(v.size || v.color) && (
                          <span className="text-muted-foreground"> · {[v.color, v.size].filter(Boolean).join(" / ")}</span>
                        )}
                      </span>
                      <Badge variant={v.stock === 0 ? "destructive" : "secondary"} className="shrink-0">
                        {v.stock} left
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Order</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {metrics.recentOrders.map((order) => (
                <tr key={order.id} className="border-border border-b last:border-0">
                  <td className="py-2.5">
                    <Link href={`/admin/orders/${order.id}`} className="text-foreground font-medium hover:underline">
                      #{order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-2.5">
                    <span className="text-foreground">{order.user.name ?? order.user.email}</span>
                  </td>
                  <td className="text-muted-foreground py-2.5">{formatDate(order.createdAt)}</td>
                  <td className="py-2.5">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="text-foreground py-2.5 text-right font-mono">{formatPrice(Number(order.total))}</td>
                </tr>
              ))}
              {metrics.recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-muted-foreground py-6 text-center">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
