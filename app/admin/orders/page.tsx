import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import PageWrapper from "@/components/layout/PageWrapper";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { formatDate, formatPrice } from "@/lib/utils";
import { updateOrderStatus } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Manage Orders",
  description: "HUSSAIN store order management.",
};

const statusVariant = {
  Delivered: "gold",
  Shipped: "dark",
  Processing: "outline",
} as const;

const statuses = ["Processing", "Shipped", "Delivered"] as const;

export default async function AdminOrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: { select: { name: true, email: true } } },
  });

  return (
    <PageWrapper className="max-w-5xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
        <h1 className="font-display text-4xl md:text-5xl">Manage Orders</h1>
        <Link
          href="/admin"
          className="text-xs uppercase tracking-luxe opacity-60 hover:opacity-100"
        >
          Back to Dashboard
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm opacity-60">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-current/10 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-5 mb-5 border-b border-current/10">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs opacity-60 mt-0.5">
                    {order.user.name} · {order.user.email}
                  </p>
                  <p className="text-xs opacity-60 mt-0.5">
                    Placed on {formatDate(order.createdAt.toISOString())}
                  </p>
                </div>
                <Badge variant={statusVariant[order.status]}>
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="opacity-70">
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-current/10">
                <span className="text-sm font-medium">
                  Total {formatPrice(order.total)}
                </span>
                <form
                  action={updateOrderStatus}
                  className="flex items-center gap-2"
                >
                  <input type="hidden" name="orderId" value={order.id} />
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="bg-transparent text-xs uppercase tracking-luxe border-b border-current/20 py-1 outline-none focus:border-champagne"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="text-obsidian">
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="text-xs uppercase tracking-luxe text-champagne hover:underline"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
