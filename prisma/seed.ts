import { PrismaClient, Prisma } from "@prisma/client";
import { products } from "../data/products";

const prisma = new PrismaClient();

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        slug: p.slug,
        name: p.name,
        brandLine: p.brandLine,
        category: p.category,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        size: p.size,
        concentration: p.concentration,
        images: p.images,
        shortDescription: p.shortDescription,
        description: p.description,
        notes: p.notes as unknown as Prisma.InputJsonValue,
        rating: p.rating,
        reviewCount: p.reviewCount,
        bestSeller: p.bestSeller ?? false,
        featured: p.featured ?? false,
        newArrival: p.newArrival ?? false,
        stock: p.stock,
      },
      update: {},
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
