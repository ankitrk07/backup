import { Container } from "@/components/shared/container"
import { Sparkles } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-indigo-100 border-b border-indigo-500/20">
      <Container className="flex h-9 items-center justify-center text-center">
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide sm:text-xs">
          <Sparkles className="size-3 text-amber-400 animate-pulse" />
          <span>Complimentary Express Shipping over ₹999</span>
          <span className="opacity-40">·</span>
          <span className="text-indigo-300">100% Genuine Curated Products</span>
          <span className="opacity-40">·</span>
          <span>15-Day Hassle-Free Returns</span>
        </p>
      </Container>
    </div>
  )
}
