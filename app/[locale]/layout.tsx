import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeConfig, type Locale } from '@/i18n';
import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/metadata';
import ClientLayout from './ClientLayout';
import StructuredData from '@/components/StructuredData';
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';
import {
  WhatsAppButtonWrapper,
  GoogleTranslateWidgetWrapper,
  MachineTranslationBadgeWrapper,
} from '@/components/LazyComponents';
import PWAInit from '@/components/PWAInit';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getPageMetadata('home', locale);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ar': '/ar',
        'en': '/en',
        'tr': '/tr',
        'x-default': '/ar',
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/${locale}`,
      siteName: 'MSADDI EST.',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
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

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const config = localeConfig[locale as Locale];

  return (
    <html lang={locale} dir={config.dir}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#2196F3" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MSADDI" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#2196F3" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <StructuredData />
        <AnalyticsProvider />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <PWAInit />
        <ClientLayout direction={config.dir}>
          <NextIntlClientProvider messages={messages}>
            <MachineTranslationBadgeWrapper />
            {children}
            <WhatsAppButtonWrapper />
            <GoogleTranslateWidgetWrapper enabledByDefault={false} />
            <PWAInstallPrompt />
          </NextIntlClientProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
