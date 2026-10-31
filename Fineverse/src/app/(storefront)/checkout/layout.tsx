import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { default: "Checkout", template: "%s | Fineverse" },
  robots: { index: false, follow: false },
}

export default function CheckoutLayout({ children }: LayoutProps<"/checkout">) {
  return children
}
