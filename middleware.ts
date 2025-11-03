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
  const { pathname } = request.nextUrl;

  // ⚡ ROOT PATH HANDLER: Auto-detect browser language for root path
  // Handles: /, /?query, /#hash
  if (pathname === '/' || pathname === '') {
    const acceptLanguage = request.headers.get('accept-language');
    const detectedLocale = detectLocaleFromHeader(acceptLanguage);

    // Redirect to detected locale, preserving query params and hash
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;

    // Create response with redirect
    const response = NextResponse.redirect(url);

    // ⚡ IMPORTANT: Delete any existing NEXT_LOCALE cookie to ensure
    // fresh detection on every visit to root path
    response.cookies.delete('NEXT_LOCALE');

    return response;
  }

  // For all other paths, use next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};