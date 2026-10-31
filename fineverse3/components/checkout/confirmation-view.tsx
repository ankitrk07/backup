"use client";

import { CircleCheck } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { TotalsRows } from "@/components/cart/totals-rows";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatDateTime, formatINR } from "@/lib/format";
import { sizeLabel } from "@/lib/labels";
import { parseOrder, readLastOrderSnapshot } from "@/lib/order-session";
import { getShippingMethod } from "@/lib/shipping";
import type { SizeId } from "@/types/product";

const subscribe = () => () => {};

export function ConfirmationView() {
  const hydrated = useHydrated();
  const raw = useSyncExternalStore(subscribe, readLastOrderSnapshot, () => null);
  const order = useMemo(() => parseOrder(raw), [raw]);

  if (!hydrated) {
    return (
      <div role="status" aria-busy="true" className="mx-auto max-w-3xl">
        <span className="sr-only">Loading your order</span>
        <Skeleton aria-hidden="true" className="h-14 w-2/3" />
        <Skeleton aria-hidden="true" className="mt-6 h-64 w-full" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="font-display text-display-md uppercase text-fg">No recent order found</h1>
        <p className="mt-3 text-muted">
          We could not find an order in this browser session. If you just placed one, check your
          email for the confirmation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/track-order" size="lg">
            Track an order
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline" size="lg">
            Continue shopping
          </ButtonLink>
        </div>
      </div>
    );
  }

  const shipping = getShippingMethod(order.shippingMethod);
  const payment = siteConfig.payments.methods.find((method) => method.id === order.paymentMethod);
  const isCod = order.paymentMethod === "cod";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-accent-fg">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-display-lg uppercase text-fg">Order placed</h1>
        <p className="mt-3 text-lg text-muted">
          Thank you, {order.fullName}. A confirmation will be sent to{" "}
          <strong className="text-fg">{order.email}</strong>.
        </p>
        {siteConfig.dataMode === "mock" ? (
          <Badge variant="warning" className="mt-4">
            Demo order: no payment taken
          </Badge>
        ) : null}
      </div>

      <dl className="mt-10 grid gap-4 rounded-xl border border-line bg-surface p-5 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-subtle">Order number</dt>
          <dd className="mt-1 font-display text-2xl tracking-wide text-accent">{order.id}</dd>
        </div>
        <div>
          <dt className="text-sm text-subtle">Placed on</dt>
          <dd className="mt-1 text-fg">{formatDateTime(order.placedAt)}</dd>
        </div>
        <div>
          <dt className="text-sm text-subtle">Delivery</dt>
          <dd className="mt-1 text-fg">
            {shipping.label}: {shipping.minDays}–{shipping.maxDays} days after dispatch (dispatch in{" "}
            {siteConfig.shipping.dispatchTime})
          </dd>
        </div>
        <div>
          <dt className="text-sm text-subtle">Payment</dt>
          <dd className="mt-1 text-fg">
            {payment?.label ?? order.paymentMethod}
            {isCod ? `: pay ${formatINR(order.totals.total)} in cash on delivery.` : ""}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-subtle">Shipping to</dt>
          <dd className="mt-1 text-fg">
            <address className="not-italic">
              {order.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </dd>
        </div>
      </dl>

      <section aria-labelledby="confirmation-items" className="mt-8">
        <h2 id="confirmation-items" className="font-display text-2xl uppercase tracking-wide text-fg">
          Items
        </h2>
        <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface px-5">
          {order.lines.map((line) => (
            <li
              key={`${line.slug}-${line.colorId}-${line.size}`}
              className="flex items-start justify-between gap-4 py-4"
            >
              <div>
                <p className="font-semibold text-fg">{line.name}</p>
                <p className="text-sm text-muted">
                  {line.colorName} · {sizeLabel(line.size as SizeId)} · Qty {line.quantity}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-fg tabular">
                {formatINR(line.unitPrice * line.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl border border-line bg-surface p-5">
          <TotalsRows
            subtotal={order.totals.subtotal}
            savings={order.totals.savings}
            shipping={order.totals.shipping}
            paymentFee={order.totals.paymentFee}
            total={order.totals.total}
          />
        </div>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={`/track-order?order=${encodeURIComponent(order.id)}`} size="lg">
          Track this order
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" size="lg">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  );
}