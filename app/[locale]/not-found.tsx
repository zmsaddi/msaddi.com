import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Number */}
            <div className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              404
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
              {t('404_title')}
            </h1>

            {/* Description */}
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              {t('404_description')}
            </p>

            {/* Icon */}
            <div className="mb-8">
              <svg
                className="w-32 h-32 mx-auto text-zinc-300 dark:text-zinc-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Back Button */}
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
            >
              {t('go_home')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
