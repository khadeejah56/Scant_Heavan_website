"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import OrderSummary from "@/components/cart/OrderSummary";
import PageWrapper from "@/components/layout/PageWrapper";
import { formatPrice } from "@/lib/utils";
import { createOrder, type CheckoutState } from "@/app/actions/orders";

const initialState: CheckoutState = {};

export default function CheckoutForm() {
  const { items, subtotal } = useCart();
  const [state, formAction, isPending] = useActionState(createOrder, initialState);

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

  const cartPayload = JSON.stringify(
    items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
  );

  return (
    <PageWrapper className="max-w-6xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Checkout</h1>

      <form action={formAction} className="grid lg:grid-cols-[1fr_380px] gap-14">
        <input type="hidden" name="cart" value={cartPayload} />

        <div className="space-y-12">
          <section>
            <h2 className="text-xs uppercase tracking-luxe text-champagne mb-5">
              1. Contact & Shipping
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                required
                error={state.fieldErrors?.firstName?.[0]}
              />
              <Input
                label="Last Name"
                name="lastName"
                required
                error={state.fieldErrors?.lastName?.[0]}
              />
              <div className="sm:col-span-2">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  error={state.fieldErrors?.email?.[0]}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  name="address"
                  required
                  error={state.fieldErrors?.address?.[0]}
                />
              </div>
              <Input
                label="City"
                name="city"
                required
                error={state.fieldErrors?.city?.[0]}
              />
              <Input
                label="Postal Code"
                name="postalCode"
                required
                error={state.fieldErrors?.postalCode?.[0]}
              />
              <Input
                label="Country"
                name="country"
                required
                error={state.fieldErrors?.country?.[0]}
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                required
                error={state.fieldErrors?.phone?.[0]}
              />
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
            <p className="text-xs opacity-40 mt-1">
              Demo storefront — no real payment is processed.
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
          {state.error && (
            <p className="text-xs text-red-400 mt-4">{state.error}</p>
          )}
          <Button type="submit" className="w-full mt-6" isLoading={isPending}>
            Place Order
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
}
