"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SearchBar } from "@/components/layout/search-bar"
import { CategoriesNav } from "@/components/layout/categories-nav"
import { MobileNav } from "@/components/layout/mobile-nav"
import { IconCountButton } from "@/components/layout/icon-count-button"
import { AccountMenu } from "@/components/layout/account-menu"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import { useMounted } from "@/hooks/use-mounted"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const mounted = useMounted()

  const cartCount = useCartStore((s) => s.itemCount())
  const wishlistCount = useWishlistStore((s) => s.items.length)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-200",
        scrolled ? "border-border/80 shadow-md shadow-black/5 dark:shadow-black/30" : "border-border/40"
      )}
    >
      <Container>
        <div className="flex h-16 items-center gap-3 lg:gap-6">
          <MobileNav />

          <Link href="/" className="group flex items-center gap-2.5 shrink-0 text-xl font-bold tracking-tight text-foreground">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-violet-500 to-amber-400 text-white shadow-sm shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
              <span className="text-sm font-black tracking-tighter">F</span>
            </span>
            <span className="tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
              Fine<span className="text-indigo-500 dark:text-indigo-400">verse</span>
            </span>
          </Link>

          <div className="hidden lg:flex">
            <CategoriesNav />
          </div>

          <div className="relative ml-auto hidden max-w-md flex-1 lg:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <ThemeToggle />
            <div className="hidden sm:block">
              <AccountMenu />
            </div>
            <Link href="/wishlist" aria-label="Wishlist">
              <IconCountButton
                icon={<Heart className="size-5" />}
                count={mounted ? wishlistCount : 0}
                label="Wishlist"
              />
            </Link>
            <IconCountButton
              icon={<ShoppingBag className="size-5" />}
              count={mounted ? cartCount : 0}
              label="Cart"
              onClick={() => setCartOpen(true)}
            />
          </div>
        </div>

        <div className="pb-3 lg:hidden">
          <SearchBar />
        </div>
      </Container>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  )
}
