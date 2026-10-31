import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdminCustomerById } from "@/lib/services/admin-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Customer Details" }

export default async function AdminCustomerDetailPage({ params }: PageProps<"/admin/customers/[id]">) {
  const { id } = await params
  const customer = await getAdminCustomerById(id)
  if (!customer) notFound()

  const nonCancelledOrders = customer.orders.filter((o) => o.status !== "CANCELLED")
  const totalSpent = nonCancelledOrders.reduce((sum, o) => sum + Number(o.total), 0)

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">{customer.name ?? customer.email}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="text-foreground mt-1 font-medium">{customer.email}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-sm">Joined</p>
            <p className="text-foreground mt-1 font-medium">{formatDate(customer.createdAt)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-muted-foreground text-sm">Lifetime Value</p>
            <p className="text-foreground mt-1 font-medium">{formatPrice(totalSpent)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Orders ({customer.orders.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-border border-b text-left">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {customer.orders.map((order) => (
                  <tr key={order.id} className="border-border border-b last:border-0">
                    <td className="py-2.5">
                      <Link href={`/admin/orders/${order.id}`} className="text-foreground font-medium hover:underline">
                        #{order.orderNumber}
                      </Link>
                    </td>
                    <td className="text-muted-foreground py-2.5">{formatDate(order.createdAt)}</td>
                    <td className="py-2.5">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="text-foreground py-2.5 text-right font-mono">{formatPrice(Number(order.total))}</td>
                  </tr>
                ))}
                {customer.orders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-muted-foreground py-8 text-center">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Addresses ({customer.addresses.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {customer.addresses.map((address) => (
              <div key={address.id} className="border-border rounded-lg border p-3 text-sm">
                <p className="text-foreground font-medium">{address.fullName}</p>
                <p className="text-muted-foreground mt-1">
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                  <br />
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-muted-foreground mt-1">{address.phone}</p>
              </div>
            ))}
            {customer.addresses.length === 0 && <p className="text-muted-foreground text-sm">No saved addresses.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
