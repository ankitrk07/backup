import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about our custom design tokens so that, for example,
// `text-display-xl` is not mistaken for a text colour and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-xl", "display-lg", "display-md", "display-sm", "eyebrow"] }],
      shadow: [{ shadow: ["card", "glow-accent", "glow-violet", "drawer", "sheet"] }],
      z: [{ z: ["header", "sticky", "drawer", "modal", "toast"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}