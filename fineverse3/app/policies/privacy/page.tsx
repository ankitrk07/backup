import {
  EditText,
  PolicyLayout,
  PolicyList,
  PolicySection,
} from "@/components/pages/policy-layout";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy policy",
  description: "How FINEVERSE collects, uses and protects your personal information.",
  path: "/policies/privacy",
});

export default function PrivacyPolicyPage() {
  const { legal, contact } = siteConfig;

  return (
    <PolicyLayout
      title="Privacy policy"
      path="/policies/privacy"
      intro="This page explains what information we collect, why, and the choices you have."
    >
      <PolicySection id="who" title="Who we are">
        <p>
          {siteConfig.name} is operated by {legal.businessName}, {legal.registeredAddress}.
        </p>
      </PolicySection>

      <PolicySection id="collect" title="Information we collect">
        <PolicyList>
          <li>
            <strong className="text-fg">Order details:</strong> your name, email, mobile number,
            delivery address and the items you order.
          </li>
          <li>
            <strong className="text-fg">Whitelist and newsletter:</strong> your email address when
            you join the whitelist.
          </li>
          <li>
            <strong className="text-fg">Messages:</strong> the details you share when you contact
            us.
          </li>
          <li>
            <strong className="text-fg">On your device:</strong> your cart and wishlist are saved in
            your browser&rsquo;s storage so they are still there when you return.
          </li>
          <li>
            <EditText>List analytics, cookies and any other tools you use</EditText>
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection id="use" title="How we use it">
        <PolicyList>
          <li>To process, deliver and support your orders.</li>
          <li>To send drop announcements and early access to people on the whitelist.</li>
          <li>To reply to your questions.</li>
          <li>
            <EditText>Add any other purposes, such as fraud prevention or improving the site</EditText>
          </li>
        </PolicyList>
      </PolicySection>

      <PolicySection id="sharing" title="Who we share it with">
        <p>
          <EditText>
            Name your payment provider, courier partners, email provider and any other processors
          </EditText>
        </p>
        <p>We do not sell your personal information.</p>
      </PolicySection>

      <PolicySection id="retention" title="How long we keep it">
        <p>
          <EditText>State your retention periods</EditText>
        </p>
      </PolicySection>

      <PolicySection id="rights" title="Your choices and rights">
        <p>
          You can unsubscribe from emails at any time and ask us to access, correct or delete your
          information.{" "}
          <EditText>
            Add the rights that apply to you under the law that governs your business
          </EditText>
        </p>
        <p>
          To make a request, email{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="text-accent underline underline-offset-4"
          >
            {contact.supportEmail}
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection id="changes" title="Changes to this policy">
        <p>
          <EditText>Explain how you will notify people about changes</EditText>
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}