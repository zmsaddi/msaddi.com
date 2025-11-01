import { getPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getPageMetadata('about', locale);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        'ar': '/ar/about',
        'en': '/en/about',
        'tr': '/tr/about',
        'x-default': '/ar/about',
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/${locale}/about`,
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
