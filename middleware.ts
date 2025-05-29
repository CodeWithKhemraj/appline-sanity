import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  // Skip redirect if already on /maintenance
  if (isMaintenance && req.nextUrl.pathname !== '/maintenance') {
    const url = req.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply middleware to all routes except specific ones
export const config = {
  matcher: [
    /*
     * Exclude these from middleware:
     * - _next (static assets)
     * - api (API routes)
     * - favicon
     * - maintenance page itself
     */
    '/((?!_next|api|favicon.ico|maintenance).*)',
  ],
}; 