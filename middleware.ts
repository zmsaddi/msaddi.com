import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/config/locales';

export default createMiddleware({
  locales: [...locales], // Convert readonly array to mutable array for next-intl
  defaultLocale,
  localePrefix: 'always',
  // ⚡ AUTO-DETECT: Browser language detection enabled
  // Detects user's preferred language from Accept-Language header
  // Falls back to 'en' if browser language is not supported
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};