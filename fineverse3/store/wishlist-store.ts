import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  /** returns true when the product is now saved, false when it was removed */
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      toggle: (slug) => {
        const saved = get().slugs.includes(slug);
        set((state) => ({
          slugs: saved ? state.slugs.filter((item) => item !== slug) : [...state.slugs, slug],
        }));
        return !saved;
      },

      remove: (slug) => set((state) => ({ slugs: state.slugs.filter((item) => item !== slug) })),

      clear: () => set({ slugs: [] }),
    }),
    {
      name: "fineverse-wishlist",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ slugs: state.slugs }),
            migrate: (persisted) => {
        const stored = (persisted as { slugs?: unknown } | null)?.slugs;
        return {
          slugs: Array.isArray(stored)
            ? stored.filter((item): item is string => typeof item === "string")
            : [],
        };
      },
      merge: (persisted, current) => {
        const stored = (persisted as { slugs?: unknown } | null)?.slugs;
        return {
          ...current,
          slugs: Array.isArray(stored)
            ? stored.filter((item): item is string => typeof item === "string")
            : [],
        };
      },
    },
  ),
);