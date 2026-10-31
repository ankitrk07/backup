"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, CartTotals } from "@/types/cart";
import { siteConfig } from "@/config/site";

interface CartStoreState {
  items: CartItem[];
  isDrawerOpen: boolean;
  hasHydrated: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setHasHydrated: (state: boolean) => void;

  // Computed totals getter
  getTotals: () => CartTotals;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (newItemData) => {
        const id = `${newItemData.productId}-${newItemData.color.slug}-${newItemData.size}`;
        const existingItems = get().items;
        const existingIndex = existingItems.findIndex((item) => item.id === id);

        if (existingIndex > -1) {
          const currentItem = existingItems[existingIndex];
          const newQty = Math.min(currentItem.quantity + newItemData.quantity, newItemData.maxStock);
          const updatedItems = [...existingItems];
          updatedItems[existingIndex] = { ...currentItem, quantity: newQty };
          set({ items: updatedItems, isDrawerOpen: true });
        } else {
          const newItem: CartItem = {
            ...newItemData,
            id,
            quantity: Math.min(newItemData.quantity, newItemData.maxStock),
          };
          set({ items: [...existingItems, newItem], isDrawerOpen: true });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const items = get().items.map((item) => {
          if (item.id === id) {
            const clampedQty = Math.min(quantity, item.maxStock);
            return { ...item, quantity: clampedQty };
          }
          return item;
        });

        set({ items });
      },

      clearCart: () => set({ items: [] }),

      getTotals: (): CartTotals => {
        const items = get().items;
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        const threshold = siteConfig.shipping.freeShippingThreshold;
        const hasFreeShipping = subtotal >= threshold && subtotal > 0;
        const shipping = subtotal === 0 || hasFreeShipping ? 0 : siteConfig.shipping.standardShippingFee;
        const discount = 0; // Configured for promo discounts if needed
        const total = subtotal + shipping - discount;
        
        const amountNeeded = Math.max(0, threshold - subtotal);
        const progress = Math.min(100, Math.round((subtotal / threshold) * 100));

        return {
          itemCount,
          subtotal,
          shipping,
          discount,
          total,
          freeShippingThreshold: threshold,
          amountNeededForFreeShipping: amountNeeded,
          hasFreeShipping,
          freeShippingProgress: progress,
        };
      },
    }),
    {
      name: "fineverse_cart_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
