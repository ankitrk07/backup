import { CheckoutView } from "@/components/checkout/checkout-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <div className="container pb-16 pt-6">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">Checkout</h1>
      <div className="mt-8">
        <CheckoutView />
      </div>
    </div>
  );
}