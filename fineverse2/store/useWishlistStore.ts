"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  hasHydrated: boolean;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      toggleWishlist: (productId: string) => {
        const current = get().productIds;
        if (current.includes(productId)) {
          set({ productIds: current.filter((id) => id !== productId) });
        } else {
          set({ productIds: [...current, productId] });
        }
      },

      isInWishlist: (productId: string) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => set({ productIds: [] }),
    }),
    {
      name: "fineverse_wishlist_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
