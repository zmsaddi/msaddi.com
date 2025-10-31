import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Locale } from '@/i18n';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const features = [
    {
      title: t('home.feature_1_title'),
      description: t('home.feature_1_desc'),
      icon: '💼',
    },
    {
      title: t('home.feature_2_title'),
      description: t('home.feature_2_desc'),
      icon: '⭐',
    },
    {
      title: t('home.feature_3_title'),
      description: t('home.feature_3_desc'),
      icon: '🛠️',
    },
    {
      title: t('home.feature_4_title'),
      description: t('home.feature_4_desc'),
      icon: '💰',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('home.hero_title')}
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                {t('home.hero_subtitle')}
              </p>
              <p className="text-lg mb-8 text-blue-200">
                {t('home.hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  {t('common.get_started')}
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="inline-block bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-blue-600"
                >
                  {t('common.learn_more')}
                </Link>
              </div>
            </div>
          </div>
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              className="w-full h-12 md:h-16"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                fill="currentColor"
                className="text-white"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                fill="currentColor"
                className="text-white"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                fill="currentColor"
                className="text-white"
              ></path>
            </svg>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">
                {t('home.why_us_title')}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {t('home.why_us_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.cta_title')}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              {t('home.cta_description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t('common.contact_us')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Msaddi',
            url: `https://www.msaddi.com/${locale}`,
            logo: 'https://www.msaddi.com/logo.png',
            description: t('common.slogan'),
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Riyadh',
              addressCountry: 'SA',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Service',
              email: 'info@msaddi.com',
            },
            sameAs: [
              // Add your social media URLs here
            ],
          }),
        }}
      />
    </div>
  );
}
