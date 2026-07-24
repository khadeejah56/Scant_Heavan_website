"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import { formatPrice, cn } from "@/lib/utils";
import { EASE_LUXE } from "@/lib/motion";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: EASE_LUXE }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--surface-muted)] mb-4">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.bestSeller && <Badge variant="dark">Best Seller</Badge>}
          {product.newArrival && <Badge variant="gold">New</Badge>}
          {product.compareAtPrice && <Badge variant="outline">Sale</Badge>}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute top-3 right-3 bg-[var(--bg)]/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        >
          <Heart
            size={16}
            className={cn(wishlisted && "fill-champagne text-champagne")}
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product, 1);
          }}
          className="absolute bottom-0 inset-x-0 bg-obsidian/90 text-ivory text-xs uppercase tracking-luxe py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingBag size={14} /> Quick Add
        </button>
      </div>

      <Link href={`/products/${product.slug}`} className="block">
        <p className="text-[10px] uppercase tracking-luxe opacity-50 mb-1">
          {product.brandLine}
        </p>
        <h3 className="font-display text-lg leading-tight mb-1.5">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm opacity-40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
