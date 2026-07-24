"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Category, Product } from "@/types";
import ProductFilters, {
  FilterState,
  FilterToolbar,
} from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";
import PageWrapper from "@/components/layout/PageWrapper";
import ScrollReveal from "@/components/ScrollReveal";

export default function ProductsPageClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const query = searchParams.get("q")?.toLowerCase() ?? "";

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    concentrations: [],
    maxPrice: 130000,
    sort: "featured",
  });

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category))
        return false;
      if (
        filters.concentrations.length &&
        !filters.concentrations.includes(p.concentration)
      )
        return false;
      if (p.price > filters.maxPrice) return false;
      if (query) {
        const haystack =
          `${p.name} ${p.brandLine} ${p.shortDescription} ${p.category}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort(
          (a, b) => Number(b.newArrival) - Number(a.newArrival)
        );
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }

    return list;
  }, [products, filters, query]);

  return (
    <PageWrapper className="max-w-[1600px] mx-auto px-5 md:px-10 pt-32 pb-24">
      <ScrollReveal className="mb-10">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          {query ? `Results for "${query}"` : "The Full Collection"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl">All Fragrances</h1>
      </ScrollReveal>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <aside>
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
        </aside>
        <div>
          <FilterToolbar
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
          />
          <ProductGrid products={filtered} />
        </div>
      </div>
    </PageWrapper>
  );
}
