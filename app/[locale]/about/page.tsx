import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('page_title'),
    description: t('page_description'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

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

        {/* About Content */}
        <section className="py-20 bg-white dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">
                  {t('intro_title')}
                </h2>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {t('intro_text')}
                </p>
              </div>

              {/* Vision & Mission */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('mission_title')}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {t('mission_text')}
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('vision_title')}
                  </h3>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {t('vision_text')}
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-white text-center">
                  {tCommon('company_name')} - {tCommon('slogan')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: '✨', title: 'Excellence', desc: 'We strive for excellence in everything we do' },
                    { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships with our clients' },
                    { icon: '🔒', title: 'Security', desc: 'Your data security is our top priority' },
                  ].map((value, index) => (
                    <div
                      key={index}
                      className="text-center p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
                    >
                      <div className="text-4xl mb-3">{value.icon}</div>
                      <h4 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                        {value.title}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        {value.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
