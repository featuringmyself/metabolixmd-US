import { NextResponse } from 'next/server';

// Firebase authentication middleware
export default function middleware(request) {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/about-us',
    '/services',
    '/login',
    '/register',
    '/api/webhook',
    '/get-started',
    '/api/public(.*)' // Allow all routes under /api/public
  ];

  // Check if the requested path is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.endsWith('(.*)'))
      return request.nextUrl.pathname.startsWith(route.replace('(.*)', ''));
    return request.nextUrl.pathname === route;
  });

  // Get the token from cookies
  const token = request.cookies.get('token');
  
  // If it's not a public route and there's no token, redirect to login
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};