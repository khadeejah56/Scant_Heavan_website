"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

export interface ProductFormState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const CATEGORIES = ["mens", "womens", "unisex", "luxury", "gift-sets"] as const;
const CONCENTRATIONS = ["Eau de Toilette", "Eau de Parfum", "Parfum"] as const;

function splitLines(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitCommas(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

const ProductSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
      error: "Slug must be lowercase letters, numbers, and hyphens only.",
    }),
  name: z.string().trim().min(1, { error: "Name is required." }),
  brandLine: z.string().trim().min(1, { error: "Brand line is required." }),
  category: z.enum(CATEGORIES, { error: "Choose a valid category." }),
  concentration: z.enum(CONCENTRATIONS, { error: "Choose a valid concentration." }),
  price: z.coerce.number().positive({ error: "Price must be a positive number." }),
  compareAtPrice: z
    .union([z.coerce.number().positive(), z.nan()])
    .optional()
    .transform((v) => (v === undefined || Number.isNaN(v) ? undefined : v)),
  size: z.string().trim().min(1, { error: "Size is required." }),
  images: z
    .array(
      z.string().trim().refine(
        (v) => v.startsWith("/") || /^https?:\/\//.test(v),
        {
          error:
            "Each image must be a full https:// URL or a local path starting with / (e.g. /images/products/mens/men1.png).",
        }
      )
    )
    .min(1, { error: "At least one image is required." }),
  shortDescription: z.string().trim().min(1, { error: "Short description is required." }),
  description: z.string().trim().min(1, { error: "Description is required." }),
  notesTop: z.array(z.string()).min(1, { error: "At least one top note is required." }),
  notesHeart: z.array(z.string()).min(1, { error: "At least one heart note is required." }),
  notesBase: z.array(z.string()).min(1, { error: "At least one base note is required." }),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().int().min(0),
  stock: z.coerce.number().int().min(0),
  bestSeller: z.coerce.boolean(),
  featured: z.coerce.boolean(),
  newArrival: z.coerce.boolean(),
});

function parseProductForm(formData: FormData) {
  return ProductSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    brandLine: formData.get("brandLine"),
    category: formData.get("category"),
    concentration: formData.get("concentration"),
    price: formData.get("price"),
    compareAtPrice: formData.get("compareAtPrice") || undefined,
    size: formData.get("size"),
    images: splitLines(formData.get("images")),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    notesTop: splitCommas(formData.get("notesTop")),
    notesHeart: splitCommas(formData.get("notesHeart")),
    notesBase: splitCommas(formData.get("notesBase")),
    rating: formData.get("rating") || 0,
    reviewCount: formData.get("reviewCount") || 0,
    stock: formData.get("stock") || 0,
    bestSeller: formData.get("bestSeller") === "on",
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
  });
}

function toProductData(data: z.infer<typeof ProductSchema>) {
  return {
    slug: data.slug,
    name: data.name,
    brandLine: data.brandLine,
    category: data.category,
    concentration: data.concentration,
    price: data.price,
    compareAtPrice: data.compareAtPrice ?? null,
    size: data.size,
    images: data.images,
    shortDescription: data.shortDescription,
    description: data.description,
    notes: { top: data.notesTop, heart: data.notesHeart, base: data.notesBase },
    rating: data.rating,
    reviewCount: data.reviewCount,
    stock: data.stock,
    bestSeller: data.bestSeller,
    featured: data.featured,
    newArrival: data.newArrival,
  };
}

export async function createProduct(
  _state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await prisma.product.create({ data: toProductData(parsed.data) });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { fieldErrors: { slug: ["That slug is already in use."] } };
    }
    throw err;
  }

  redirect("/admin/products");
}

export async function updateProduct(
  productId: string,
  _state: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: toProductData(parsed.data),
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { fieldErrors: { slug: ["That slug is already in use."] } };
    }
    throw err;
  }

  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const productId = formData.get("productId");
  if (typeof productId !== "string" || !productId) return;

  await prisma.product.delete({ where: { id: productId } });
  redirect("/admin/products");
}
