import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsPageClient from "@/components/product/ProductsPageClient";

export const metadata: Metadata = {
  title: "Shop All Fragrances",
  description:
    "Browse HUSSAIN's full collection of men's, women's, unisex, and luxury perfumes, plus curated gift sets. Filter by category, concentration, and price.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProductsPageClient />
    </Suspense>
  );
}
