"use client"

import { useState } from "react"
import Link from "next/link"
import type { Route } from "next"
import { signOut, useSession } from "next-auth/react"
import { Menu, User, HelpCircle, Info, LogOut, MapPin, Package, Phone } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { SearchBar } from "@/components/layout/search-bar"
import { navCategories } from "@/lib/constants"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="hover:bg-muted flex size-9 items-center justify-center rounded-full lg:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-xs">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg font-semibold">Fineverse</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          <SearchBar onNavigate={() => setOpen(false)} />

          <Accordion type="single" collapsible className="w-full">
            {navCategories.map((cat) => (
              <AccordionItem key={cat.href} value={cat.href}>
                <AccordionTrigger className="text-sm font-medium">{cat.label}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href={cat.href as Route}
                      onClick={() => setOpen(false)}
                      className="text-brand py-1.5 text-sm font-medium"
                    >
                      All {cat.label}
                    </Link>
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href as Route}
                        onClick={() => setOpen(false)}
                        className="text-muted-foreground py-1.5 text-sm"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Separator />

          <nav className="flex flex-col gap-1">
            {session?.user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
                >
                  <User className="size-4" /> My Profile
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setOpen(false)}
                  className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
                >
                  <Package className="size-4" /> My Orders
                </Link>
                <Link
                  href="/account/addresses"
                  onClick={() => setOpen(false)}
                  className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
                >
                  <MapPin className="size-4" /> Addresses
                </Link>
                <button
                  onClick={() => {
                    setOpen(false)
                    signOut()
                  }}
                  className="text-sale flex items-center gap-2.5 py-2 text-left text-sm font-medium"
                >
                  <LogOut className="size-4" /> Log Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
              >
                <User className="size-4" /> Sign In
              </Link>
            )}
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
            >
              <Info className="size-4" /> About Fineverse
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
            >
              <Phone className="size-4" /> Contact Us
            </Link>
            <Link
              href="/faq"
              onClick={() => setOpen(false)}
              className="text-foreground flex items-center gap-2.5 py-2 text-sm font-medium"
            >
              <HelpCircle className="size-4" /> FAQ
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
