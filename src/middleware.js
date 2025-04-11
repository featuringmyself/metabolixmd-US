import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/about-us",
    "/services",
    "/login",
    "/signup",
    "/api/webhook",
    "/get-started",
    "/api/public(.*)" // Allow all routes under /api/public
  ],
  // Only protect specific routes that require authentication
  ignoredRoutes: [
    "/profile(.*)" // Protect profile-related routes
  ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};