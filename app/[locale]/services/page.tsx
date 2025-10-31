import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const services = [
    {
      icon: '💻',
      title: t('service_1_title'),
      description: t('service_1_desc'),
      color: 'blue',
    },
    {
      icon: '📱',
      title: t('service_2_title'),
      description: t('service_2_desc'),
      color: 'green',
    },
    {
      icon: '🔄',
      title: t('service_3_title'),
      description: t('service_3_desc'),
      color: 'purple',
    },
    {
      icon: '📈',
      title: t('service_4_title'),
      description: t('service_4_desc'),
      color: 'red',
    },
    {
      icon: '🎯',
      title: t('service_5_title'),
      description: t('service_5_desc'),
      color: 'yellow',
    },
    {
      icon: '🛠️',
      title: t('service_6_title'),
      description: t('service_6_desc'),
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      button: 'bg-green-600 hover:bg-green-700',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      button: 'bg-purple-600 hover:bg-purple-700',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      button: 'bg-red-600 hover:bg-red-700',
    },
    yellow: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      button: 'bg-amber-600 hover:bg-amber-700',
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      border: 'border-indigo-200 dark:border-indigo-800',
      button: 'bg-indigo-600 hover:bg-indigo-700',
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('page_title')}
              </h1>
              <p className="text-xl text-blue-100">{t('page_description')}</p>
            </div>
          </div>
        </section>

        {/* Services Content */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Introduction */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
                {t('intro_title')}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {t('intro_text')}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const colors = colorClasses[service.color as keyof typeof colorClasses];
                return (
                  <div
                    key={index}
                    className={`${colors.bg} border ${colors.border} p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Link
                      href={`/${locale}/contact`}
                      className={`inline-block ${colors.button} text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                    >
                      {tCommon('learn_more')}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-12 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
                {tCommon('get_started')}
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 max-w-2xl mx-auto">
                {tCommon('slogan')}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                {tCommon('contact_us')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
