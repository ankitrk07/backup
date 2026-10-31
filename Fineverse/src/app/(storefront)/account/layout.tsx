import Link from "next/link"
import type { Metadata } from "next"
import { MapPin, Package, UserCircle } from "lucide-react"
import { Container } from "@/components/shared/container"

const navItems = [
  { href: "/account", label: "Profile", icon: UserCircle },
  { href: "/account/orders", label: "My Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
] as const

export const metadata: Metadata = {
  title: { default: "My Account", template: "%s | Fineverse" },
  robots: { index: false, follow: false },
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">My Account</h1>

      <div className="mt-6 flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:bg-muted flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  )
}
