import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`../locales/${locale}/common.json`)).default,
    ...(await import(`../locales/${locale}/home.json`)).default,
    ...(await import(`../locales/${locale}/services.json`)).default,
    ...(await import(`../locales/${locale}/about.json`)).default,
    ...(await import(`../locales/${locale}/contact.json`)).default,
  };

  return {
    messages,
  };
});