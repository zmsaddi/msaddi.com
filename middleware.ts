import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, type Locale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Language Negotiation Priority (as per Arabic specification):
 * 1. User Preference Cookie (NEXT_LOCALE) - Highest Priority
 * 2. Browser Accept-Language Header
 * 3. URL Path Parameter
 * 4. Default Language (ar for Syrian market, en for international)
 */

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
});

function getLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  // Parse Accept-Language header (format: "en-US,en;q=0.9,ar;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=');
      const quality = qValue ? parseFloat(qValue) : 1.0;
      const langCode = locale.split('-')[0].toLowerCase();
      return { locale: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find first matching locale
  for (const { locale } of languages) {
    if (locales.includes(locale as Locale)) {
      return locale as Locale;
    }
  }

  return null;
}

function getLocaleFromPathname(pathname: string): Locale | null {
  // Extract locale from pathname (e.g., /ar/about -> ar)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return null;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // PRIORITY 1: Check for user preference cookie (highest priority)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale | undefined;
  if (cookieLocale && locales.includes(cookieLocale)) {
    // Cookie exists and is valid
    const pathLocale = getLocaleFromPathname(pathname);

    // If URL locale differs from cookie, redirect to cookie locale
    if (pathLocale && pathLocale !== cookieLocale && pathname !== '/') {
      const newPathname = pathname.replace(`/${pathLocale}`, `/${cookieLocale}`);
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }

  // PRIORITY 2: Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const browserLocale = getLocaleFromAcceptLanguage(acceptLanguage);

  // PRIORITY 3: Check URL path parameter
  const pathLocale = getLocaleFromPathname(pathname);

  // PRIORITY 4: Use default locale
  const finalLocale = cookieLocale || browserLocale || pathLocale || defaultLocale;

  // Run next-intl middleware
  const response = intlMiddleware(request);

  // Set/update cookie with determined locale
  if (!cookieLocale || cookieLocale !== finalLocale) {
    response.cookies.set('NEXT_LOCALE', finalLocale, {
      path: '/',
      maxAge: 31536000, // 1 year
      httpOnly: false, // Allow client-side JavaScript to read (for language switcher)
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  // Add custom headers for debugging (optional, can be removed in production)
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('X-Locale-Source', cookieLocale ? 'cookie' : browserLocale ? 'accept-language' : pathLocale ? 'url' : 'default');
    response.headers.set('X-Locale-Value', finalLocale);
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en|tr)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
