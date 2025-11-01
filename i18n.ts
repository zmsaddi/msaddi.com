import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['ar', 'en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ar';

export const localeConfig = {
  ar: {
    name: 'العربية',
    dir: 'rtl',
  },
  en: {
    name: 'English',
    dir: 'ltr',
  },
  tr: {
    name: 'Türkçe',
    dir: 'ltr',
  },
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
