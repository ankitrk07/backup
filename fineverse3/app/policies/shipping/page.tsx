import Link from "next/link";
import {
  EditText,
  PolicyLayout,
  PolicyList,
  PolicySection,
} from "@/components/pages/policy-layout";
import { siteConfig } from "@/config/site";
import { formatINR, joinList } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { freeShippingMessage, isCodEnabled, paymentMessage } from "@/lib/shipping";

export const metadata = buildMetadata({
  title: "Shipping policy",
  description: "How FINEVERSE orders are dispatched and delivered, with timelines and delivery charges.",
  path: "/policies/shipping",
});

export default function ShippingPolicyPage() {
  const { shipping, payments } = siteConfig;
  const freeMethods = shipping.methods
    .filter((method) => method.freeEligible)
    .map((method) => method.label.toLowerCase());
  const cod = payments.methods.find((method) => method.id === "cod");

  return (
    <PolicyLayout
      title="Shipping policy"
      path="/policies/shipping"
      intro="Here is how and when your order reaches you."
    >
      <PolicySection id="dispatch" title="Dispatch time">
        <p>
          Orders are dispatched within <strong className="text-fg">{shipping.dispatchTime}</strong> of
          being placed. Limited drop items may follow the drop schedule.{" "}
          <EditText>Confirm drop dispatch rules</EditText>
        </p>
      </PolicySection>

      <PolicySection id="methods" title="Delivery methods and charges">
        <PolicyList>
          {shipping.methods.map((method) => (
            <li key={method.id}>
              <strong className="text-fg">{method.label}:</strong> {formatINR(method.fee)}, delivered
              in {method.minDays}–{method.maxDays} days after dispatch.
            </li>
          ))}
        </PolicyList>
        {freeMethods.length > 0 ? (
          <p>
            {freeShippingMessage()} (applies to {joinList(freeMethods)}).
          </p>
        ) : null}
        <p>Final delivery charges are always shown at checkout before you pay.</p>
      </PolicySection>

      <PolicySection id="areas" title="Where we deliver">
        <p>
          <EditText>List the regions, states or countries you deliver to</EditText>
        </p>
        <p>
          Enter your PIN code on any product page to check delivery availability and an estimated
          delivery window.
        </p>
      </PolicySection>

      <PolicySection id="tracking" title="Tracking your order">
        <p>
          Once your order ships you can follow it on the{" "}
          <Link href="/track-order" className="text-accent underline underline-offset-4">
            Track order
          </Link>{" "}
          page using your order number and the email or mobile number you used at checkout.
        </p>
      </PolicySection>

      <PolicySection id="payment" title="Payment and Cash on Delivery">
        <p>We accept {paymentMessage()}.</p>
        {isCodEnabled() && cod ? (
          <p>
            {cod.fee > 0
              ? `Cash on Delivery carries a handling fee of ${formatINR(cod.fee)}.`
              : "Cash on Delivery is available at no extra charge."}{" "}
            Please keep the exact amount ready when your order arrives.
          </p>
        ) : null}
      </PolicySection>

      <PolicySection id="issues" title="Delays, wrong addresses and failed deliveries">
        <p>
          <EditText>
            Explain what happens with delays, incorrect addresses, undelivered parcels and
            re-delivery charges
          </EditText>
        </p>
      </PolicySection>

      <PolicySection id="damage" title="Damaged or missing items">
        <p>
          If your parcel arrives damaged or an item is missing, contact us with your order number and
          photos.{" "}
          <EditText>State the time limit for reporting damage and how it is resolved</EditText>
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}