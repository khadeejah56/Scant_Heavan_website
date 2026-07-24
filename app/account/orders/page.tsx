import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import PageWrapper from "@/components/layout/PageWrapper";
import { requireUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order History",
  description: "Review your past HUSSAIN orders and their status.",
};

const statusVariant = {
  Delivered: "gold",
  Shipped: "dark",
  Processing: "outline",
} as const;

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <PageWrapper className="max-w-4xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
        <h1 className="font-display text-4xl md:text-5xl">Order History</h1>
        <Link
          href="/account"
          className="text-xs uppercase tracking-luxe opacity-60 hover:opacity-100"
        >
          Back to Account
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm opacity-60">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-current/10 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-current/10">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs opacity-60 mt-0.5">
                    Placed on {formatDate(order.createdAt.toISOString())}
                  </p>
                </div>
                <Badge variant={statusVariant[order.status]}>
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative size-16 shrink-0 bg-[var(--surface-muted)] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs opacity-60">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-5 mt-5 border-t border-current/10 text-sm font-medium">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
