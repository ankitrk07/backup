"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%")

  const active = images[activeIndex] ?? images[0]

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto sm:w-16 sm:flex-col sm:overflow-visible">
          {images.map((image, i) => (
            <button
              key={image + i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                i === activeIndex ? "border-primary" : "border-transparent hover:border-border"
              )}
            >
              <Image src={image} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div
        className="bg-muted relative flex-1 cursor-zoom-in overflow-hidden rounded-xl"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          setZoomOrigin(`${x}% ${y}%`)
        }}
      >
        <div className="aspect-square w-full sm:aspect-[4/5]">
          <Image
            src={active}
            alt={productName}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-200",
              zoomed && "scale-[1.8]"
            )}
            style={zoomed ? { transformOrigin: zoomOrigin } : undefined}
          />
        </div>
      </div>
    </div>
  )
}
