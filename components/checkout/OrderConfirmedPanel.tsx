"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import PageWrapper from "@/components/layout/PageWrapper";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmedPanel({ orderId }: { orderId: string }) {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clearCart();
  }, [clearCart]);

  return (
    <PageWrapper className="max-w-lg mx-auto px-5 pt-40 pb-24 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <CheckCircle2 className="mx-auto text-champagne mb-6" size={48} />
        <h1 className="font-display text-3xl mb-3">Order Confirmed</h1>
        <p className="opacity-70 text-sm mb-2">
          Thank you for your order. A confirmation has been sent to your
          email, and your fragrances will ship within 1–2 business days.
        </p>
        <p className="text-xs opacity-50 mb-8">Order #{orderId}</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </motion.div>
    </PageWrapper>
  );
}
