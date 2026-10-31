import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, RotateCcw, ShieldCheck } from "lucide-react"
import type { ProductDetail } from "@/types"

export function ProductInfoTabs({ product }: { product: ProductDetail }) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList variant="line" className="border-border w-full justify-start overflow-x-auto border-b">
        <TabsTrigger value="description" className="flex-none">
          Description
        </TabsTrigger>
        {product.specifications.length > 0 && (
          <TabsTrigger value="specifications" className="flex-none">
            Specifications
          </TabsTrigger>
        )}
        <TabsTrigger value="delivery" className="flex-none">
          Delivery & Returns
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="py-5">
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        {product.highlights.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="text-foreground flex items-start gap-2 text-sm">
                <span className="bg-brand mt-1.5 size-1.5 shrink-0 rounded-full" />
                {h}
              </li>
            ))}
          </ul>
        )}
        {product.material && (
          <p className="text-muted-foreground mt-4 text-sm">
            <span className="text-foreground font-medium">Material:</span> {product.material}
          </p>
        )}
      </TabsContent>

      {product.specifications.length > 0 && (
        <TabsContent value="specifications" className="py-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {product.specifications.map((group) => (
              <div key={group.group}>
                <h3 className="text-foreground mb-2 text-sm font-semibold">{group.group}</h3>
                <dl className="divide-border divide-y">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex justify-between gap-4 py-1.5 text-sm">
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd className="text-foreground text-right font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </TabsContent>
      )}

      <TabsContent value="delivery" className="py-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex gap-3">
            <Truck className="text-brand mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Delivery</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Usually ships within 24 hours. Standard delivery in 3–5 business days, express options available at checkout.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <RotateCcw className="text-brand mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Returns</p>
              <p className="text-muted-foreground mt-1 text-sm">
                15-day return window from delivery date. Item must be unused and in original packaging.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ShieldCheck className="text-brand mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Warranty</p>
              <p className="text-muted-foreground mt-1 text-sm">
                {product.warrantyMonths
                  ? `Covered by a ${product.warrantyMonths}-month manufacturer warranty against defects.`
                  : "Every Fineverse order is backed by our quality guarantee."}
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
