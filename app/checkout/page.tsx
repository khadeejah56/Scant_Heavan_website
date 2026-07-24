"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import OrderSummary from "@/components/cart/OrderSummary";
import PageWrapper from "@/components/layout/PageWrapper";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <PageWrapper className="max-w-lg mx-auto px-5 pt-40 pb-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 className="mx-auto text-champagne mb-6" size={48} />
          <h1 className="font-display text-3xl mb-3">Order Confirmed</h1>
          <p className="opacity-70 text-sm mb-8">
            Thank you for your order. A confirmation has been sent to your
            email, and your fragrances will ship within 1–2 business days.
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </motion.div>
      </PageWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <PageWrapper className="max-w-lg mx-auto px-5 pt-40 pb-24 text-center">
        <p className="opacity-70 mb-6">Your bag is empty.</p>
        <Link href="/products">
          <Button>Explore Fragrances</Button>
        </Link>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-[1fr_380px] gap-14">
        <div className="space-y-12">
          <section>
            <h2 className="text-xs uppercase tracking-luxe text-champagne mb-5">
              1. Contact & Shipping
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input label="First Name" required />
              <Input label="Last Name" required />
              <div className="sm:col-span-2">
                <Input label="Email Address" type="email" required />
              </div>
              <div className="sm:col-span-2">
                <Input label="Street Address" required />
              </div>
              <Input label="City" required />
              <Input label="Postal Code" required />
              <Input label="Country" required />
              <Input label="Phone Number" type="tel" required />
            </div>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-luxe text-champagne mb-5">
              2. Payment
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Input label="Card Number" placeholder="•••• •••• •••• ••••" required />
              </div>
              <Input label="Expiry Date" placeholder="MM/YY" required />
              <Input label="CVC" required />
            </div>
            <p className="flex items-center gap-2 text-xs opacity-50 mt-4">
              <Lock size={13} /> Payments are encrypted and secure.
            </p>
          </section>
        </div>

        <div className="h-fit border border-current/10 p-6">
          <h2 className="font-display text-xl mb-5">Order Summary</h2>
          <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="opacity-70">
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <OrderSummary subtotal={subtotal} />
          <Button
            type="submit"
            className="w-full mt-6"
            isLoading={isLoading}
          >
            Place Order
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
}
