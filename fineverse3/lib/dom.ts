/** Client-only helpers. Call from event handlers or effects, never during render. */

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollIntoViewCentered(element: HTMLElement | null): void {
  if (!element) return;
  element.scrollIntoView({
    block: "center",
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}