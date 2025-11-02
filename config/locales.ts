/**
 * Unified locale configuration for the entire application
 * This file is the single source of truth for all language settings
 *
 * Import from this file in:
 * - middleware.ts
 * - app/[locale]/layout.tsx
 * - types/index.ts
 * - i18n/request.ts
 * - Any SEO or sitemap generation code
 */

// Main visible languages shown in the navigation
export const mainLocales = ['en', 'ar', 'tr'] as const;

// SEO-only languages (not shown in navigation but accessible via direct URL)
export const seoLocales = ['fr', 'de', 'es', 'it', 'pt', 'nl'] as const;

// All supported languages (main + SEO)
export const locales = [...mainLocales, ...seoLocales] as const;

// TypeScript type for locales
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Language display names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  tr: 'Türkçe',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
};

// RTL languages
export const rtlLocales: readonly Locale[] = ['ar'] as const;

/**
 * Check if a locale is RTL
 */
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

/**
 * Check if a locale is a main/visible locale
 */
export function isMainLocale(locale: string): locale is typeof mainLocales[number] {
  return mainLocales.includes(locale as any);
}

/**
 * Check if a locale is an SEO-only locale
 */
export function isSEOLocale(locale: string): locale is typeof seoLocales[number] {
  return seoLocales.includes(locale as any);
}

/**
 * Validate if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
