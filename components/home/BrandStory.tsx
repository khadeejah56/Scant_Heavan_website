import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const pyramid = [
  {
    label: "Top Note",
    title: "Founded on Obsession",
    text: "HUSSAIN began in a small Grasse workshop in 2014, where our founder, unsatisfied with the sameness of mainstream fragrance, began blending rare absolutes by hand.",
  },
  {
    label: "Heart Note",
    title: "Composed, Not Manufactured",
    text: "Every Haven fragrance is developed over a minimum of eighteen months, layered note by note until it earns a place in the collection. We release fewer than six scents a year.",
  },
  {
    label: "Base Note",
    title: "Built to Last",
    text: "Our formulas favor depth over projection — fragrances designed to sit close to skin and reveal themselves slowly, the way a signature should.",
  },
];

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      className="bg-charcoal text-ivory py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal className="relative aspect-[4/5] order-2 lg:order-1">
          <Image
            src="/images/brand/story.png"
            alt="Inside the HUSSAIN atelier where fragrances are composed"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </ScrollReveal>

        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-10 max-w-md">
              A House Built Like a Fragrance
            </h2>
          </ScrollReveal>

          <div className="space-y-8">
            {pyramid.map((p, i) => (
              <ScrollReveal key={p.label} delay={i * 0.12}>
                <div className="flex gap-6">
                  <span className="text-xs uppercase tracking-luxe text-champagne w-24 shrink-0 pt-1">
                    {p.label}
                  </span>
                  <div className="border-l border-ivory/15 pl-6">
                    <h3 className="font-display text-xl mb-2">{p.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed max-w-md">
                      {p.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
