import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales, mainLocales, seoLocales, defaultLocale } from '@/config/locales';
import type { Locale } from '@/config/locales';

// Re-export for backward compatibility
export { locales, mainLocales, seoLocales, defaultLocale };
export type { Locale };

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  // Import all translation files
  const [common, home, services, servicesDetails, about, contact, privacy, terms, seo] = await Promise.all([
    import(`../locales/${locale}/common.json`),
    import(`../locales/${locale}/home.json`),
    import(`../locales/${locale}/services.json`),
    import(`../locales/${locale}/services-details.json`),
    import(`../locales/${locale}/about.json`),
    import(`../locales/${locale}/contact.json`),
    import(`../locales/${locale}/privacy.json`),
    import(`../locales/${locale}/terms.json`),
    import(`../locales/${locale}/seo.json`),
  ]);

  // Merge all translations with proper namespacing to support both flat and nested access
  const messages = {
    // Common translations - keep as namespace AND spread for backward compatibility
    common: common.default,
    ...common.default,
    // Home translations at root level (for HeroSection, AboutSection, etc.)
    ...home.default,
    // Also include home as a nested namespace (for ServicesSection, CTASection)
    home: home.default,
    // Page-specific content
    services: services.default,
    'services-details': servicesDetails.default,
    about: about.default,
    contact: contact.default,
    privacy: privacy.default,
    terms: terms.default,
    seo: seo.default,
  };

  return {
    messages,
  };
});