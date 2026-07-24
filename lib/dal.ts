import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionPayload } from "@/lib/session";

export const verifySession = cache(async () => {
  const payload = await getSessionPayload();
  const userId = payload?.userId;
  if (typeof userId !== "string") return null;
  return { userId, role: payload?.role };
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "ADMIN") redirect("/account");
  return user;
}
