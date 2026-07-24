import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const collections = [
  {
    title: "Women's",
    href: "/products?category=womens",
    image: "/images/collections/women1.png",
  },
  {
    title: "Men's",
    href: "/products?category=mens",
    image: "/images/collections/men1.png",
  },
  {
    title: "Luxury Reserve",
    href: "/products?category=luxury",
    image: "/images/collections/luxury1.png",
  },
  {
    title: "Gift Sets",
    href: "/products?category=gift-sets",
   image: "/images/collections/giftset.png",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24">
      <ScrollReveal className="mb-12 text-center">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          Curated For You
        </p>
        <h2 className="font-display text-4xl md:text-5xl">
          Featured Collections
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {collections.map((c, i) => (
          <ScrollReveal key={c.title} delay={i * 0.08}>
            <Link
              href={c.href}
              className="group relative block aspect-[3/4] overflow-hidden bg-[var(--surface-muted)]"
            >
              <Image
                src={c.image}
                alt={`${c.title} fragrance collection`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="font-display text-xl md:text-2xl text-ivory">
                  {c.title}
                </span>
                <div className="h-px w-8 bg-champagne mt-2 transition-all duration-500 group-hover:w-14" />
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
