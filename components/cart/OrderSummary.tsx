import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  showButton?: boolean;
}

export default function OrderSummary({
  subtotal,
  shipping = 0,
}: OrderSummaryProps) {
  const isFreeShipping = subtotal >= 200 || shipping === 0;
  const shippingCost = isFreeShipping ? 0 : shipping || 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between opacity-80">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between opacity-80">
        <span>Shipping</span>
        <span>{isFreeShipping ? "Complimentary" : formatPrice(shippingCost)}</span>
      </div>
      <div className="flex justify-between opacity-80">
        <span>Estimated tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className="flex justify-between pt-3 border-t border-current/15 text-base font-medium">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      {!isFreeShipping && (
        <p className="text-xs opacity-60 pt-1">
          Add {formatPrice(200 - subtotal)} more for complimentary shipping.
        </p>
      )}
    </div>
  );
}
