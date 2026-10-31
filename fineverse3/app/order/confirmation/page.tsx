import { ConfirmationView } from "@/components/checkout/confirmation-view";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order confirmation",
  path: "/order/confirmation",
  noIndex: true,
});

export default function OrderConfirmationPage() {
  return (
    <div className="container pb-16 pt-10">
      <ConfirmationView />
    </div>
  );
}