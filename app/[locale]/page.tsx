import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{t('home.hero_title')}</h1>
            <p className="text-2xl mb-4">{t('home.hero_subtitle')}</p>
            <p className="text-lg mb-8">{t('home.hero_description')}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href={`/contact`}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
              >
                {t('common.get_started')}
              </Link>
              <Link
                href={`/services`}
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 border-2 border-white"
              >
                {t('common.learn_more')}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">{t('home.why_us_title')}</h2>
            <p className="text-center text-gray-600 mb-12">{t('home.why_us_subtitle')}</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">{t(`home.feature_${i}_title`)}</h3>
                  <p className="text-gray-600">{t(`home.feature_${i}_desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">{t('home.cta_title')}</h2>
            <p className="text-xl mb-8">{t('home.cta_description')}</p>
            <Link
              href={`/contact`}
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
            >
              {t('common.contact_us')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
