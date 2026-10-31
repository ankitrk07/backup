import { NotFoundPanel } from "@/components/common/not-found-panel";

export default function CollectionNotFound() {
  return (
    <NotFoundPanel
      title="Collection not found"
      message="This collection does not exist or has been moved. Explore the rest of the universe."
      primary={{ href: "/collections", label: "All collections" }}
      secondary={{ href: "/shop", label: "Browse the shop" }}
    />
  );
}