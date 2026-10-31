"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Star,
  Tag,
  ExternalLink,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
] as const

export function AdminMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Open admin menu" className="hover:bg-muted flex size-9 items-center justify-center rounded-lg lg:hidden">
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-border border-b">
          <SheetTitle>Fineverse Admin</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium",
                  active ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:bg-muted mt-2 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
          >
            <ExternalLink className="size-4" />
            View Store
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
