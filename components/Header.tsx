'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`} className="text-2xl font-bold text-blue-600">
            {t('company_name')}
          </Link>

          <nav className="flex items-center gap-6">
            <Link href={`/${locale}`} className="hover:text-blue-600">
              {t('home')}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-blue-600">
              {t('about')}
            </Link>
            <Link href={`/${locale}/services`} className="hover:text-blue-600">
              {t('services')}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-blue-600">
              {t('contact')}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
