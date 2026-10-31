import type { Metadata } from "next"
import Image from "next/image"
import { getAdminCategories } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CategoryFormDialog } from "@/components/admin/category-form-dialog"
import { DeleteCategoryButton } from "@/components/admin/delete-category-button"

export const metadata: Metadata = { title: "Categories" }

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories()
  const topLevel = categories.filter((c) => !c.parentId)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-foreground text-2xl font-semibold">Categories</h1>
        <CategoryFormDialog topLevelCategories={topLevel} />
      </div>

      <Card className="mt-4">
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-border border-b text-left">
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Slug</th>
                <th className="pb-2 font-medium">Products</th>
                <th className="pb-2 font-medium">Subcategories</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-border border-b last:border-0">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      {category.parentId && <span className="text-muted-foreground pl-3">—</span>}
                      {category.image && (
                        <div className="bg-muted relative size-8 shrink-0 overflow-hidden rounded-md">
                          <Image src={category.image} alt="" fill sizes="32px" className="object-cover" />
                        </div>
                      )}
                      <span className="text-foreground font-medium">{category.name}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground py-2.5 font-mono text-xs">{category.slug}</td>
                  <td className="py-2.5">
                    <Badge variant="secondary">{category._count.products}</Badge>
                  </td>
                  <td className="py-2.5">
                    <Badge variant="secondary">{category._count.children}</Badge>
                  </td>
                  <td className="py-2.5 text-right">
                    <div className="flex justify-end gap-1">
                      <CategoryFormDialog
                        category={category}
                        topLevelCategories={topLevel}
                        trigger={
                          <button className="border-border hover:bg-muted rounded-lg border px-2.5 py-1 text-xs font-medium">
                            Edit
                          </button>
                        }
                      />
                      <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
