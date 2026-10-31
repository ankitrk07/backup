import Link from "next/link";
import {
  EditText,
  PolicyLayout,
  PolicyList,
  PolicySection,
} from "@/components/pages/policy-layout";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { paymentMessage } from "@/lib/shipping";

export const metadata = buildMetadata({
  title: "Terms of service",
  description: "The terms that apply when you browse and buy from the FINEVERSE store.",
  path: "/policies/terms",
});

export default function TermsPage() {
  const { name, legal } = siteConfig;

  return (
    <PolicyLayout
      title="Terms of service"
      path="/policies/terms"
      intro={`By using this website and placing an order you agree to these terms with ${legal.businessName}.`}
    >
      <PolicySection id="using" title="Using the site">
        <p>
          You agree to use the site lawfully and to give accurate information when you order.{" "}
          <EditText>Add acceptable-use rules and age requirements</EditText>
        </p>
      </PolicySection>

      <PolicySection id="orders" title="Orders and pricing">
        <PolicyList>
          <li>All prices are shown in Indian rupees (INR).</li>
          <li>
            Placing an order is an offer to buy. We confirm it when we accept it.{" "}
            <EditText>State your order acceptance and cancellation rules</EditText>
          </li>
          <li>
            If a product is listed at the wrong price or is out of stock, we may cancel the order and
            refund any payment. <EditText>Confirm</EditText>
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection id="drops" title="Limited drops">
        <p>
          Drops are limited, numbered releases. They are available during the drop window shown on
          the site and only while stock lasts. Drop timers and remaining stock are shown for
          convenience and may change as orders are placed.
        </p>
      </PolicySection>

      <PolicySection id="payment" title="Payment">
        <p>
          We accept {paymentMessage()}. Payment methods may change over time and are always shown at
          checkout.
        </p>
      </PolicySection>

      <PolicySection id="delivery-returns" title="Delivery and returns">
        <p>
          Delivery is covered by our{" "}
          <Link href="/policies/shipping" className="text-accent underline underline-offset-4">
            Shipping policy
          </Link>{" "}
          and returns by our{" "}
          <Link href="/policies/returns" className="text-accent underline underline-offset-4">
            Returns &amp; exchanges
          </Link>{" "}
          page.
        </p>
      </PolicySection>

      <PolicySection id="ip" title="Intellectual property">
        <p>
          The designs, graphics, text and logos on this site belong to {name} or its licensors.{" "}
          <EditText>Confirm ownership wording and what visitors may and may not do</EditText>
        </p>
      </PolicySection>

      <PolicySection id="liability" title="Limitation of liability">
        <p>
          <EditText>Add your limitation of liability and disclaimer text</EditText>
        </p>
      </PolicySection>

      <PolicySection id="law" title="Governing law">
        <p>
          <EditText>State the governing law and the courts that have jurisdiction</EditText>
        </p>
      </PolicySection>

      <PolicySection id="changes" title="Changes to these terms">
        <p>
          <EditText>Explain how and when terms may change</EditText>
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}