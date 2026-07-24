"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Button from "@/components/ui/Button";
import { EASE_LUXE } from "@/lib/motion";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-obsidian/50 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
            className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-[var(--bg)] text-[var(--fg)] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-current/10">
              <h2 className="font-display text-2xl">
                Your Bag {items.length > 0 && `(${items.length})`}
              </h2>
              <button onClick={closeDrawer} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <ShoppingBag size={36} className="opacity-30" />
                  <p className="opacity-60 text-sm">Your bag is empty.</p>
                  <Link href="/products" onClick={closeDrawer}>
                    <Button size="sm">Explore Fragrances</Button>
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-current/10 space-y-5">
                <OrderSummary subtotal={subtotal} />
                <Link href="/checkout" onClick={closeDrawer} className="block">
                  <Button className="w-full">Checkout</Button>
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="block text-center text-xs uppercase tracking-luxe opacity-70 hover:opacity-100"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
