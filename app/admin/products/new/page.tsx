import type { Metadata } from "next";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/dal";
import { createProduct } from "@/app/actions/products";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <PageWrapper className="max-w-3xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
        <h1 className="font-display text-4xl md:text-5xl">Add Product</h1>
        <Link
          href="/admin/products"
          className="text-xs uppercase tracking-luxe opacity-60 hover:opacity-100"
        >
          Back to Products
        </Link>
      </div>

      <ProductForm action={createProduct} submitLabel="Create Product" />
    </PageWrapper>
  );
}
