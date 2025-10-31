import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['ar', 'en', 'tr'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'ar';

// Locale configuration
export const localeConfig = {
  ar: {
    name: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    // Use Latin numbers for Arabic (0-9) instead of Hindi numerals (٠-٩)
    useLatinNumbers: true,
  },
  en: {
    name: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
  },
  tr: {
    name: 'Türkçe',
    dir: 'ltr',
    flag: '🇹🇷',
  },
} as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
