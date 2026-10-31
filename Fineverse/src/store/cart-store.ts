import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartLine } from "@/types"

type AppliedCoupon = {
  code: string
  description: string | null
  discount: number
}

type CartState = {
  items: CartLine[]
  coupon: AppliedCoupon | null
  couponError: string | null
  couponLoading: boolean
  addItem: (item: Omit<CartLine, "quantity" | "savedForLater">, quantity?: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  saveForLater: (variantId: string) => void
  moveToCart: (variantId: string) => void
  clear: () => void
  itemCount: () => number
  subtotal: () => number
  applyCoupon: (code: string) => Promise<void>
  removeCoupon: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponError: null,
      couponLoading: false,

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock), savedForLater: false }
                  : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity, savedForLater: false }] }
        })
      },

      removeItem: (variantId) => {
        set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) }))
      },

      updateQuantity: (variantId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i
          ),
        }))
      },

      saveForLater: (variantId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, savedForLater: true } : i
          ),
        }))
      },

      moveToCart: (variantId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, savedForLater: false } : i
          ),
        }))
      },

      clear: () => set({ items: [], coupon: null, couponError: null }),

      itemCount: () =>
        get().items.filter((i) => !i.savedForLater).reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get()
          .items.filter((i) => !i.savedForLater)
          .reduce((sum, i) => sum + i.price * i.quantity, 0),

      applyCoupon: async (code) => {
        set({ couponLoading: true, couponError: null })
        try {
          const res = await fetch("/api/coupons/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, subtotal: get().subtotal() }),
          })
          const data = await res.json()
          if (data.valid) {
            set({
              coupon: { code: data.code, description: data.description, discount: data.discount },
              couponError: null,
            })
          } else {
            set({ coupon: null, couponError: data.message ?? "Invalid coupon code" })
          }
        } catch {
          set({ coupon: null, couponError: "Something went wrong. Please try again." })
        } finally {
          set({ couponLoading: false })
        }
      },

      removeCoupon: () => set({ coupon: null, couponError: null }),
    }),
    { name: "fineverse-cart" }
  )
)
