import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

// Guards client-persisted store reads (cart/wishlist counts) from SSR
// hydration mismatches: the server always renders an empty store, while
// the client may immediately rehydrate from localStorage before paint.
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
