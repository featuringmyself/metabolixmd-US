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
    '/contact-us',
    '/safety-information',
    '/privacy-policy',
    '/terms-policy',
    '/refund-policy',
    '/consumer-health-data-privacy',
    '/terms-and-conditions',
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
  
  // If it's not a public route and there's no token, redirect to home
  if (!isPublicRoute && !token) {
    const homeUrl = new URL('/', request.url);
    homeUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};