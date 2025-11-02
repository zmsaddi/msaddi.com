import { Metadata } from "next";
import { seoConfig, getKeywordsForPage } from "@/config/seo";

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  path: string;
  locale: string;
  page: "home" | "services" | "about" | "contact";
}

export function generatePageMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  page,
}: GenerateMetadataProps): Metadata {
  const baseUrl = "https://www.msaddi.com";
  const url = `${baseUrl}${path}`;

  // Get SEO config values
  const seoTitle = title || seoConfig.titleTemplates[locale as keyof typeof seoConfig.titleTemplates]?.[page] || seoConfig.titleTemplates.en[page];
  const seoDescription = description || seoConfig.metaDescriptions[locale as keyof typeof seoConfig.metaDescriptions]?.[page] || seoConfig.metaDescriptions.en[page];
  const seoKeywords = keywords || getKeywordsForPage(page, locale);

  // Generate alternate languages
  const languages = ["en", "ar", "tr"];
  const alternates = {
    canonical: url,
    languages: languages.reduce((acc, lang) => {
      const pagePath = path.replace(`/${locale}`, `/${lang}`);
      acc[lang] = `${baseUrl}${pagePath}`;
      return acc;
    }, {} as Record<string, string>)
  };

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords.join(", "),
    authors: [{ name: "MSADDI.EST" }],
    creator: "MSADDI.EST",
    publisher: "MSADDI.EST",
    metadataBase: new URL(baseUrl),
    alternates,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: url,
      siteName: "MSADDI.EST",
      locale: locale === "ar" ? "ar_SY" : locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "MSADDI.EST - Sheet Metal Fabrication",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "verification-code-here",
      yandex: "verification-code-here",
    },
  };
}