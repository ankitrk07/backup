import Link from "next/link";
import {
  EditText,
  PolicyLayout,
  PolicyList,
  PolicySection,
} from "@/components/pages/policy-layout";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { isCodEnabled } from "@/lib/shipping";

export const metadata = buildMetadata({
  title: "Returns & exchanges",
  description: "FINEVERSE return and exchange policy: eligibility, timelines and how to start a return.",
  path: "/policies/returns",
});

export default function ReturnsPolicyPage() {
  const { policies, contact } = siteConfig;
  const days = policies.returnWindowDays;

  return (
    <PolicyLayout
      title="Returns & exchanges"
      path="/policies/returns"
      intro={
        policies.exchangesAllowed
          ? `You can return or exchange eligible items within ${days} days of delivery.`
          : `You can return eligible items within ${days} days of delivery.`
      }
    >
      <PolicySection id="window" title="Return window">
        <p>
          The {days}-day window starts on the day your order is delivered.{" "}
          {policies.exchangesAllowed
            ? "Exchanges for a different size or colour are subject to availability, especially for limited drop items."
            : "Exchanges are not available at the moment."}
        </p>
      </PolicySection>

      <PolicySection id="eligibility" title="What is eligible">
        <PolicyList>
          <li>
            Items that are unworn, unwashed and in their original condition, with tags attached.{" "}
            <EditText>Confirm eligibility conditions</EditText>
          </li>
          <li>Items received damaged, defective or different from what you ordered.</li>
        </PolicyList>
      </PolicySection>

      <PolicySection id="exceptions" title="What cannot be returned">
        <p>
          <EditText>
            List non-returnable items, for example accessories such as stickers, final-sale items or
            customised pieces
          </EditText>
        </p>
      </PolicySection>

      <PolicySection id="how" title="How to start a return">
        <ol className="list-decimal space-y-1.5 pl-5 marker:text-accent">
          <li>
            Email{" "}
            <a
              href={`mailto:${contact.supportEmail}`}
              className="text-accent underline underline-offset-4"
            >
              {contact.supportEmail}
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="text-accent underline underline-offset-4">
              contact form
            </Link>{" "}
            with your order number.
          </li>
          <li>
            Tell us the item and the reason, with photos if it arrived damaged.
          </li>
          <li>
            <EditText>Describe pickup or self-ship instructions and the return address</EditText>
          </li>
        </ol>
      </PolicySection>

      <PolicySection id="refunds" title="Refunds">
        <p>
          <EditText>
            State how long refunds take and how they are paid back (original payment method, store
            credit)
          </EditText>
        </p>
        {isCodEnabled() ? (
          <p>
            <strong className="text-fg">Cash on Delivery orders:</strong>{" "}
            <EditText>Explain how refunds work for COD orders, for example bank transfer or UPI</EditText>
          </p>
        ) : null}
      </PolicySection>
    </PolicyLayout>
  );
}