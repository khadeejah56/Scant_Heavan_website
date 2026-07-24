import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsPageClient from "@/components/product/ProductsPageClient";
import { getAllProducts } from "@/lib/products";

// Products are admin-editable, so always fetch fresh rather than caching
// a static build-time snapshot.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse HUSSAIN's full collection of men's, women's, unisex, and luxury perfumes, plus curated gift sets. Filter by category, concentration, and price.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductsPageClient products={products} />
    </Suspense>
  );
}
