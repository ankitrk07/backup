import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ProductCardData } from "@/types"

const MAX_ITEMS = 12

type RecentlyViewedState = {
  items: ProductCardData[]
  add: (product: ProductCardData) => void
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      add: (product) => {
        set((state) => ({
          items: [product, ...state.items.filter((p) => p.id !== product.id)].slice(0, MAX_ITEMS),
        }))
      },
    }),
    { name: "fineverse-recently-viewed" }
  )
)
