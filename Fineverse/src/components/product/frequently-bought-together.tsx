"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import type { ProductCardData } from "@/types"

export function FrequentlyBoughtTogether({
  current,
  related,
}: {
  current: ProductCardData
  related: ProductCardData[]
}) {
  const items = [current, ...related.slice(0, 2)]
  const [checked, setChecked] = useState<Set<string>>(new Set(items.map((i) => i.id)))
  const addItem = useCartStore((s) => s.addItem)

  if (related.length === 0) return null

  const selected = items.filter((i) => checked.has(i.id))
  const total = selected.reduce((sum, i) => sum + i.price, 0)

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleAddAll = () => {
    for (const item of selected) {
      if (!item.defaultVariantId || item.stock <= 0) continue
      addItem(
        {
          productId: item.id,
          variantId: item.defaultVariantId,
          slug: item.slug,
          name: item.name,
          image: item.image,
          price: item.price,
          compareAtPrice: item.compareAtPrice,
          stock: item.stock,
        },
        1
      )
    }
    toast.success(`Added ${selected.length} items to cart`)
  }

  return (
    <div className="border-border rounded-xl border p-5">
      <h2 className="text-lg font-semibold text-foreground">Frequently Bought Together</h2>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <Checkbox checked={checked.has(item.id)} onCheckedChange={() => toggle(item.id)} />
              <Link href={`/product/${item.slug}`} className="bg-muted relative size-16 overflow-hidden rounded-md">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
              </Link>
            </label>
            {i < items.length - 1 && <Plus className="text-muted-foreground size-4" />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-foreground text-sm">
          Total for {selected.length} items:{" "}
          <span className="font-mono font-semibold">{formatPrice(total)}</span>
        </p>
        <Button onClick={handleAddAll} disabled={selected.length === 0} size="sm">
          Add Selected to Cart
        </Button>
      </div>
    </div>
  )
}
