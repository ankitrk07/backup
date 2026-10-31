import { useCartStore } from "./cart-store";
import { useWishlistStore } from "./wishlist-store";

let started = false;

/**
 * Call once after mount (Providers does this). Persisted stores are created
 * with skipHydration, so server HTML and the first client render both see
 * empty state, which means no hydration mismatch. Saved data is applied here.
 */
export async function hydrateStores(): Promise<void> {
  if (started) return;
  started = true;

  await Promise.allSettled([
    Promise.resolve(useCartStore.persist.rehydrate()),
    Promise.resolve(useWishlistStore.persist.rehydrate()),
  ]);

  // Flag as hydrated even if localStorage was unavailable, so the UI never gets stuck.
  useCartStore.getState().setHasHydrated(true);
  useWishlistStore.getState().setHasHydrated(true);
}