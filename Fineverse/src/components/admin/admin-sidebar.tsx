"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="border-border bg-background hidden w-56 shrink-0 border-r lg:flex lg:flex-col">
      <div className="border-border flex h-16 items-center border-b px-5">
        <Link href="/admin" className="text-foreground text-lg font-semibold">
          Fineverse <span className="text-muted-foreground font-normal">Admin</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-border border-t p-3">
        <Link
          href="/"
          className="text-muted-foreground hover:bg-muted flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
        >
          <ExternalLink className="size-4" />
          View Store
        </Link>
      </div>
    </aside>
  )
}
