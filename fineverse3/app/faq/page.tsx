import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { getFaqs } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { FaqCategory, FaqItem } from "@/types/content";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Answers about orders, shipping, returns, payments and products at FINEVERSE.",
  path: "/faq",
});

const CATEGORY_ORDER: ReadonlyArray<{ id: FaqCategory; label: string }> = [
  { id: "orders", label: "Orders" },
  { id: "shipping", label: "Shipping" },
  { id: "returns", label: "Returns" },
  { id: "payments", label: "Payments" },
  { id: "products", label: "Products" },
];

/** Answers that still contain an [EDIT] placeholder are never published as structured data. */
function faqJsonLd(items: readonly FaqItem[]): Record<string, unknown> | null {
  const usable = items.filter((item) => !item.answer.includes("[EDIT]"));
  if (usable.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: usable.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export default async function FaqPage() {
  const faqs = await getFaqs();
  const structuredData = faqJsonLd(faqs);

  const groups = CATEGORY_ORDER.map((category) => ({
    ...category,
    items: faqs.filter((item) => item.category === category.id),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="container max-w-3xl pb-16 pt-6">
      {structuredData ? <JsonLd data={structuredData} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">
        Frequently asked questions
      </h1>
      <p className="mt-2 text-muted">Quick answers about orders, delivery, returns and more.</p>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`faq-${group.id}`}>
            <h2
              id={`faq-${group.id}`}
              className="mb-4 font-display text-2xl uppercase tracking-wide text-accent"
            >
              {group.label}
            </h2>
            <Accordion
              type="single"
              headingLevel={3}
              items={group.items.map((item) => ({
                id: item.id,
                title: item.question,
                content: item.answer,
              }))}
            />
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-line bg-surface p-6 text-center">
        <h2 className="font-display text-2xl uppercase tracking-wide text-fg">Still need help?</h2>
        <p className="mt-2 text-muted">Our team is happy to help with anything not covered here.</p>
        <ButtonLink href="/contact" className="mt-5">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}