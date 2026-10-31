import { ButtonLink } from "@/components/ui/button";

interface Action {
  href: string;
  label: string;
}

interface NotFoundPanelProps {
  title: string;
  message: string;
  primary?: Action;
  secondary?: Action;
}

/** Shared by the 404 pages (collections, products and the global one). */
export function NotFoundPanel({
  title,
  message,
  primary = { href: "/shop", label: "Browse the shop" },
  secondary = { href: "/", label: "Back to home" },
}: NotFoundPanelProps) {
  return (
    <div className="container flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-eyebrow uppercase text-accent">Lost in space</p>
      <h1 className="mt-3 text-balance font-display text-display-lg uppercase text-fg">{title}</h1>
      <p className="mt-4 max-w-md text-lg text-muted">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href={primary.href} size="lg">
          {primary.label}
        </ButtonLink>
        <ButtonLink href={secondary.href} variant="outline" size="lg">
          {secondary.label}
        </ButtonLink>
      </div>
    </div>
  );
}