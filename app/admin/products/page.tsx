import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import DeleteProductForm from "@/components/admin/DeleteProductForm";

export const metadata: Metadata = {
  title: "Manage Products",
  description: "HUSSAIN store product catalog management.",
};

export default async function AdminProductsPage() {
  await requireAdmin();

  const products = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <PageWrapper className="max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
            Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl">Products</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs uppercase tracking-luxe opacity-60 hover:opacity-100"
          >
            Dashboard
          </Link>
          <Link href="/admin/products/new">
            <span className="inline-flex items-center gap-2 bg-obsidian text-ivory dark:bg-champagne dark:text-obsidian text-xs uppercase tracking-luxe px-5 py-3">
              <Plus size={14} /> Add Product
            </span>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => {
          const images = product.images as string[];
          return (
            <div
              key={product.id}
              className="flex items-center gap-4 border border-current/10 p-4"
            >
              <div className="relative size-16 shrink-0 bg-[var(--surface-muted)] overflow-hidden">
                {images[0] && (
                  <Image
                    src={images[0]}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-xs opacity-60">
                  {product.category} · Stock {product.stock}
                </p>
              </div>
              <p className="text-sm font-medium shrink-0">
                {formatPrice(product.price)}
              </p>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-xs uppercase tracking-luxe text-champagne hover:underline shrink-0"
              >
                Edit
              </Link>
              <DeleteProductForm productId={product.id} productName={product.name} />
            </div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
