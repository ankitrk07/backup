import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"
import { getAdminProducts } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PaginationControls } from "@/components/product/pagination-controls"
import { AdminSearchInput } from "@/components/admin/admin-search-input"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = { title: "Products" }

export default async function AdminProductsPage({ searchParams }: PageProps<"/admin/products">) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const page = typeof params.page === "string" ? Number(params.page) : 1

  const { products, total, pageCount } = await getAdminProducts({ q, page })

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-foreground text-2xl font-semibold">Products</h1>
        <Button asChild className="gap-1.5">
          <Link href="/admin/products/new">
            <Plus className="size-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="mt-4 max-w-sm">
        <AdminSearchInput placeholder="Search by name or SKU..." />
      </div>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Stock</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const stock = product.variants.reduce((sum, v) => sum + v.stock, 0)
                return (
                  <tr key={product.id} className="border-border border-b last:border-0">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-md">
                          {product.images[0] && (
                            <Image src={product.images[0].url} alt="" fill sizes="40px" className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-foreground truncate font-medium">{product.name}</p>
                          <p className="text-muted-foreground text-xs">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted-foreground py-2.5">{product.category.name}</td>
                    <td className="text-foreground py-2.5 font-mono">{formatPrice(Number(product.basePrice))}</td>
                    <td className="py-2.5">
                      <span className={stock === 0 ? "text-sale" : "text-foreground"}>{stock}</span>
                    </td>
                    <td className="py-2.5">
                      <Badge variant={product.isActive ? "secondary" : "outline"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-2.5 text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                    </td>
                  </tr>
                )
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-muted-foreground py-8 text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-muted-foreground mt-3 text-sm">{total} product{total === 1 ? "" : "s"} total</p>

      <div className="mt-4">
        <PaginationControls basePath="/admin/products" currentSearchParams={params} page={page} pageCount={pageCount} />
      </div>
    </div>
  )
}
