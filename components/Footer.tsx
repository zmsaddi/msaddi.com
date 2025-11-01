'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">{t('company_name')}</p>
        <p>{t('slogan')}</p>
        <p className="mt-4 text-sm text-gray-400">
          © {new Date().getFullYear()} {t('company_name')}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
