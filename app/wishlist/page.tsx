"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import PageWrapper from "@/components/layout/PageWrapper";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <PageWrapper className="max-w-[1600px] mx-auto px-5 md:px-10 pt-32 pb-24">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-24">
          <Heart size={40} className="opacity-30" />
          <p className="opacity-60">You haven&apos;t saved any fragrances yet.</p>
          <Link href="/products">
            <Button>Discover Fragrances</Button>
          </Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </PageWrapper>
  );
}
