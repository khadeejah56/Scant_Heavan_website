import type { Product as ProductRow } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Category, Concentration, FragranceNotes, Product } from "@/types";

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brandLine: row.brandLine,
    category: row.category as Category,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? undefined,
    size: row.size,
    concentration: row.concentration as Concentration,
    images: row.images as string[],
    shortDescription: row.shortDescription,
    description: row.description,
    notes: row.notes as unknown as FragranceNotes,
    rating: row.rating,
    reviewCount: row.reviewCount,
    bestSeller: row.bestSeller,
    featured: row.featured,
    newArrival: row.newArrival,
    stock: row.stock,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? toProduct(row) : null;
}

export async function getRelatedProducts(
  product: Product,
  count = 4
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    take: count,
  });
  return rows.map(toProduct);
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { bestSeller: true },
    take: limit,
  });
  return rows.map(toProduct);
}
