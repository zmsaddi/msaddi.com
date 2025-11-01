import { getPageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = getPageMetadata('products', locale);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `/${locale}/products`,
      languages: {
        'ar': '/ar/products',
        'en': '/en/products',
        'tr': '/tr/products',
        'x-default': '/ar/products',
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/${locale}/products`,
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

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
