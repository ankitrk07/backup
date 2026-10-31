"use client"

import { useEffect } from "react"
import { useRecentlyViewedStore } from "@/store/recently-viewed-store"
import type { ProductCardData } from "@/types"

export function TrackRecentlyViewed({ product }: { product: ProductCardData }) {
  const add = useRecentlyViewedStore((s) => s.add)

  useEffect(() => {
    add(product)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-record when the viewed product changes
  }, [product.id])

  return null
}
