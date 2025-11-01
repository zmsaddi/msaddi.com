import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeConfig, type Locale } from '@/i18n';

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale: locale as Locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.msaddi.com'
    ),
    title: {
      default: t('company_name'),
      template: `%s | ${t('company_name')}`,
    },
    description: t('slogan'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const config = localeConfig[locale as Locale];

  let fontClassName: string;
  let fontStyle:
    | {
        fontFeatureSettings: string;
        fontVariantNumeric: string;
      }
    | undefined;

  if (locale === 'ar') {
    const { cairo } = await import('./fonts-arabic');
    fontClassName = `${cairo.variable} font-cairo`;
    fontStyle = {
      fontFeatureSettings: '"numr" 0',
      fontVariantNumeric: 'lining-nums',
    };
  } else {
    const { geistSans, geistMono } = await import('./fonts-latin');
    fontClassName = `${geistSans.variable} ${geistMono.variable} font-sans`;
    fontStyle = undefined;
  }

  return (
    <div
      lang={locale}
      dir={config.dir}
      className={`${fontClassName} antialiased min-h-screen`}
      style={fontStyle}
    >
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
