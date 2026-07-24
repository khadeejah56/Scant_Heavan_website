import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import Button from "@/components/ui/Button";

export default function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-24">
      <ScrollReveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
            Most Loved
          </p>
          <h2 className="font-display text-4xl md:text-5xl">Best Sellers</h2>
        </div>
        <Link href="/products">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {bestSellers.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
