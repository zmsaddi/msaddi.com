import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

/**
 * Active Locales - Visible in language switcher
 */
export const activeLocales = ['ar', 'en', 'tr'] as const;

/**
 * Hidden Locales - Available but not advertised (Phase 2 preparation)
 * Can be accessed directly via URL but won't appear in language switcher
 */
export const hiddenLocales = ['fr', 'de', 'nl', 'zh', 'ru'] as const;

/**
 * All supported locales (active + hidden)
 */
export const locales = [...activeLocales, ...hiddenLocales] as const;

export type Locale = (typeof locales)[number];
export type ActiveLocale = (typeof activeLocales)[number];
export type HiddenLocale = (typeof hiddenLocales)[number];

export const defaultLocale: Locale = 'ar';

/**
 * Locale Configuration
 * Includes both active and hidden locales
 */
export const localeConfig = {
  // Active Locales
  ar: {
    name: 'العربية',
    dir: 'rtl',
    active: true,
  },
  en: {
    name: 'English',
    dir: 'ltr',
    active: true,
  },
  tr: {
    name: 'Türkçe',
    dir: 'ltr',
    active: true,
  },

  // Hidden Locales (Phase 2 - Ready but not advertised)
  fr: {
    name: 'Français',
    dir: 'ltr',
    active: false,
  },
  de: {
    name: 'Deutsch',
    dir: 'ltr',
    active: false,
  },
  nl: {
    name: 'Nederlands',
    dir: 'ltr',
    active: false,
  },
  zh: {
    name: '中文',
    dir: 'ltr',
    active: false,
  },
  ru: {
    name: 'Русский',
    dir: 'ltr',
    active: false,
  },
} as const;

/**
 * Check if a locale is active (visible in switcher)
 */
export function isActiveLocale(locale: string): locale is ActiveLocale {
  return activeLocales.includes(locale as ActiveLocale);
}

/**
 * Check if a locale is hidden (accessible but not advertised)
 */
export function isHiddenLocale(locale: string): locale is HiddenLocale {
  return hiddenLocales.includes(locale as HiddenLocale);
}

/**
 * Get only active locales for language switcher
 */
export function getActiveLocales(): readonly ActiveLocale[] {
  return activeLocales;
}

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
