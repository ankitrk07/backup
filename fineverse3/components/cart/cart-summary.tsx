import { ButtonLink } from "@/components/ui/button";
import { paymentMessage } from "@/lib/shipping";
import { TotalsRows } from "./totals-rows";

interface CartSummaryProps {
  subtotal: number;
  savings: number;
}

export function CartSummary({ subtotal, savings }: CartSummaryProps) {
  return (
    <aside
      aria-labelledby="cart-summary-heading"
      className="rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]"
    >
      <h2
        id="cart-summary-heading"
        className="font-display text-2xl uppercase tracking-wide text-fg"
      >
        Order summary
      </h2>
      <TotalsRows className="mt-4" subtotal={subtotal} savings={savings} />
      <p className="mt-3 text-sm text-subtle">Delivery and any payment fees are added at checkout.</p>

      <ButtonLink href="/checkout" size="lg" fullWidth className="mt-5">
        Checkout
      </ButtonLink>
      <ButtonLink href="/shop" variant="outline" fullWidth className="mt-3">
        Continue shopping
      </ButtonLink>

      <p className="mt-4 text-center text-sm text-subtle">We accept {paymentMessage()}.</p>
    </aside>
  );
}