"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { StarRating } from "@/components/shared/star-rating"
import { PriceTag } from "@/components/shared/price-tag"
import { WishlistButton } from "@/components/product/wishlist-button"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { ProductBadges } from "@/components/product/product-badges"
import { QuickViewDialog } from "@/components/product/quick-view-dialog"
import { ProductCard } from "@/components/product/product-card"
import { cn } from "@/lib/utils"
import type { ProductCardData } from "@/types"

export function ProductCarousel({
  title,
  description,
  href,
  products,
  variant = "compact",
  showRank = false,
}: {
  title: string
  description?: string
  href?: string
  products: ProductCardData[]
  variant?: "stacked" | "compact"
  showRank?: boolean
}) {
  if (products.length === 0) return null

  if (variant === "stacked") {
    return (
      <StackedShowcaseSection
        title={title}
        description={description}
        href={href}
        products={products}
      />
    )
  }

  return (
    <CompactCarouselSection
      title={title}
      description={description}
      href={href}
      products={products}
      showRank={showRank}
    />
  )
}

/* =========================================================================
   1. Compact Sleek Horizontal Carousel (For Best Sellers, New Arrivals, etc.)
   ========================================================================= */

function CompactCarouselSection({
  title,
  description,
  href,
  products,
  showRank,
}: {
  title: string
  description?: string
  href?: string
  products: ProductCardData[]
  showRank?: boolean
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  })
  const [canPrev, setCanPrev] = React.useState(false)
  const [canNext, setCanNext] = React.useState(false)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-8 sm:py-10">
      <Container>
        <div className="flex items-end justify-between gap-4 mb-4">
          <SectionHeading title={title} description={description} href={href} className="mb-0" />

          {/* Navigation Controls in Header */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous products"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="border-border/70 bg-background/90 backdrop-blur-md size-8.5 flex items-center justify-center rounded-full border shadow-xs transition-all hover:bg-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="size-4 text-foreground" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="border-border/70 bg-background/90 backdrop-blur-md size-8.5 flex items-center justify-center rounded-full border shadow-xs transition-all hover:bg-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="size-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Subtle edge fade overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 hidden sm:block" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 hidden sm:block" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-3 flex py-1">
              {products.map((product, i) => (
                <div
                  key={product.id}
                  className="min-w-[46%] shrink-0 grow-0 basis-auto pl-3 sm:min-w-[28%] md:min-w-[22%] lg:min-w-[18%] xl:min-w-[15.5%]"
                >
                  <ProductCard product={product} rank={showRank ? i + 1 : undefined} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {href && (
          <div className="mt-4 text-center sm:hidden">
            <a href={href} className="text-brand text-xs font-semibold">
              View all →
            </a>
          </div>
        )}
      </Container>
    </section>
  )
}

/* =========================================================================
   2. Compact 3D Stacked Showcase Carousel (For 1-2 Key Important Sections)
   ========================================================================= */

interface CarouselConfig {
  distanceDivisor: number
  velocityDivisor: number
  sensitivity: number
  xMultiplier: number
  yMultiplier: number
  rotationMultiplier: number
  scaleReduction: number
}

const getStackedConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 170,
      xMultiplier: 65,
      yMultiplier: 10,
      rotationMultiplier: 5,
      scaleReduction: 0.08,
    }
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 210,
      xMultiplier: 110,
      yMultiplier: 16,
      rotationMultiplier: 7,
      scaleReduction: 0.09,
    }
  }
  return {
    distanceDivisor: 190,
    velocityDivisor: 800,
    sensitivity: 240,
    xMultiplier: 150,
    yMultiplier: 20,
    rotationMultiplier: 8,
    scaleReduction: 0.1,
  }
}

