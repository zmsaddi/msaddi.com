import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/config/locales';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales: [...locales], // Convert readonly array to mutable array for next-intl
  defaultLocale,
  localePrefix: 'always',
  // ⚡ AUTO-DETECT: Browser language detection enabled
  // Detects user's preferred language from Accept-Language header
  // Falls back to 'en' if browser language is not supported
  localeDetection: true
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ⚡ ROOT PATH HANDLER: Auto-detect browser language for root path
  if (pathname === '/') {
    // Get browser's preferred language from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');

    // Parse Accept-Language to get preferred locale
    let detectedLocale = defaultLocale;

    if (acceptLanguage) {
      // Extract language codes from Accept-Language header
      // Format: "en-US,en;q=0.9,ar;q=0.8,tr;q=0.7"
      const languages = acceptLanguage
        .split(',')
        .map(lang => {
          const [code, q] = lang.trim().split(';');
          const quality = q ? parseFloat(q.split('=')[1]) : 1.0;
          // Extract primary language code (en from en-US)
          const primaryCode = code.split('-')[0].toLowerCase();
          return { code: primaryCode, quality };
        })
        .sort((a, b) => b.quality - a.quality); // Sort by quality score

      // Find first supported locale
      for (const lang of languages) {
        if (locales.includes(lang.code as any)) {
          detectedLocale = lang.code as typeof defaultLocale;
          break;
        }
      }
    }

    // Redirect to detected locale
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}`;
    return NextResponse.redirect(url);
  }

  // For all other paths, use next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};