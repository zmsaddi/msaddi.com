import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

// Enhanced middleware with security and i18n
export default function middleware(request: NextRequest) {
  // First, apply internationalization
  const response = intlMiddleware(request);

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // CSRF Protection: Verify origin header for state-changing requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // In production, verify origin matches host
    if (origin && host && !origin.includes(host)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return response;
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
