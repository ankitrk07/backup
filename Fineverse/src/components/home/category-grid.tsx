import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/shared/container"

const categories = [
  {
    name: "Electronics",
    href: "/electronics",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
    description: "Smartphones, MacBooks, Audio & Wearables",
    badge: "Flagship Tech",
  },
  {
    name: "Fashion",
    href: "/fashion",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    description: "Iconic Denim, Statement Tees & Footwear",
    badge: "Curated Style",
  },
  {
    name: "Toys",
    href: "/toys",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
    description: "LEGO Sets, RC Racing, Plush & Classics",
    badge: "Play & Learn",
  },
] as const

export function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
              Curated Collections
            </span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Shop by Category
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground sm:text-base">
            Handpicked premium items across three distinct worlds of quality and craft.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg transition-all duration-500 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
              
              <div className="absolute top-4 left-4">
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {cat.badge}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{cat.name}</h3>
                  <p className="mt-1 text-xs text-zinc-300 sm:text-sm font-medium">{cat.description}</p>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900 shadow-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-indigo-500 group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
