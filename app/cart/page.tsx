"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import Button from "@/components/ui/Button";
import PageWrapper from "@/components/layout/PageWrapper";

export default function CartPage() {
  const { items, subtotal } = useCart();

  return (
    <PageWrapper className="max-w-4xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Your Bag</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-24">
          <ShoppingBag size={40} className="opacity-30" />
          <p className="opacity-60">Your bag is currently empty.</p>
          <Link href="/products">
            <Button>Explore Fragrances</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          <div>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          <div className="md:sticky md:top-32 h-fit border border-current/10 p-6">
            <h2 className="font-display text-xl mb-5">Order Summary</h2>
            <OrderSummary subtotal={subtotal} />
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
