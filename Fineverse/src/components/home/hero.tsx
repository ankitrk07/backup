"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react"
import { ArrowRight, ShieldCheck, Sparkles, Truck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BorderBeam } from "@/components/ui/border-beam"
import { Container } from "@/components/shared/container"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-14 sm:py-20 lg:py-24">
      {/* SVG Filters for Glass, Glow & Gradients */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>

          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="hero-title-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dynamic Background Shader Mesh */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-85"
          colors={["#030712", "#0f172a", "#312e81", "#0891b2", "#ea580c"]}
          speed={0.25}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-30"
          colors={["#000000", "#ffffff", "#6366f1", "#06b6d4"]}
          speed={0.15}
        />
        {/* Soft radial vignette for clear readability */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Heading, Badges, CTAs, Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-6 xl:col-span-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/95 backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
            <span>Curated Catalog · 2026 Collection</span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl/tight text-white drop-shadow-md">
            Elevate your world with{" "}
            <motion.span
              className="inline-block bg-gradient-to-r from-indigo-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent font-black"
              style={{
                filter: "url(#text-glow)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              pure perfection.
            </motion.span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg font-light">
            Immerse yourself in handpicked flagship electronics, timeless designer fashion, and
            inspirational toys. Built for those who settle for nothing less than extraordinary.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden h-12 px-8 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-xl transition-all hover:scale-[1.02] active:scale-95"
            >
              <Link href="/products" className="flex items-center gap-2">
                Explore Catalog <ArrowRight className="size-4" />
                <BorderBeam size={80} duration={4} colorFrom="#06b6d4" colorTo="#f97316" borderWidth={2} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/20 bg-white/5 px-7 text-base text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/40"
            >
              <Link href="/products?discount=true">Flash Deals</Link>
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/15 pt-6">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-amber-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-white">Top Flagships</p>
                <p className="text-white/60">Original Brands</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-white">Fast Delivery</p>
                <p className="text-white/60">2-3 Business Days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-white">100% Verified</p>
                <p className="text-white/60">Warranty Assured</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual Showcase Collage + Interactive Pulsing Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative lg:col-span-6 xl:col-span-6"
        >
          <div className="relative mx-auto grid max-w-lg grid-cols-2 gap-3.5 sm:max-w-xl">
            {/* Main Featured Showcase: Premium Electronics */}
            <Link
              href="/electronics"
              className="group relative col-span-2 aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-card/40 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-cyan-400/50"
            >
              <Image
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
                alt="Sony Studio Headphones and Premium Audio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="inline-block rounded-md bg-cyan-500/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">
                    Electronics
                  </span>
                  <p className="mt-1 text-base font-bold text-white sm:text-lg">
                    Next-Gen Acoustics & Computing
                  </p>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  From ₹899
                </span>
              </div>
            </Link>

            {/* Fashion Showcase */}
            <Link
              href="/fashion"
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-card/40 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-indigo-400/50"
            >
              <Image
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop"
                alt="Curated Fashion and Designer Apparel"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                  Fashion
                </span>
                <p className="text-sm font-bold text-white">Curated Style</p>
              </div>
            </Link>

            {/* Toys & Collectibles Showcase */}
            <Link
              href="/toys"
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/15 bg-card/40 backdrop-blur-md shadow-lg transition-all duration-500 hover:border-amber-400/50"
            >
              <Image
                src="https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop"
                alt="Lego Building Blocks & Toys"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Toys & Games
                </span>
                <p className="text-sm font-bold text-white">Endless Imagination</p>
              </div>
            </Link>
          </div>

          {/* Interactive Floating Pulsing Border Badge */}
          <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:-right-6 z-20 pointer-events-none hidden sm:block">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <PulsingBorder
                colors={["#06b6d4", "#4f46e5", "#f97316", "#00FF88", "#ffffff"]}
                colorBack="#00000000"
                speed={1.4}
                roundness={1}
                thickness={0.12}
                softness={0.25}
                intensity={1}
                spots={3}
                spotSize={0.12}
                pulse={0.1}
                smoke={0.4}
                smokeSize={3}
                scale={0.7}
                rotation={0}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              />

              {/* Rotating SVG circular text around the pulsing shader */}
              <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 22,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{ transform: "scale(1.4)" }}
              >
                <defs>
                  <path id="hero-badge-circle" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text className="text-[9px] fill-white/85 font-bold tracking-widest uppercase">
                  <textPath href="#hero-badge-circle" startOffset="0%">
                    Fineverse • Curated Perfection • 2026 Collection •
                  </textPath>
                </text>
              </motion.svg>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
