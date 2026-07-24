"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import { products } from "@/data/products";

export interface CheckoutState {
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const CartLineSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive().max(20),
});

const CheckoutSchema = z.object({
  firstName: z.string().trim().min(1, { error: "First name is required." }),
  lastName: z.string().trim().min(1, { error: "Last name is required." }),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  address: z.string().trim().min(1, { error: "Street address is required." }),
  city: z.string().trim().min(1, { error: "City is required." }),
  postalCode: z.string().trim().min(1, { error: "Postal code is required." }),
  country: z.string().trim().min(1, { error: "Country is required." }),
  phone: z.string().trim().min(1, { error: "Phone number is required." }),
  cart: z.string().transform((raw, ctx) => {
    try {
      return z.array(CartLineSchema).min(1).parse(JSON.parse(raw));
    } catch {
      ctx.addIssue({ code: "custom", message: "Your bag is empty or invalid." });
      return z.NEVER;
    }
  }),
});

export async function createOrder(
  _state: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const user = await requireUser();

  const parsed = CheckoutSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
    phone: formData.get("phone"),
    cart: formData.get("cart"),
  });

  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { firstName, lastName, email, address, city, postalCode, country, phone, cart } =
    parsed.data;

  // Recompute every line item from the trusted server-side catalog — the
  // client only ever sends product ids and quantities, never prices.
  const items = cart.map((line) => {
    const product = products.find((p) => p.id === line.productId);
    return product
      ? {
          productId: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          quantity: line.quantity,
        }
      : null;
  });

  if (items.some((item) => item === null)) {
    return { error: "One or more items in your bag is no longer available." };
  }

  const validItems = items as Exclude<(typeof items)[number], null>[];
  const subtotal = validItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      subtotal,
      shippingCost,
      tax,
      total,
      shippingName: `${firstName} ${lastName}`,
      shippingEmail: email,
      shippingAddress: address,
      shippingCity: city,
      shippingPostalCode: postalCode,
      shippingCountry: country,
      shippingPhone: phone,
      items: { create: validItems },
    },
    select: { id: true },
  });

  redirect(`/checkout?order=${order.id}`);
}
