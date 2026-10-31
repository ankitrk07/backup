"use client"

import { useState } from "react"
import { Truck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, formatDate, formatPrice } from "@/lib/utils"
import { EXPRESS_DELIVERY_FEE, type DeliveryMethod } from "@/lib/pricing"

export function DeliveryStep({
  value,
  onChange,
  onContinue,
  onBack,
}: {
  value: DeliveryMethod
  onChange: (method: DeliveryMethod) => void
  onContinue: () => void
  onBack: () => void
}) {
  // Date.now() is impure — a useState lazy initializer runs exactly once
  // per mount, which is the pattern React's purity rule expects here.
  const [standardDate] = useState(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
  const [expressDate] = useState(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))

  return (
    <div>
      <h2 className="text-foreground text-lg font-semibold">Delivery Method</h2>

      <div className="mt-4 flex flex-col gap-3">
        <DeliveryOption
          icon={Truck}
          title="Standard Delivery"
          description={`Estimated delivery by ${formatDate(standardDate)}`}
          price="Included"
          selected={value === "standard"}
          onSelect={() => onChange("standard")}
        />
        <DeliveryOption
          icon={Zap}
          title="Express Delivery"
          description={`Estimated delivery by ${formatDate(expressDate)}`}
          price={`+${formatPrice(EXPRESS_DELIVERY_FEE)}`}
          selected={value === "express"}
          onSelect={() => onChange("express")}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onContinue}>
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}

function DeliveryOption({
  icon: Icon,
  title,
  description,
  price,
  selected,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  price: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors",
        selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-foreground text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
      <span className="text-foreground shrink-0 text-sm font-semibold">{price}</span>
    </button>
  )
}
