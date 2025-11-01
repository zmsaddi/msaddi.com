'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, localeConfig } from '@/i18n';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const getLocalizedPath = (newLocale: string) => {
    return pathname.replace(`/${currentLocale}`, `/${newLocale}`);
  };

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className={`px-3 py-1 rounded ${
            locale === currentLocale
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {localeConfig[locale].name}
        </Link>
      ))}
    </div>
  );
}
