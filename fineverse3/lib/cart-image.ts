import { COLOR_CATALOG } from "@/lib/colors";
import { getProductImages } from "@/lib/images";
import type { CartLine } from "@/types/cart";
import type { ImageSlot } from "@/types/image";

/** The product photo for a cart line's chosen colour (front view). */
export function getCartLineImage(
  line: Pick<CartLine, "slug" | "name" | "colorId" | "colorName">,
): ImageSlot {
  const images = getProductImages({
    slug: line.slug,
    name: line.name,
    colors: [{ id: line.colorId, name: line.colorName, hex: COLOR_CATALOG[line.colorId].hex }],
  });
  return (images.find((image) => image.view === "front") ?? images[0]).slot;
}