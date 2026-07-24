import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/dal";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderConfirmedPanel from "@/components/checkout/OrderConfirmedPanel";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;

  if (orderId) {
    const user = await requireUser();
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId: user.id },
      select: { id: true },
    });
    if (order) {
      return <OrderConfirmedPanel orderId={order.id} />;
    }
  }

  return <CheckoutForm />;
}
