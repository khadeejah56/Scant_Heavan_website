import Link from "next/link";
import type { Metadata } from "next";
import { Package, Heart, MapPin, LogOut } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { requireUser } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { logout } from "@/app/actions/auth";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your HUSSAIN profile, orders, and addresses.",
};

export default async function AccountPage() {
  const user = await requireUser();
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, status: true, total: true, createdAt: true },
  });
  const recentOrder = orders[0];

  return (
    <PageWrapper className="max-w-5xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          My Account
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          Welcome, {user.name}
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <Link
          href="/account/orders"
          className="group border border-current/10 p-6 hover:border-champagne transition-colors"
        >
          <Package className="text-champagne mb-4" size={22} />
          <h2 className="font-display text-xl mb-1">Order History</h2>
          <p className="text-sm opacity-60">
            {orders.length} {orders.length === 1 ? "order" : "orders"} — track
            and review past purchases.
          </p>
        </Link>

        <Link
          href="/wishlist"
          className="group border border-current/10 p-6 hover:border-champagne transition-colors"
        >
          <Heart className="text-champagne mb-4" size={22} />
          <h2 className="font-display text-xl mb-1">Wishlist</h2>
          <p className="text-sm opacity-60">
            View fragrances you&apos;ve saved for later.
          </p>
        </Link>

        <div className="border border-current/10 p-6">
          <MapPin className="text-champagne mb-4" size={22} />
          <h2 className="font-display text-xl mb-1">Address Book</h2>
          <p className="text-sm opacity-60">
            {recentOrder
              ? "Saved from your most recent order."
              : "No saved addresses yet."}
          </p>
        </div>
      </div>

      {recentOrder && (
        <div className="border-t border-current/10 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl">Most Recent Order</h2>
            <Link
              href="/account/orders"
              className="text-xs uppercase tracking-luxe text-champagne hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="border border-current/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{recentOrder.id}</p>
              <p className="text-sm opacity-60">
                Placed on {formatDate(recentOrder.createdAt.toISOString())} ·{" "}
                {recentOrder.status}
              </p>
            </div>
            <p className="font-medium">{formatPrice(recentOrder.total)}</p>
          </div>
        </div>
      )}

      <form action={logout}>
        <button
          type="submit"
          className="flex items-center gap-2 text-xs uppercase tracking-luxe opacity-60 hover:opacity-100 mt-14"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </form>
    </PageWrapper>
  );
}
