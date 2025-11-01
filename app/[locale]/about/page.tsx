import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl">{t('subtitle')}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">
              {t('description')}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-gray-50 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">{t('mission_title')}</h2>
                <p className="text-gray-700">{t('mission_description')}</p>
              </div>

              <div className="p-8 bg-gray-50 rounded-lg">
                <h2 className="text-3xl font-bold mb-4">{t('vision_title')}</h2>
                <p className="text-gray-700">{t('vision_description')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
