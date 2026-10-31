import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type CheckoutStep = "address" | "delivery" | "payment" | "review"

const steps: { id: CheckoutStep; label: string }[] = [
  { id: "address", label: "Address" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
]

export function CheckoutSteps({ current }: { current: CheckoutStep }) {
  const currentIndex = steps.findIndex((s) => s.id === current)

  return (
    <ol className="mb-8 flex items-center">
      {steps.map((step, i) => {
        const isDone = i < currentIndex
        const isActive = i === currentIndex
        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isDone && "bg-foreground text-background",
                  isActive && "bg-foreground text-background",
                  !isDone && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:inline",
                  isActive || isDone ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-3 h-px flex-1", isDone ? "bg-foreground" : "bg-border")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
