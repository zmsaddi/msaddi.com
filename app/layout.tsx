import type { Metadata } from "next";
import { Inter, Cairo, Tajawal } from "next/font/google";
import "./globals.css";

// Material Design 3 Typography - English
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Material Design 3 Typography - Arabic (Headers)
const cairo = Cairo({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
});

// Material Design 3 Typography - Arabic (Body)
const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.msaddi.com"),
  title: {
    default: "MSADDI.EST - Metal Fabrication Syria | Laser Cutting Services Aleppo",
    template: "%s | MSADDI.EST Metal Fabrication",
  },
  description: "MSADDI.EST - Leading metal fabrication company in Syria. Professional laser cutting up to 40mm, CNC bending 135T/3200mm, custom sheet metal solutions. 30+ years serving construction, automotive & industrial sectors in Aleppo.",
  keywords: ["sheet metal fabrication Syria", "laser cutting services Aleppo", "metal fabrication Syria", "CNC bending", "laser cutting 40mm", "6000x2500mm laser cutting", "135T press brake", "industrial metal fabrication", "stainless steel cutting", "aluminum fabrication", "flanging dishing Syria", "tank head manufacturing", "custom metal parts", "MSADDI Aleppo"],
  authors: [{ name: "MSADDI.EST" }],
  creator: "MSADDI.EST",
  publisher: "MSADDI.EST",
  alternates: {
    canonical: "https://www.msaddi.com",
    languages: {
      'en': 'https://www.msaddi.com/en',
      'ar': 'https://www.msaddi.com/ar',
      'tr': 'https://www.msaddi.com/tr',
      'fr': 'https://www.msaddi.com/fr',
      'de': 'https://www.msaddi.com/de',
      'es': 'https://www.msaddi.com/es',
      'it': 'https://www.msaddi.com/it',
      'pt': 'https://www.msaddi.com/pt',
      'nl': 'https://www.msaddi.com/nl',
      'x-default': 'https://www.msaddi.com/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.msaddi.com",
    siteName: "MSADDI.EST Metal Fabrication",
    title: "MSADDI.EST - Metal Fabrication Syria | Laser Cutting Services",
    description: "Professional metal fabrication in Syria. Laser cutting up to 40mm, CNC bending 135T/3200mm, custom sheet metal solutions. Serving Aleppo & Middle East since 1994.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MSADDI.EST - Metal Fabrication & Laser Cutting Services Syria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSADDI.EST - Metal Fabrication Syria | Laser Cutting Services",
    description: "Professional metal fabrication in Syria. Laser cutting up to 40mm, CNC bending 135T/3200mm, custom sheet metal solutions. Serving Aleppo & Middle East since 1994.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${cairo.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter antialiased min-h-screen flex flex-col bg-surface-light">{children}</body>
    </html>
  );
}