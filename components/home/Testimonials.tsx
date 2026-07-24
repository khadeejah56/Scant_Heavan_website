import { Quote } from "lucide-react";
import { testimonials } from "@/data/reviews";
import StarRating from "@/components/ui/StarRating";
import ScrollReveal from "@/components/ScrollReveal";

export default function Testimonials() {
  return (
    <section className="bg-beige dark:bg-charcoal py-24">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
            In Their Words
          </p>
          <h2 className="font-display text-4xl md:text-5xl">
            Loved Around the World
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.08}>
              <div className="bg-[var(--surface)] p-7 h-full flex flex-col">
                <Quote className="text-champagne mb-4" size={22} />
                <p className="text-sm leading-relaxed opacity-80 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <StarRating rating={t.rating} size={13} />
                  <p className="text-sm font-medium mt-2">{t.author}</p>
                  <p className="text-xs opacity-50">{t.location}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
