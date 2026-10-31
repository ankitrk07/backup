"use client"

import { AlertCircle, Banknote, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/generated/prisma/client"

const stripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

export function PaymentStep({
  value,
  onChange,
  onContinue,
  onBack,
}: {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div>
      <h2 className="text-foreground text-lg font-semibold">Payment Method</h2>

      {!stripeConfigured && (
        <div className="bg-secondary mt-4 flex items-start gap-2.5 rounded-lg p-3 text-sm">
          <AlertCircle className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <p className="text-muted-foreground">
            Card and UPI payments require a payment gateway to be configured for this store. Cash on Delivery is
            available now.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        <PaymentOption
          icon={CreditCard}
          title="Credit / Debit Card"
          description="Visa, Mastercard, RuPay & more"
          disabled={!stripeConfigured}
          selected={value === "CARD"}
          onSelect={() => onChange("CARD")}
        />
        <PaymentOption
          icon={Smartphone}
          title="UPI"
          description="Pay via any UPI app"
          disabled={!stripeConfigured}
          selected={value === "UPI"}
          onSelect={() => onChange("UPI")}
        />
        <PaymentOption
          icon={Banknote}
          title="Cash on Delivery"
          description="Pay when your order arrives"
          selected={value === "COD"}
          onSelect={() => onChange("COD")}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onContinue}>
          Review Order
        </Button>
      </div>
    </div>
  )
}

function PaymentOption({
  icon: Icon,
  title,
  description,
  disabled,
  selected,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  disabled?: boolean
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        selected ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-foreground text-sm font-medium">
          {title}
          {disabled && <span className="text-muted-foreground ml-1.5 text-xs font-normal">(unavailable)</span>}
        </p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </button>
  )
}
