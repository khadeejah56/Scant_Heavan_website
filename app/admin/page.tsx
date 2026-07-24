import Link from "next/link";
import type { Metadata } from "next";
import { Users, Package, DollarSign } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "HUSSAIN store administration.",
};

export default async function AdminPage() {
  await requireAdmin();

  const [userCount, orderCount, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true } }),
  ]);

  const stats = [
    { label: "Customers", value: userCount, icon: Users },
    { label: "Orders", value: orderCount, icon: Package },
    {
      label: "Total Revenue",
      value: formatPrice(revenue._sum.total ?? 0),
      icon: DollarSign,
    },
  ];

  return (
    <PageWrapper className="max-w-5xl mx-auto px-5 md:px-10 pt-32 pb-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-luxe text-champagne mb-3">
          Admin
        </p>
        <h1 className="font-display text-4xl md:text-5xl">Dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-14">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="border border-current/10 p-6">
            <Icon className="text-champagne mb-4" size={22} />
            <p className="font-display text-3xl mb-1">{value}</p>
            <p className="text-sm opacity-60">{label}</p>
          </div>
        ))}
      </div>

      <Link
        href="/admin/orders"
        className="inline-block text-xs uppercase tracking-luxe text-champagne hover:underline"
      >
        Manage Orders →
      </Link>
    </PageWrapper>
  );
}
