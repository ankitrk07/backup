import { Star, Quote } from "lucide-react"
import { Container } from "@/components/shared/container"

const testimonials = [
  {
    name: "Ananya Rao",
    role: "Verified Buyer",
    item: "Sony WH-1000XM5",
    quote:
      "The checkout was effortless and my headphones arrived in mint condition a day early. Fineverse has genuinely replaced three other shopping apps on my phone.",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    role: "Verified Buyer",
    item: "Levi's Denim & Monopoly",
    quote:
      "Ordered apparel and a board game in the exact same cart — packaging was pristine and sizing was spot on. Seamless experience from start to finish.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Verified Buyer",
    item: "Apple MacBook Air M3",
    quote:
      "High value purchase so I was cautious, but the authentic warranty registration worked immediately. Customer support is lightning fast!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            Real Experiences
          </span>
          <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Loved by Thousands of Discerning Shoppers
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
            Genuine ratings and verified reviews from people across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < t.rating ? "fill-amber-400 text-amber-400 size-4" : "fill-muted text-muted-foreground/30 size-4"
                        }
                      />
                    ))}
                  </div>
                  <Quote className="size-5 text-indigo-400/30" />
                </div>
                <blockquote className="text-foreground/90 text-sm leading-relaxed font-normal">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-border/50 pt-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground">{t.role}</p>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-medium text-indigo-400">
                  {t.item}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
