import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.msaddi.com'),
  title: {
    default: 'Msaddi - Your Trusted Partner for Success',
    template: '%s | Msaddi',
  },
  description: 'Leading company providing integrated business solutions across the Middle East. Expert consulting, digital marketing, and business development services.',
  keywords: ['business consulting', 'digital marketing', 'business development', 'Middle East', 'Saudi Arabia', 'professional services'],
  authors: [{ name: 'Msaddi' }],
  creator: 'Msaddi',
  publisher: 'Msaddi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_SA', 'tr_TR'],
    siteName: 'Msaddi',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@msaddi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
