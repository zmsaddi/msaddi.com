import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.msaddi.com'),
  title: {
    default: 'MSADDI EST. - Precision Metal Fabrication | Laser Cutting, Bending & Metal Spinning in Syria',
    template: '%s | MSADDI EST.',
  },
  description: 'Professional sheet metal fabrication services in Aleppo, Syria. Specialized in laser cutting (±0.127mm precision), CNC bending (±0.5° accuracy), and metal spinning. ISO-standard quality for stainless steel, aluminum, carbon steel fabrication.',
  keywords: [
    'metal fabrication Syria',
    'laser cutting Aleppo',
    'sheet metal fabrication Syria',
    'CNC bending services',
    'metal spinning Syria',
    'precision laser cutting',
    'stainless steel fabrication',
    'aluminum fabrication Syria',
    'industrial metal cutting Aleppo',
    'metal forming services',
    'custom metal fabrication',
    'MSADDI metal',
    'Alshqaeef industrial zone',
    'Syrian metal industry',
    'fiber laser cutting Syria',
    'CNC press brake bending',
    'cylindrical metal forming',
    'prototype fabrication Syria',
    'volume metal production',
    'ISO metal standards Syria',
  ],
  authors: [{ name: 'MSADDI EST.' }],
  creator: 'MSADDI EST.',
  publisher: 'MSADDI EST.',
  applicationName: 'MSADDI Metal Fabrication',
  category: 'Industrial Manufacturing',
  classification: 'Sheet Metal Fabrication Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SY', 'tr_TR'],
    siteName: 'MSADDI EST.',
    title: 'MSADDI EST. - Precision Metal Fabrication in Aleppo, Syria',
    description: 'Advanced laser cutting, CNC bending, and metal spinning services. High-precision sheet metal fabrication with international quality standards.',
    url: 'https://www.msaddi.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MSADDI EST. - Metal Fabrication Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@msaddi',
    creator: '@msaddi',
    title: 'MSADDI EST. - Precision Metal Fabrication',
    description: 'Laser cutting, CNC bending & metal spinning services in Syria',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.msaddi.com',
    languages: {
      'en': 'https://www.msaddi.com/en',
      'ar': 'https://www.msaddi.com/ar',
      'tr': 'https://www.msaddi.com/tr',
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
