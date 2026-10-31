import Link from "next/link";
import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { freeShippingMessage, paymentMessage } from "@/lib/shipping";

/** Every line is generated from config, so it always matches the policy pages. */
export function DeliveryReturnsInfo() {
  const { shipping, policies } = siteConfig;

  return (
    <ul className="space-y-2.5">
      <li>Orders are dispatched in {shipping.dispatchTime}.</li>
      {shipping.methods.map((method) => (
        <li key={method.id}>
          {method.label}: {method.minDays}–{method.maxDays} days, {formatINR(method.fee)}.
        </li>
      ))}
      <li>{freeShippingMessage()}.</li>
      <li>
        Returns{policies.exchangesAllowed ? " and exchanges" : ""} are accepted within{" "}
        {policies.returnWindowDays} days of delivery for eligible items.{" "}
        <Link href="/policies/returns" className="text-accent underline underline-offset-4">
          Read the policy
        </Link>
      </li>
      <li>We accept {paymentMessage()}.</li>
    </ul>
  );
}