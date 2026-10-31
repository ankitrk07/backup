import { ShieldCheck, Truck, RotateCcw, Headset } from "lucide-react"
import { Container } from "@/components/shared/container"

const points = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Products",
    description: "Every item is sourced directly from authorized brands and verified partners.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Truck,
    title: "Fast, Tracked Delivery",
    description: "Orders dispatch within 24 hours with end-to-end milestone tracking.",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: RotateCcw,
    title: "Hassle-Free Returns",
    description: "15-day return window with prompt doorstep pickup and full refunds.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: Headset,
    title: "Dedicated Concierge Support",
    description: "Priority support team ready to assist with orders, tracking, and advice.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
]

export function QualityStrip() {
  return (
    <section className="py-12 sm:py-16 border-y border-border/40 bg-card/20 backdrop-blur-xs">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-card/80 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className={`flex size-12 items-center justify-center rounded-xl border ${p.color} transition-transform duration-300 group-hover:scale-110`}>
                <p.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-foreground text-sm font-bold tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
