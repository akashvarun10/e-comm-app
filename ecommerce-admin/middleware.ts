import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in"],  // Only the root and sign-in page are public
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all non-static file routes
    "/dashboard", // Protect the dashboard route
    "/(api|trpc)(.*)", // Protect API and trpc routes
  ],
};
