import { TrackOrderForm } from "@/components/forms/track-order-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Track your order",
  description: "Check the status of your FINEVERSE order with your order number.",
  path: "/track-order",
});

interface TrackOrderPageProps {
  searchParams: Promise<{ order?: string | string[] }>;
}

export default async function TrackOrderPage({ searchParams }: TrackOrderPageProps) {
  const { order } = await searchParams;
  const defaultOrderId = (Array.isArray(order) ? order[0] : order)?.slice(0, 40) ?? "";

  return (
    <div className="container max-w-3xl pb-16 pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Track order" }]} />
      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">Track your order</h1>
      <p className="mt-2 text-muted">
        Enter your order number and the email or mobile number you used at checkout.
      </p>
      <div className="mt-8">
        <TrackOrderForm defaultOrderId={defaultOrderId} />
      </div>
    </div>
  );
}