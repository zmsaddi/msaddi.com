import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true, // Enable automatic locale detection
});

export default function middleware(request: NextRequest) {
  // Get browser language preference
  const acceptLanguage = request.headers.get('accept-language');

  // Detect preferred locale from browser
  let detectedLocale = defaultLocale;
  if (acceptLanguage) {
    if (acceptLanguage.includes('ar')) {
      detectedLocale = 'ar';
    } else if (acceptLanguage.includes('tr')) {
      detectedLocale = 'tr';
    } else if (acceptLanguage.includes('en')) {
      detectedLocale = 'en';
    }
  }

  // Store detected locale in cookie for persistence
  const response = intlMiddleware(request);
  if (!request.cookies.get('NEXT_LOCALE')) {
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 31536000, // 1 year
    });
  }

  return response;
}

export const config = {
  matcher: ['/', '/(ar|en|tr)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
