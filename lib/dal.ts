import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSessionPayload } from "@/lib/session";

export const verifySession = cache(async () => {
  const payload = await getSessionPayload();
  const userId = payload?.userId;
  if (typeof userId !== "string") return null;
  return { userId };
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
