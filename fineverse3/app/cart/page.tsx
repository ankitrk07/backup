import { CartView } from "@/components/cart/cart-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Your cart",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return (
    <div className="container pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">Your cart</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}