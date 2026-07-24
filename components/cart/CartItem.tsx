"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-current/10">
      <div className="relative size-24 shrink-0 bg-[var(--surface-muted)] overflow-hidden">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg leading-tight">
              {item.product.name}
            </p>
            <p className="text-xs opacity-60 mt-0.5">{item.product.size}</p>
          </div>
          <button
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remove ${item.product.name} from cart`}
            className="opacity-50 hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border border-current/20">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-2 hover:bg-current/5"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="p-2 hover:bg-current/5"
            >
              <Plus size={12} />
            </button>
          </div>
          <p className="text-sm font-medium">
            {formatPrice(item.product.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
