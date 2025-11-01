import { getPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getPageMetadata('contact', locale);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'ar': '/ar/contact',
        'en': '/en/contact',
        'tr': '/tr/contact',
        'x-default': '/ar/contact',
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/${locale}/contact`,
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
