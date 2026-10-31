import { SlotImage } from "@/components/media/slot-image";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import type { Testimonial } from "@/types/content";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  const hasMock = testimonials.some((testimonial) => testimonial.isMock);

  return (
    <section aria-label="Customer feedback" className="container py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Community"
          title="Words from the universe"
          action={hasMock ? <Badge variant="warning">Sample testimonials</Badge> : undefined}
        />
        {hasMock ? (
          <p className="mt-3 text-sm text-subtle">
            Placeholder quotes are shown until real customer feedback is added.
          </p>
        ) : null}
      </Reveal>

      <Reveal className="mt-8">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <figure className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-4 flex-1 text-lg leading-7 text-fg">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <SlotImage
                    slot={testimonial.avatar}
                    fill
                    decorative
                    sizes="48px"
                    className="size-12 shrink-0 rounded-full border border-line"
                  />
                  <span>
                    <span className="block font-semibold text-fg">{testimonial.name}</span>
                    <span className="block text-sm text-subtle">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}