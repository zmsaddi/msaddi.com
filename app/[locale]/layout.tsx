import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Cairo } from 'next/font/google';
import { locales, localeConfig, type Locale } from '@/i18n';
import '../globals.css';

// Latin fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

// Arabic font with Latin numerals support
const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

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

  return (
    <html
      lang={locale}
      dir={config.dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable}`}
      style={
        locale === 'ar'
          ? {
              fontFeatureSettings: '"numr" 0',
              fontVariantNumeric: 'lining-nums',
            }
          : undefined
      }
      suppressHydrationWarning
    >
      <body
        className={`
          ${locale === 'ar' ? 'font-cairo' : 'font-sans'}
          antialiased
        `}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
