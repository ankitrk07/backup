import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/common/not-found-panel";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <NotFoundPanel
      title="Page not found"
      message="The page you are looking for has drifted out of orbit. Let’s get you back to the universe."
      primary={{ href: "/shop", label: "Browse the shop" }}
      secondary={{ href: "/", label: "Back to home" }}
    />
  );
}