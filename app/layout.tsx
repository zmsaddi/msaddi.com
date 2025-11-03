import type { Metadata } from "next";
import { Inter, Cairo, Tajawal } from "next/font/google";
import "./globals.css";

// ⚡ PERFORMANCE: Optimized Font Loading
// Only load weights that are actually used to reduce bundle size

// Material Design 3 Typography - English
const inter = Inter({
  weight: ["400", "600", "700"], // Reduced from 4 to 3 weights (removed 500)
  subsets: ["latin"],
  display: "swap", // Prevent FOIT (Flash of Invisible Text)
  variable: "--font-inter",
  preload: true, // Preload critical font
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

// Material Design 3 Typography - Arabic (Headers)
const cairo = Cairo({
  weight: ["600", "700"], // Reduced from 4 to 2 weights (only bold for headers)
  subsets: ["arabic"], // Removed "latin" subset (not needed)
  display: "swap",
  variable: "--font-cairo",
  preload: false, // ⚡ Conditional preload via locale layout for Arabic pages only
  fallback: ['Tajawal', 'Arial', 'sans-serif'],
  adjustFontFallback: false, // Disable for better performance
});

// Material Design 3 Typography - Arabic (Body)
const tajawal = Tajawal({
  weight: ["400", "700"], // Reduced from 3 to 2 weights (removed 500)
  subsets: ["arabic"], // Removed "latin" subset
  display: "swap",
  variable: "--font-tajawal",
  preload: false, // ⚡ Conditional preload via locale layout for Arabic pages only
  fallback: ['Arial', 'sans-serif'],
  adjustFontFallback: false, // Disable for better performance
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
      <head>
        {/* ⚡ Performance: Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* ⚡ Performance: Preload Critical Assets */}
        <link
          rel="preload"
          href="/logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
      </head>
      <body className="font-inter antialiased min-h-screen flex flex-col bg-surface-light">{children}</body>
    </html>
  );
}