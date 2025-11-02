import Script from "next/script";
import { getTranslations } from "next-intl/server";
import { seoConfig, generateBreadcrumbData, generateFAQData } from "@/config/seo";

interface StructuredDataProps {
  page: "home" | "services" | "about" | "contact";
  locale: string;
}

export async function StructuredData({ page, locale }: StructuredDataProps) {
  const tNav = await getTranslations({ locale, namespace: "common.nav" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });

  // Organization structured data (appears on all pages)
  const organizationData = seoConfig.structuredData.organization;

  // Local business data (appears on home and contact pages)
  const localBusinessData = seoConfig.structuredData.localBusiness;

  // Services data (appears on services page)
  const servicesData = seoConfig.structuredData.services;

  // Breadcrumb data - using translated navigation labels
  const breadcrumbPaths = {
    home: [],
    services: [
      { name: tNav("home"), url: "/" },
      { name: tNav("services"), url: "/services" }
    ],
    about: [
      { name: tNav("home"), url: "/" },
      { name: tNav("about"), url: "/about" }
    ],
    contact: [
      { name: tNav("home"), url: "/" },
      { name: tNav("contact"), url: "/contact" }
    ]
  };

  const breadcrumbData = breadcrumbPaths[page].length > 0
    ? generateBreadcrumbData(breadcrumbPaths[page], locale)
    : null;

  // FAQ data (appears on home page) - using translated FAQ content
  const faqData = page === "home" ? generateFAQData(
    Array.from({ length: 7 }, (_, i) => ({
      question: tSeo(`faq.items.${i}.question`),
      answer: tSeo(`faq.items.${i}.answer`)
    }))
  ) : null;

  // Combine all structured data
  const structuredDataArray = [
    organizationData,
    page === "home" || page === "contact" ? localBusinessData : null,
    page === "services" ? servicesData : null,
    breadcrumbData,
    faqData
  ].filter(Boolean);

  return (
    <>
      {structuredDataArray.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}