function StackedShowcaseSection({
  title,
  description,
  href,
  products,
}: {
  title: string
  description?: string
  href?: string
  products: ProductCardData[]
}) {
  const scrollProgress = useMotionValue(0)
  const startProgress = React.useRef(0)
  const isDraggingRef = React.useRef(false)
  const dragDistanceRef = React.useRef(0)
  const [windowWidth, setWindowWidth] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const total = products.length

  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      const rounded = Math.round(latest) % total
      const normalized = (rounded + total) % total
      setActiveIndex(normalized)
    })
    return () => unsubscribe()
  }, [scrollProgress, total])

  const config = React.useMemo(() => getStackedConfig(windowWidth), [windowWidth])

  const animateTo = React.useCallback(
    (targetVal: number) => {
      animate(scrollProgress, targetVal, {
        type: "spring",
        stiffness: 220,
        damping: 28,
        mass: 0.8,
      })
    },
    [scrollProgress]
  )

  const handlePrev = React.useCallback(() => {
    const current = scrollProgress.get()
    animateTo(Math.round(current) - 1)
  }, [animateTo, scrollProgress])

  const handleNext = React.useCallback(() => {
    const current = scrollProgress.get()
    animateTo(Math.round(current) + 1)
  }, [animateTo, scrollProgress])

  const handleDragStart = () => {
    isDraggingRef.current = true
    dragDistanceRef.current = 0
    startProgress.current = scrollProgress.get()
  }

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    dragDistanceRef.current = Math.abs(info.offset.x)
    const delta = -info.delta.x / config.sensitivity
    scrollProgress.set(scrollProgress.get() + delta)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setTimeout(() => {
      isDraggingRef.current = false
      dragDistanceRef.current = 0
    }, 120)

    const dragDistance = info.offset.x
    const velocity = info.velocity.x

    const distanceShift = -dragDistance / config.distanceDivisor
    const velocityShift = -velocity / config.velocityDivisor

    let totalShift = Math.round(distanceShift + velocityShift)
    totalShift = Math.max(-3, Math.min(3, totalShift))

    const target = Math.round(startProgress.current) + totalShift
    animateTo(target)
  }

  const handleCardClick = (index: number) => {
    if (isDraggingRef.current || dragDistanceRef.current > 6) return
    const current = scrollProgress.get()
    const currentActive = Math.round(current)
    let diff = (index - (((currentActive % total) + total) % total)) % total
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    animateTo(currentActive + diff)
  }

  return (
    <section className="py-8 sm:py-12 overflow-hidden">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <SectionHeading title={title} description={description} href={href} className="mb-0" />

          {/* Desktop/Tablet Header Navigation Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous products"
              onClick={handlePrev}
              className="border-border/70 bg-background/90 backdrop-blur-md size-8.5 flex items-center justify-center rounded-full border shadow-xs transition-all hover:scale-105 hover:bg-muted active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-4 text-foreground" />
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={handleNext}
              className="border-border/70 bg-background/90 backdrop-blur-md size-8.5 flex items-center justify-center rounded-full border shadow-xs transition-all hover:scale-105 hover:bg-muted active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Compact 3D Stacked Carousel Container */}
        <div className="relative flex flex-col items-center justify-center w-full select-none">
          <div className="relative w-full max-w-5xl h-[23rem] sm:h-[25rem] lg:h-[26rem] flex items-center justify-center">
            {/* Side Floating Left/Right Arrows */}
            <button
              type="button"
              aria-label="Previous card"
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 z-[120] size-9 sm:size-10 flex items-center justify-center rounded-full border border-border/80 bg-background/85 backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer pointer-events-auto"
            >
              <ChevronLeft className="size-4.5 text-foreground" />
            </button>

            <button
              type="button"
              aria-label="Next card"
              onClick={handleNext}
              className="absolute right-1 sm:right-4 z-[120] size-9 sm:size-10 flex items-center justify-center rounded-full border border-border/80 bg-background/85 backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-90 cursor-pointer pointer-events-auto"
            >
              <ChevronRight className="size-4.5 text-foreground" />
            </button>

            {/* Compact Stacked Cards */}
            {products.map((product, i) => (
              <CompactStackedCard
                key={product.id}
                product={product}
                index={i}
                total={total}
                progress={scrollProgress}
                config={config}
                isDraggingRef={isDraggingRef}
                dragDistanceRef={dragDistanceRef}
                onCardClick={() => handleCardClick(i)}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4 z-30">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => handleCardClick(i)}
                className={cn(
                  "transition-all duration-300 rounded-full h-1.5 cursor-pointer",
                  activeIndex === i
                    ? "w-6 bg-indigo-600 dark:bg-indigo-400"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>

          {href && (
            <div className="mt-3 text-center sm:hidden">
              <a href={href} className="text-brand text-xs font-semibold">
                View all →
              </a>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

interface CompactStackedCardProps {
  product: ProductCardData
  index: number
  total: number
  progress: MotionValue<number>
  config: CarouselConfig
  isDraggingRef: React.MutableRefObject<boolean>
  dragDistanceRef: React.MutableRefObject<number>
  onCardClick: () => void
  onDragStart: () => void
  onDrag: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}

function CompactStackedCard({
  product,
  index,
  total,
  progress,
  config,
  isDraggingRef,
  dragDistanceRef,
  onCardClick,
  onDragStart,
  onDrag,
  onDragEnd,
}: CompactStackedCardProps) {
  const [quickViewOpen, setQuickViewOpen] = React.useState(false)

  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  })

  const x = useTransform(offset, (o) => o * config.xMultiplier)
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o)
    if (absO < 0.05) return 0
    return o * config.rotationMultiplier
  })
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o)
    if (absO < 0.05) return 0
    return absO * config.yMultiplier
  })
  const scale = useTransform(offset, (o) => 1 - Math.abs(o) * config.scaleReduction)
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0]
  )
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10))

  const shadowDimOpacity = useTransform(
    offset,
    [-2, -0.6, 0, 0.6, 2],
    [0.55, 0.2, 0, 0.2, 0.55]
  )

  const outOfStock = product.stock <= 0

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current || dragDistanceRef.current > 6) {
      e.preventDefault()
      return
    }
    const currentOffset = Math.abs(offset.get())
    if (currentOffset > 0.45) {
      e.preventDefault()
      onCardClick()
    }
  }

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    if (isDraggingRef.current || dragDistanceRef.current > 6) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    e.stopPropagation()
    action()
  }

  return (
    <motion.article
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className={cn(
        "group absolute flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border/80 dark:border-white/[0.08] bg-card dark:bg-[#151622] shadow-lg dark:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.6)] transition-shadow duration-300 cursor-grab active:cursor-grabbing",
        "w-[13.5rem] sm:w-[15rem] lg:w-[16.5rem] h-[21rem] sm:h-[22.5rem] lg:h-[23.5rem]"
      )}
    >
      {/* Dimming scrim on stacked side cards */}
      <motion.div
        style={{
          opacity: shadowDimOpacity,
          pointerEvents: useTransform(offset, (o) => (Math.abs(o) > 0.4 ? "auto" : "none")),
        }}
        onClick={onCardClick}
        className="absolute inset-0 bg-black/60 z-30 transition-opacity cursor-pointer"
      />

      {/* Top Floating Controls */}
      <div className="absolute top-2 left-2 right-2 z-35 flex items-center justify-between pointer-events-none">
        <ProductBadges
          badges={product.badges}
          className="pointer-events-auto transition-transform duration-200 group-hover:scale-105"
        />
        <div
          className="pointer-events-auto"
          onClick={(e) => {
            if (isDraggingRef.current || dragDistanceRef.current > 6) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          <WishlistButton
            product={product}
            className="size-7 border border-border/60 bg-background/85 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-110"
            size="sm"
          />
        </div>
      </div>

      <Link
        href={`/product/${product.slug}`}
        onClick={handleLinkClick}
        className="flex flex-1 flex-col z-25"
      >
        {/* Compact Product Shot */}
        <div className="relative aspect-[4/3.5] overflow-hidden bg-neutral-100 dark:bg-neutral-900/50">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 280px"
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
              product.hoverImage && "group-hover:opacity-0"
            )}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 280px"
              className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
            />
          )}

          {outOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-xs">
              <span className="bg-foreground text-background rounded-md px-2 py-0.5 text-[10px] font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => handleActionClick(e, () => setQuickViewOpen(true))}
            className="bg-background/95 text-foreground border border-border/70 backdrop-blur-md absolute bottom-2 left-1/2 z-25 flex -translate-x-1/2 translate-y-2 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold opacity-0 shadow-sm transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 active:scale-95 max-sm:hidden cursor-pointer pointer-events-auto"
          >
            <Eye className="size-3 text-indigo-500" /> Quick View
          </button>
        </div>

        {/* Compact Details */}
        <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3">
          <div>
            {product.brand && (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75 truncate group-hover:text-indigo-500 transition-colors">
                {product.brand}
              </span>
            )}
            <h3 className="mt-0.5 line-clamp-1 text-xs sm:text-[13px] font-semibold leading-snug text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {product.name}
            </h3>
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="xs" />
            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
        </div>
      </Link>

      {/* Add To Cart Button */}
      <div
        className="mt-auto px-2.5 pb-2.5 sm:px-3 sm:pb-3 z-35 relative pointer-events-auto"
        onClick={(e) => {
          if (isDraggingRef.current || dragDistanceRef.current > 6) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        <AddToCartButton
          className="w-full h-8 text-xs font-medium shadow-xs"
          size="sm"
          variant="outline"
          cartLine={{
            productId: product.id,
            variantId: product.defaultVariantId ?? "",
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            stock: product.stock,
          }}
        />
      </div>

      <QuickViewDialog product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </motion.article>
  )
}
