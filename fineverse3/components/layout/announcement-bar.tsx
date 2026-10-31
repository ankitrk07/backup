import { freeShippingMessage, paymentMessage } from "@/lib/shipping";

/**
 * The only place the shipping offer appears besides the cart, so the home page
 * never repeats it. Both messages come from config.
 */
export function AnnouncementBar() {
  return (
    <div className="flex h-announce items-center justify-center bg-accent px-4 text-center font-display text-xs uppercase tracking-wider text-accent-fg sm:text-sm">
      <p className="truncate">
        {freeShippingMessage()} <span aria-hidden="true">·</span> {paymentMessage()} accepted
      </p>
    </div>
  );
}