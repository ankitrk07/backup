import type { ReactNode } from "react";
import { TotalsRows } from "@/components/cart/totals-rows";
import { SlotImage } from "@/components/media/slot-image";
import { getCartLineImage } from "@/lib/cart-image";
import { formatINR } from "@/lib/format";
import { sizeLabel } from "@/lib/labels";
import type { CartLine } from "@/types/cart";
import type { OrderTotals } from "@/types/order";

interface CheckoutOrderSummaryProps {
  lines: CartLine[];
  totals: OrderTotals;
  /** the terms checkbox and the submit button */
  children: ReactNode;
}

export function CheckoutOrderSummary({ lines, totals, children }: CheckoutOrderSummaryProps) {
  return (
    <aside
      aria-labelledby="checkout-summary-heading"
      className="rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]"
    >
      <h2
        id="checkout-summary-heading"
        className="font-display text-2xl uppercase tracking-wide text-fg"
      >
        Order summary
      </h2>

      <ul className="mt-4 divide-y divide-line">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-3 py-3 first:pt-0">
            <SlotImage
              slot={getCartLineImage(line)}
              decorative
              sizes="64px"
              className="w-16 shrink-0 rounded border border-line"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-snug text-fg">{line.name}</p>
              <p className="text-sm text-muted">
                {line.colorName} · {sizeLabel(line.size)} · Qty {line.quantity}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-fg tabular">
              {formatINR(line.price * line.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <TotalsRows
        className="mt-4 border-t border-line pt-4"
        subtotal={totals.subtotal}
        savings={totals.savings}
        shipping={totals.shipping}
        paymentFee={totals.paymentFee}
        total={totals.total}
      />

      <div className="mt-5 space-y-4">{children}</div>
    </aside>
  );
}