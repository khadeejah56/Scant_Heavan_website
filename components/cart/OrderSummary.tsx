import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  showButton?: boolean;
}

const FREE_SHIPPING_THRESHOLD = 56000;
const DEFAULT_SHIPPING_COST = 4200;

export default function OrderSummary({
  subtotal,
  shipping = 0,
}: OrderSummaryProps) {
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || shipping === 0;
  const shippingCost = isFreeShipping ? 0 : shipping || DEFAULT_SHIPPING_COST;
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
          Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
          complimentary shipping.
        </p>
      )}
    </div>
  );
}
