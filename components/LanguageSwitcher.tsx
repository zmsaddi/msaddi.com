'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeConfig } from '@/i18n';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const getLocalizedPath = (newLocale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${newLocale}`);
  };

  const handleLocaleChange = (newLocale: string) => {
    // Update cookie before navigation
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;

    // Navigate to new locale
    router.push(getLocalizedPath(newLocale));
  };

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`px-3 py-1 rounded ${
            locale === currentLocale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {localeConfig[locale].name}
        </button>
      ))}
    </div>
  );
}
