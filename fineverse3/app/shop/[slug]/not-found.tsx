import { NotFoundPanel } from "@/components/common/not-found-panel";

export default function ProductNotFound() {
  return (
    <NotFoundPanel
      title="Product not found"
      message="This product does not exist or is no longer available. Explore the rest of the universe."
      primary={{ href: "/shop", label: "Browse the shop" }}
      secondary={{ href: "/collections", label: "View collections" }}
    />
  );
}