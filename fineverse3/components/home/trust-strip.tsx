import { MessageCircle, PackageCheck, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { paymentMessage } from "@/lib/shipping";

interface TrustItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

/**
 * Every line is generated from config, so it can never contradict the policy pages.
 * Free shipping is deliberately NOT repeated here (it lives in the announcement bar).
 */
function getTrustItems(): TrustItem[] {
  const { policies, shipping } = siteConfig;
  return [
    {
      icon: ShieldCheck,
      title: "Secure checkout",
      text: `Pay with ${paymentMessage()}.`,
    },
    {
      icon: RotateCcw,
      title: policies.exchangesAllowed ? "Returns & exchanges" : "Easy returns",
      text: `Eligible items within ${policies.returnWindowDays} days of delivery.`,
    },
    {
      icon: PackageCheck,
      title: "Fast dispatch",
      text: `Orders ship in ${shipping.dispatchTime}.`,
    },
    {
      icon: MessageCircle,
      title: "Real support",
      text: `We reply ${policies.supportResponseTime}.`,
    },
  ];
}

export function TrustStrip() {
  const items = getTrustItems();

  return (
    <section aria-label="Why shop with us" className="container pb-8 pt-4">
      <Reveal>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-raised text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg uppercase tracking-wide text-fg">{title}</h3>
                <p className="mt-0.5 text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}