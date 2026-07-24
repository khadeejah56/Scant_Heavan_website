"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

const StatusSchema = z.enum(["Processing", "Shipped", "Delivered"]);

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();

  const orderId = formData.get("orderId");
  const parsedStatus = StatusSchema.safeParse(formData.get("status"));

  if (typeof orderId !== "string" || !orderId || !parsedStatus.success) {
    return;
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: parsedStatus.data },
  });

  revalidatePath("/admin/orders");
}
