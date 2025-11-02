import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Main visible languages in the navigation
export const mainLocales = ['en', 'ar', 'tr'] as const;

// All supported languages including SEO silent pages
export const locales = ['en', 'ar', 'tr', 'fr', 'de', 'es', 'it', 'pt', 'nl'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// SEO-only languages (not shown in navigation)
export const seoLocales = ['fr', 'de', 'es', 'it', 'pt', 'nl'] as const;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  // Import all translation files
  const [common, home, services, about, contact, privacy, terms] = await Promise.all([
    import(`../locales/${locale}/common.json`),
    import(`../locales/${locale}/home.json`),
    import(`../locales/${locale}/services.json`),
    import(`../locales/${locale}/about.json`),
    import(`../locales/${locale}/contact.json`),
    import(`../locales/${locale}/privacy.json`),
    import(`../locales/${locale}/terms.json`),
  ]);

  // Merge all translations with proper namespacing to support both flat and nested access
  const messages = {
    // Common translations at root level
    ...common.default,
    // Home translations at root level (for HeroSection, AboutSection, etc.)
    ...home.default,
    // Also include home as a nested namespace (for ServicesSection, CTASection)
    home: home.default,
    // Page-specific content
    services: services.default,
    about: about.default,
    contact: contact.default,
    privacy: privacy.default,
    terms: terms.default,
  };

  return {
    messages,
  };
});