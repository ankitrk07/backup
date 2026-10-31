import Link from "next/link";
import { AuthTabs } from "@/components/forms/auth-forms";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getAccountOrders } from "@/lib/data";
import { formatDate, formatINR } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My account",
  path: "/account",
  noIndex: true,
});

export default async function AccountPage() {
  const orders = await getAccountOrders();

  return (
    <div className="container pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-display-lg uppercase text-fg">My account</h1>
        <Badge variant="warning">Preview</Badge>
      </div>
      <p className="mt-2 max-w-xl text-muted">
        Sign in to see your orders and saved details. Accounts are coming soon.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="auth-heading" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 id="auth-heading" className="sr-only">
            Sign in or create an account
          </h2>
          <AuthTabs />
        </section>

        <section aria-labelledby="orders-heading" className="rounded-xl border border-line bg-surface p-5 sm:p-6">
          <h2 id="orders-heading" className="font-display text-2xl uppercase tracking-wide text-fg">
            Your orders
          </h2>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-line px-5 py-10 text-center">
              <p className="text-lg text-fg">No orders to show yet</p>
              <p className="mt-1 text-muted">
                Once accounts are live, your past orders will appear here.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/track-order" variant="outline">
                  Track an order
                </ButtonLink>
                <ButtonLink href="/shop">Start shopping</ButtonLink>
              </div>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {orders.map((order) => (
                <li key={order.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <Link
                      href={`/track-order?order=${encodeURIComponent(order.id)}`}
                      className="font-semibold text-fg hover:text-accent"
                    >
                      {order.id}
                    </Link>
                    <p className="text-sm text-muted">
                      {formatDate(order.placedAt)} · {order.itemCount} items
                    </p>
                  </div>
                  <p className="font-semibold text-fg tabular">{formatINR(order.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}