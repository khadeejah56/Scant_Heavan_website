import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-10 py-20 border-t border-current/10">
      <ScrollReveal>
        <p className="text-xs uppercase tracking-luxe text-champagne mb-2">
          You May Also Like
        </p>
        <h2 className="font-display text-3xl mb-10">Complete the Collection</h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
