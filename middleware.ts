import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/config/locales';

// Create next-intl middleware - LOCALE DETECTION DISABLED
// We handle detection manually to avoid cookie interference
const intlMiddleware = createMiddleware({
  locales: [...locales], // Convert readonly array to mutable array for next-intl
  defaultLocale,
  localePrefix: 'always',
  // ⚡ IMPORTANT: localeDetection DISABLED to prevent cookie interference
  // next-intl's localeDetection creates a NEXT_LOCALE cookie that overrides
  // Accept-Language header. We handle detection manually below.
  localeDetection: false
});

/**
 * Parse Accept-Language header and detect best matching locale
 * @param acceptLanguage - Accept-Language header value
 * @returns Detected locale code or defaultLocale
 */
function detectLocaleFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;

  // Extract language codes from Accept-Language header
  // Format: "ar-SA,ar;q=0.9,en-US;q=0.8,en;q=0.7,tr;q=0.6"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q] = lang.trim().split(';');
      const quality = q ? parseFloat(q.split('=')[1]) : 1.0;
      // Extract primary language code (en from en-US, ar from ar-SA)
      const primaryCode = code.split('-')[0].toLowerCase();
      return { code: primaryCode, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality score (highest first)

  // Find first supported locale
  for (const lang of languages) {
    if (locales.includes(lang.code as any)) {
      return lang.code;
    }
  }

  return defaultLocale;
}

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ⚡ FORCE DETECTION: Check if user wants to force language detection
  // Usage: Add ?detect=1 to any URL to force browser language detection
  const forceDetect = searchParams.get('detect') === '1';

  // ⚡ ROOT PATH HANDLER: Auto-detect browser language for root path
  // Handles: /, /?query, /#hash
  if (pathname === '/' || pathname === '' || forceDetect) {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLocaleFromHeader(acceptLanguage);

    // Redirect to detected locale, preserving query params (except detect param)
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;

    // Remove detect parameter from URL
    if (forceDetect) {
      url.searchParams.delete('detect');
    }

    // Create response with redirect
    const response = NextResponse.redirect(url);

    // ⚡ CRITICAL: Always delete NEXT_LOCALE cookie to prevent interference
    response.cookies.delete('NEXT_LOCALE');

    // Also set cookie domain to ensure deletion across all paths
    response.cookies.set('NEXT_LOCALE', '', {
      maxAge: 0,
      path: '/',
      domain: request.nextUrl.hostname
    });

    return response;
  }

  // ⚡ COOKIE CLEANUP: Delete NEXT_LOCALE cookie on every request
  // This ensures no stale cookies interfere with detection
  const response = intlMiddleware(request);
  response.cookies.delete('NEXT_LOCALE');
  response.cookies.set('NEXT_LOCALE', '', {
    maxAge: 0,
    path: '/',
    domain: request.nextUrl.hostname
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};