"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, ChevronDown, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { cn, formatPrice } from "@/lib/utils";

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-current/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={open}
      >
        <span className="text-sm uppercase tracking-luxe">{title}</span>
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-sm opacity-75 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div>
      <p className="text-xs uppercase tracking-luxe opacity-50 mb-2">
        {product.brandLine}
      </p>
      <h1 className="font-display text-4xl md:text-5xl mb-3">{product.name}</h1>
      <StarRating rating={product.rating} reviewCount={product.reviewCount} size={15} />

      <div className="mt-5 flex items-center gap-3">
        <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-lg opacity-40 line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <p className="mt-5 text-sm opacity-75 leading-relaxed max-w-md">
        {product.shortDescription}
      </p>

      <div className="mt-5 flex items-center gap-4 text-xs opacity-70">
        <span>{product.size}</span>
        <span aria-hidden="true">•</span>
        <span>{product.concentration}</span>
        <span aria-hidden="true">•</span>
        <span className={product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="flex items-center border border-current/20">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-3.5 hover:bg-current/5"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-3.5 hover:bg-current/5"
          >
            <Plus size={14} />
          </button>
        </div>
        <Button
          className="flex-1"
          onClick={() => addItem(product, quantity)}
          disabled={product.stock === 0}
        >
          Add to Bag
        </Button>
        <button
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="p-3.5 border border-current/20 shrink-0"
        >
          <Heart size={16} className={cn(wishlisted && "fill-champagne text-champagne")} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 text-xs opacity-70">
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-champagne shrink-0" />
          Complimentary shipping over $200
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw size={16} className="text-champagne shrink-0" />
          30-day returns
        </div>
      </div>

      <div className="mt-10">
        <Accordion title="Description" defaultOpen>
          <p>{product.description}</p>
        </Accordion>
        <Accordion title="Fragrance Notes">
          <div className="space-y-2">
            <p><span className="text-champagne">Top —</span> {product.notes.top.join(", ")}</p>
            <p><span className="text-champagne">Heart —</span> {product.notes.heart.join(", ")}</p>
            <p><span className="text-champagne">Base —</span> {product.notes.base.join(", ")}</p>
          </div>
        </Accordion>
        <Accordion title="Shipping & Returns">
          <p>
            Orders ship within 1–2 business days. Complimentary shipping on
            orders over $200; standard shipping is $15. Unopened items may be
            returned within 30 days of delivery for a full refund.
          </p>
        </Accordion>
      </div>
    </div>
  );
}
