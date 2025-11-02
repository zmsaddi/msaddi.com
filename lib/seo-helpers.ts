/**
 * SEO Helper Functions
 *
 * Provides utility functions for consistent SEO metadata generation
 * including alternates, canonical URLs, and schema.org markup
 */

import { locales } from "@/config/locales";

/**
 * The canonical base URL for the site
 * Always use this for schema.org, Open Graph, and other metadata
 */
export const SITE_URL = "https://www.msaddi.com";

/**
 * Generate language alternates for a given path
 * Includes all supported locales + x-default
 *
 * @param path - The path without locale (e.g., "/services/laser-cutting")
 * @param currentLocale - The current locale (optional, for canonical URL)
 * @returns Object with canonical and languages alternates
 */
export function generateAlternates(path: string, currentLocale?: string) {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  // Generate alternate links for all locales
  const languages = [...locales].reduce((acc, lang) => {
    acc[lang] = `${SITE_URL}/${lang}/${cleanPath}`;
    return acc;
  }, {} as Record<string, string>);

  // Add x-default pointing to English version
  languages['x-default'] = `${SITE_URL}/en/${cleanPath}`;

  return {
    canonical: currentLocale ? `${SITE_URL}/${currentLocale}/${cleanPath}` : undefined,
    languages,
  };
}

/**
 * Generate full URL for a given path and locale
 *
 * @param locale - The locale code
 * @param path - The path without locale (e.g., "/services/laser-cutting")
 * @returns Full URL with SITE_URL
 */
export function getFullUrl(locale: string, path: string): string {
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${SITE_URL}/${locale}/${cleanPath}`;
}

/**
 * Generate schema.org IDs consistently
 *
 * @param path - The path for the ID (e.g., "/services/laser-cutting")
 * @returns Full schema.org @id URL
 */
export function getSchemaId(path: string): string {
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `${SITE_URL}/${cleanPath}`;
}

/**
 * Get organization schema.org @id
 * Always use this for referencing the organization in schema markup
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Get organization logo URL
 */
export const LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Generate full image URL
 *
 * @param imagePath - Path to image (e.g., "/images/demo/service.webp")
 * @returns Full image URL with SITE_URL
 */
export function getImageUrl(imagePath: string): string {
  const cleanPath = imagePath.startsWith("/") ? imagePath.substring(1) : imagePath;
  return `${SITE_URL}/${cleanPath}`;
}
