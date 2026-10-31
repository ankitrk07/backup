"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Mail, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"

export function NewsletterBand() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("You're subscribed!", { description: "Look out for a welcome email with 10% off." })
    setEmail("")
  }

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 via-card to-card px-6 py-14 text-center sm:px-16 sm:py-20 shadow-xl">
          <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />

          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-inner">
            <Mail className="size-6" />
          </div>

          <div className="mt-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
              <Sparkles className="size-3 text-amber-400" />
              Exclusive Access
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Unlock 10% Off Your First Order
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm text-muted-foreground sm:text-base">
              Join our members club for private early drops, seasonal clearances, and insider product guides.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              aria-label="Email address"
              className="h-12 rounded-xl bg-background/80 border-border/80 px-4 text-sm backdrop-blur-sm focus-visible:ring-indigo-500"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-xl px-7 font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}
