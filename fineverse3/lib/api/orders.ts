import { getCartCompareAtSubtotal, getCartSubtotal } from "@/lib/cart";
import { calculateOrderTotals } from "@/lib/shipping";
import type { CheckoutValues } from "@/lib/validators";
import type { CartLine } from "@/types/cart";
import type { PlacedOrder } from "@/types/order";

function createOrderId(): string {
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 36 ** 3)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `FV-${time}${random}`;
}

/**
 * MOCK. Nothing is sent anywhere and no payment is taken.
 * [EDIT] Replace with your real order / payment API. Keep the signature and
 * the checkout UI will not need to change.
 */
export async function placeOrder(values: CheckoutValues, lines: CartLine[]): Promise<PlacedOrder> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const totals = calculateOrderTotals({
    subtotal: getCartSubtotal(lines),
    compareAtSubtotal: getCartCompareAtSubtotal(lines),
    shippingMethod: values.shippingMethod,
    paymentMethod: values.paymentMethod,
  });

  return {
    id: createOrderId(),
    placedAt: new Date().toISOString(),
    email: values.email,
    fullName: values.fullName,
    addressLines: [
      values.addressLine1,
      values.addressLine2,
      values.landmark ? `Near ${values.landmark}` : "",
      `${values.city}, ${values.state} ${values.pincode}`,
      `Mobile: ${values.phone}`,
    ].filter((line) => line.length > 0),
    lines: lines.map((line) => ({
      slug: line.slug,
      name: line.name,
      colorId: line.colorId,
      colorName: line.colorName,
      size: line.size,
      quantity: line.quantity,
      unitPrice: line.price,
    })),
    totals,
    shippingMethod: values.shippingMethod,
    paymentMethod: values.paymentMethod,
  };
}