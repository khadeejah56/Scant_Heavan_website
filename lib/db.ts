import { PrismaClient } from "@prisma/client";

/**
 * In Next.js dev mode, modules are re-evaluated on every file change (hot
 * reload), which would otherwise create a new PrismaClient — and a new
 * database connection — on every save. Stashing the client on `globalThis`
 * in development avoids that. In production, a fresh module load only
 * happens once per process, so this is a no-op there.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;