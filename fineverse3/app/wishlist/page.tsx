import { WishlistView } from "@/components/wishlist/wishlist-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wishlist",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistPage() {
  return (
    <div className="container pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">Wishlist</h1>
      <p className="mt-2 max-w-xl text-muted">
        Saved on this device. Sign-in sync arrives with accounts.
      </p>
      <div className="mt-8">
        <WishlistView />
      </div>
    </div>
  );
}