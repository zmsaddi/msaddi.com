'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { localeConfig, type Locale } from '@/i18n';
import { useState, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Get the current path without locale
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    startTransition(() => {
      router.push(newPath);
      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
        aria-label="Select language"
      >
        <span className="text-xl">{localeConfig[locale].flag}</span>
        <span className="font-medium">{localeConfig[locale].name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute top-full mt-2 right-0 ltr:right-0 rtl:left-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50 min-w-[160px]">
            {(Object.keys(localeConfig) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                disabled={isPending}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors
                  ${
                    loc === locale
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-zinc-700 dark:text-zinc-300'
                  }
                  disabled:opacity-50
                `}
              >
                <span className="text-xl">{localeConfig[loc].flag}</span>
                <span className="font-medium">{localeConfig[loc].name}</span>
                {loc === locale && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
