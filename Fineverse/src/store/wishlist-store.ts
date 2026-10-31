import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { WishlistLine } from "@/types"

type WishlistState = {
  items: WishlistLine[]
  toggle: (item: WishlistLine) => void
  remove: (productId: string) => void
  has: (productId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (item) => {
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId)
          return {
            items: exists
              ? state.items.filter((i) => i.productId !== item.productId)
              : [...state.items, item],
          }
        })
      },

      remove: (productId) => {
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) }))
      },

      has: (productId) => get().items.some((i) => i.productId === productId),

      clear: () => set({ items: [] }),
    }),
    { name: "fineverse-wishlist" }
  )
)
