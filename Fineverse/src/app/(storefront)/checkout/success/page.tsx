import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/shared/container"
import { auth } from "@/lib/auth"
import { getOrderByNumber } from "@/lib/services/order-service"
import { formatDate, formatPrice } from "@/lib/utils"

export default async function CheckoutSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  const { order: orderNumber } = await searchParams
  const session = await auth()
  if (!session?.user) redirect("/login")
  if (typeof orderNumber !== "string") notFound()

  const order = await getOrderByNumber(orderNumber, session.user.id)
  if (!order) notFound()

  const isCod = order.payment?.method === "COD"

  return (
    <Container className="max-w-2xl py-12 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <div className="bg-success/10 flex size-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-success size-8" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">Order Confirmed!</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Thank you for your order. We&rsquo;ve sent a confirmation to your email.
        </p>
        <p className="text-muted-foreground mt-1 font-mono text-sm">Order #{order.orderNumber}</p>
      </div>

      <div className="border-border mt-8 rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-muted-foreground text-xs">Order Date</p>
            <p className="text-foreground text-sm font-medium">{formatDate(order.createdAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Estimated Delivery</p>
            <p className="text-foreground text-sm font-medium">
              {order.estimatedDeliveryAt ? formatDate(order.estimatedDeliveryAt) : "TBD"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Payment Method</p>
            <p className="text-foreground text-sm font-medium">{isCod ? "Cash on Delivery" : order.payment?.method}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="bg-muted relative size-14 shrink-0 overflow-hidden rounded-md">
                {item.image && <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm text-foreground">{item.name}</p>
                <p className="text-muted-foreground text-xs">Qty {item.quantity}</p>
              </div>
              <span className="font-mono text-sm text-foreground">{formatPrice(Number(item.price) * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <span className="text-foreground font-semibold">Total Paid</span>
          <span className="font-mono text-lg font-semibold text-foreground">{formatPrice(Number(order.total))}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg" variant="outline" className="gap-1.5">
          <Link href={`/account/orders/${order.id}`}>
            <Package className="size-4" /> View Order
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </Container>
  )
}
