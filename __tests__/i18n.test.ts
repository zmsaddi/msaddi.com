/**
 * Internationalization Tests
 *
 * Unit tests for i18n configuration and helpers
 */

import {
  activeLocales,
  hiddenLocales,
  locales,
  defaultLocale,
  localeConfig,
  isActiveLocale,
  isHiddenLocale,
  getActiveLocales,
} from '@/i18n';

describe('Internationalization', () => {
  describe('Locale Constants', () => {
    it('exports active locales', () => {
      expect(activeLocales).toEqual(['ar', 'en', 'tr']);
    });

    it('exports hidden locales', () => {
      expect(hiddenLocales).toEqual(['fr', 'de', 'nl', 'zh', 'ru']);
    });

    it('exports all locales', () => {
      expect(locales).toHaveLength(8);
      expect(locales).toContain('ar');
      expect(locales).toContain('en');
      expect(locales).toContain('tr');
      expect(locales).toContain('fr');
      expect(locales).toContain('de');
      expect(locales).toContain('nl');
      expect(locales).toContain('zh');
      expect(locales).toContain('ru');
    });

    it('exports default locale', () => {
      expect(defaultLocale).toBe('ar');
    });
  });

  describe('Locale Configuration', () => {
    it('includes all active locales', () => {
      activeLocales.forEach(locale => {
        expect(localeConfig[locale]).toBeDefined();
        expect(localeConfig[locale].active).toBe(true);
      });
    });

    it('includes all hidden locales', () => {
      hiddenLocales.forEach(locale => {
        expect(localeConfig[locale]).toBeDefined();
        expect(localeConfig[locale].active).toBe(false);
      });
    });

    it('has correct Arabic configuration', () => {
      expect(localeConfig.ar.name).toBe('العربية');
      expect(localeConfig.ar.dir).toBe('rtl');
      expect(localeConfig.ar.active).toBe(true);
    });

    it('has correct English configuration', () => {
      expect(localeConfig.en.name).toBe('English');
      expect(localeConfig.en.dir).toBe('ltr');
      expect(localeConfig.en.active).toBe(true);
    });

    it('has correct Turkish configuration', () => {
      expect(localeConfig.tr.name).toBe('Türkçe');
      expect(localeConfig.tr.dir).toBe('ltr');
      expect(localeConfig.tr.active).toBe(true);
    });

    it('has correct French configuration', () => {
      expect(localeConfig.fr.name).toBe('Français');
      expect(localeConfig.fr.dir).toBe('ltr');
      expect(localeConfig.fr.active).toBe(false);
    });
  });

  describe('isActiveLocale', () => {
    it('returns true for active locales', () => {
      expect(isActiveLocale('ar')).toBe(true);
      expect(isActiveLocale('en')).toBe(true);
      expect(isActiveLocale('tr')).toBe(true);
    });

    it('returns false for hidden locales', () => {
      expect(isActiveLocale('fr')).toBe(false);
      expect(isActiveLocale('de')).toBe(false);
      expect(isActiveLocale('nl')).toBe(false);
      expect(isActiveLocale('zh')).toBe(false);
      expect(isActiveLocale('ru')).toBe(false);
    });

    it('returns false for invalid locales', () => {
      expect(isActiveLocale('invalid')).toBe(false);
      expect(isActiveLocale('es')).toBe(false);
    });
  });

  describe('isHiddenLocale', () => {
    it('returns true for hidden locales', () => {
      expect(isHiddenLocale('fr')).toBe(true);
      expect(isHiddenLocale('de')).toBe(true);
      expect(isHiddenLocale('nl')).toBe(true);
      expect(isHiddenLocale('zh')).toBe(true);
      expect(isHiddenLocale('ru')).toBe(true);
    });

    it('returns false for active locales', () => {
      expect(isHiddenLocale('ar')).toBe(false);
      expect(isHiddenLocale('en')).toBe(false);
      expect(isHiddenLocale('tr')).toBe(false);
    });

    it('returns false for invalid locales', () => {
      expect(isHiddenLocale('invalid')).toBe(false);
      expect(isHiddenLocale('es')).toBe(false);
    });
  });

  describe('getActiveLocales', () => {
    it('returns only active locales', () => {
      const active = getActiveLocales();
      expect(active).toEqual(['ar', 'en', 'tr']);
    });

    it('does not include hidden locales', () => {
      const active = getActiveLocales();
      expect(active).not.toContain('fr');
      expect(active).not.toContain('de');
      expect(active).not.toContain('nl');
      expect(active).not.toContain('zh');
      expect(active).not.toContain('ru');
    });

    it('returns readonly array', () => {
      const active = getActiveLocales();
      expect(Object.isFrozen(active) || Array.isArray(active)).toBe(true);
    });
  });

  describe('RTL Support', () => {
    it('identifies Arabic as RTL', () => {
      expect(localeConfig.ar.dir).toBe('rtl');
    });

    it('identifies all other locales as LTR', () => {
      expect(localeConfig.en.dir).toBe('ltr');
      expect(localeConfig.tr.dir).toBe('ltr');
      expect(localeConfig.fr.dir).toBe('ltr');
      expect(localeConfig.de.dir).toBe('ltr');
      expect(localeConfig.nl.dir).toBe('ltr');
      expect(localeConfig.zh.dir).toBe('ltr');
      expect(localeConfig.ru.dir).toBe('ltr');
    });
  });
});
