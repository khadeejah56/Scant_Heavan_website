import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { reviews } from "@/data/reviews";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import PageWrapper from "@/components/layout/PageWrapper";

// Products are admin-editable, so always fetch fresh rather than caching
// a static build-time snapshot.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Fragrance Not Found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | HUSSAIN`,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 900, height: 1200 }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = await getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: { "@type": "Brand", name: "HUSSAIN" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="max-w-2xl mt-20 pt-16 border-t border-current/10">
          <h2 className="font-display text-3xl mb-8">Customer Reviews</h2>
          <ProductReviews
            reviews={productReviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
      </div>

      <RelatedProducts products={related} />
    </PageWrapper>
  );
}
