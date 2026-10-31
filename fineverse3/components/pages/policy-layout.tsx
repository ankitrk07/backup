import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd } from "@/lib/seo";

/**
 * [EDIT] Set to false once every [EDIT] placeholder is replaced and a
 * legal professional has reviewed the policy text.
 */
const SHOW_TEMPLATE_NOTICE = true;

/** Highlights a placeholder so it is impossible to miss before launch. */
export function EditText({ children }: { children: ReactNode }) {
  return <span className="rounded-sm bg-warning/15 px-1 text-warning">[EDIT] {children}</span>;
}

export function PolicyList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">{children}</ul>;
}

interface PolicySectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function PolicySection({ id, title, children }: PolicySectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-24">
      <h2 id={headingId} className="font-display text-2xl uppercase tracking-wide text-fg">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-7 text-muted">{children}</div>
    </section>
  );
}

interface PolicyLayoutProps {
  title: string;
  /** path starting with "/", used for the breadcrumb data */
  path: string;
  intro?: ReactNode;
  children: ReactNode;
}

export function PolicyLayout({ title, path, intro, children }: PolicyLayoutProps) {
  return (
    <div className="container max-w-3xl pb-16 pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: title, path },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">{title}</h1>
      <p className="mt-2 text-sm text-subtle">
        Last updated: <EditText>add date</EditText>
      </p>
      {intro ? <p className="mt-4 text-lg leading-7 text-muted">{intro}</p> : null}

      {SHOW_TEMPLATE_NOTICE ? (
        <p
          role="note"
          className="mt-6 rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm text-warning"
        >
          Template: this page contains placeholder text marked [EDIT]. Replace it with your real
          policy and have it reviewed by a legal professional before launch.
        </p>
      ) : null}

      <div className="mt-10 space-y-10">{children}</div>

      <p className="mt-12 border-t border-line pt-6 text-muted">
        Questions about this page? Email{" "}
        <a
          href={`mailto:${siteConfig.contact.supportEmail}`}
          className="text-accent underline underline-offset-4"
        >
          {siteConfig.contact.supportEmail}
        </a>{" "}
        or use our{" "}
        <Link href="/contact" className="text-accent underline underline-offset-4">
          contact form
        </Link>
        .
      </p>
    </div>
  );
}