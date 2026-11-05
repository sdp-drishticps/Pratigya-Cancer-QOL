//THIS IS THE MIDDLEWAE FILE FOR AUTHENTICATION AND AUTHORIZATION

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore Next.js internals, API routes and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      isAuthenticated = true;
    } catch (error) {
      console.error("Invalid JWT:", error);
      isAuthenticated = false;
    }
  }

  // User is not authenticated
  if (!isAuthenticated && !isPublicRoute) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    // Remove invalid/expired token
    if (token) {
      response.cookies.delete("token");
    }

    return response;
  }

  // User is authenticated but trying to access auth pages
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/forms/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
