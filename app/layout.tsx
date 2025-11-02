import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
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
      lang="en"
      className={`${poppins.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}