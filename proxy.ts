import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionPayload } from "@/lib/session";

const protectedRoutes = ["/account", "/checkout"];
const authRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(path);

  const session = await getSessionPayload();

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout", "/login", "/signup"],
};
