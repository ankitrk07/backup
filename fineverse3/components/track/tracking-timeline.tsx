import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OrderStatus, TrackingResult } from "@/types/order";

const STEPS: ReadonlyArray<{ status: OrderStatus; label: string }> = [
  { status: "placed", label: "Order placed" },
  { status: "packed", label: "Packed" },
  { status: "shipped", label: "Shipped" },
  { status: "out-for-delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

export function TrackingTimeline({ result }: { result: TrackingResult }) {
  const currentIndex = STEPS.findIndex((step) => step.status === result.status);
  const currentLabel = STEPS[currentIndex]?.label ?? result.status;

  return (
    <section aria-labelledby="tracking-heading" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="tracking-heading" className="font-display text-2xl uppercase tracking-wide text-fg">
            Order {result.orderId}
          </h2>
          <p className="mt-1 text-muted">
            Status: <strong className="text-accent">{currentLabel}</strong>
          </p>
        </div>
        {result.isMock ? <Badge variant="warning">Sample result</Badge> : null}
      </div>

      {result.estimatedDelivery ? (
        <p className="mt-3 text-sm text-muted">
          Estimated delivery: <strong className="text-fg">{formatDate(result.estimatedDelivery)}</strong>
        </p>
      ) : null}

      <ol className="mt-6">
        {STEPS.map((step, index) => {
          const event = result.events.find((item) => item.status === step.status);
          const done = currentIndex >= 0 && index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === STEPS.length - 1;

          return (
            <li
              key={step.status}
              aria-current={isCurrent ? "step" : undefined}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[1.0625rem] top-9 h-[calc(100%-2.25rem)] w-0.5",
                    done && index < currentIndex ? "bg-accent" : "bg-line",
                  )}
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2",
                  done ? "border-accent bg-accent text-accent-fg" : "border-line bg-bg text-subtle",
                )}
              >
                {done ? <Check className="size-5" strokeWidth={3} /> : <span className="size-2 rounded-full bg-line" />}
              </span>
              <div className="pt-1">
                <p className={cn("font-semibold", done ? "text-fg" : "text-subtle")}>
                  {step.label}
                  <span className="sr-only">{done ? " (completed)" : " (pending)"}</span>
                </p>
                {event ? <p className="text-sm text-muted">{formatDateTime(event.timestamp)}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      {result.isMock ? (
        <p className="mt-6 text-sm text-subtle">
          This is a sample timeline for demonstration. Real tracking appears once an order system is
          connected.
        </p>
      ) : null}
    </section>
  );
}