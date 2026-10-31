import Link from "next/link"
import { Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-32 text-center">
      <div className="bg-secondary flex size-16 items-center justify-center rounded-full">
        <Compass className="text-muted-foreground size-7" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Page not found</h1>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
        </p>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </Container>
  )
}
