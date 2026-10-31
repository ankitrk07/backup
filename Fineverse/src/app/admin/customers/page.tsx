import type { Metadata } from "next"
import Link from "next/link"
import { getAdminCustomers } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { AdminSearchInput } from "@/components/admin/admin-search-input"
import { PaginationControls } from "@/components/product/pagination-controls"
import { formatDate, formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Customers" }

export default async function AdminCustomersPage({ searchParams }: PageProps<"/admin/customers">) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const page = typeof params.page === "string" ? Number(params.page) : 1

  const { customers, total, pageCount } = await getAdminCustomers({ q, page })

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">Customers</h1>

      <div className="mt-4 max-w-sm">
        <AdminSearchInput placeholder="Search by name or email..." />
      </div>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Joined</th>
                <th className="pb-2 font-medium">Orders</th>
                <th className="pb-2 text-right font-medium">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-border border-b last:border-0">
                  <td className="py-2.5">
                    <Link href={`/admin/customers/${customer.id}`} className="text-foreground font-medium hover:underline">
                      {customer.name ?? "—"}
                    </Link>
                    <p className="text-muted-foreground text-xs">{customer.email}</p>
                  </td>
                  <td className="text-muted-foreground py-2.5">{formatDate(customer.createdAt)}</td>
                  <td className="text-foreground py-2.5">{customer.orderCount}</td>
                  <td className="text-foreground py-2.5 text-right font-mono">{formatPrice(customer.totalSpent)}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-muted-foreground py-8 text-center">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-3 text-sm">{total} customer{total === 1 ? "" : "s"} total</p>

      <div className="mt-4">
        <PaginationControls basePath="/admin/customers" currentSearchParams={params} page={page} pageCount={pageCount} />
      </div>
    </div>
  )
}
