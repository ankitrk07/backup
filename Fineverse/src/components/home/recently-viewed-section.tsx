"use client"

import { useRecentlyViewedStore } from "@/store/recently-viewed-store"
import { useMounted } from "@/hooks/use-mounted"
import { ProductCarousel } from "@/components/home/product-carousel"

export function RecentlyViewedSection() {
  const mounted = useMounted()
  const items = useRecentlyViewedStore((s) => s.items)

  if (!mounted || items.length === 0) return null

  return <ProductCarousel title="Recently Viewed" products={items} />
}
