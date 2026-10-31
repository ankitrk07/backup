import Link from "next/link"
import type { Route } from "next"
import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react"
import { Container } from "@/components/shared/container"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { footerLinks, siteConfig } from "@/lib/constants"

const trustPoints = [
  { icon: Truck, title: "Free Shipping", description: "On orders over ₹999" },
  { icon: RotateCcw, title: "Easy Returns", description: "15-day return window" },
  { icon: ShieldCheck, title: "Secure Payments", description: "100% protected checkout" },
  { icon: CreditCard, title: "Flexible Payment", description: "Cards, UPI & more" },
]

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-border/60 mt-24">
      <div className="border-b border-white/10">
        <Container className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <point.icon className="mt-0.5 size-5 shrink-0 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">{point.title}</p>
                <p className="text-xs text-slate-400">{point.description}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-violet-500 to-amber-400 text-white text-xs font-black">
              F
            </span>
            Fineverse
          </p>
          <p className="mt-3 max-w-xs text-sm text-slate-400">{siteConfig.description}</p>
          <p className="mt-4 text-xs text-slate-400 leading-relaxed">
            {siteConfig.supportEmail}
            <br />
            {siteConfig.supportPhone}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Shop</p>
          <ul className="mt-3 flex flex-col gap-2">
            {footerLinks.shop.map((link) => (
              <li key={link.href}>
                <Link href={link.href as Route} className="text-sm text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Support</p>
          <ul className="mt-3 flex flex-col gap-2">
            {footerLinks.support.map((link) => (
              <li key={link.href}>
                <Link href={link.href as Route} className="text-sm text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Stay Updated</p>
          <p className="mt-3 text-sm text-slate-400">Receive private sales and member perks.</p>
          <form className="mt-3 flex gap-2">
            <Input
              type="email"
              required
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="border-white/15 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
            />
            <Button type="submit" size="sm" className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">
              Join
            </Button>
          </form>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} Fineverse. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {footerLinks.company.map((link) => (
              <Link key={link.href} href={link.href as Route} className="hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}
