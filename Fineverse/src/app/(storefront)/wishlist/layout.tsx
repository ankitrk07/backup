import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Wishlist",
  robots: { index: false, follow: false },
}

export default function WishlistLayout({ children }: LayoutProps<"/wishlist">) {
  return children
}
