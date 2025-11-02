import Script from "next/script";
import { seoConfig, generateBreadcrumbData, generateFAQData } from "@/config/seo";

interface StructuredDataProps {
  page: "home" | "services" | "about" | "contact";
  locale: string;
}

export function StructuredData({ page, locale }: StructuredDataProps) {
  // Organization structured data (appears on all pages)
  const organizationData = seoConfig.structuredData.organization;

  // Local business data (appears on home and contact pages)
  const localBusinessData = seoConfig.structuredData.localBusiness;

  // Services data (appears on services page)
  const servicesData = seoConfig.structuredData.services;

  // Breadcrumb data
  const breadcrumbPaths = {
    home: [],
    services: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" }
    ],
    about: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" }
    ],
    contact: [
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" }
    ]
  };

  const breadcrumbData = breadcrumbPaths[page].length > 0
    ? generateBreadcrumbData(breadcrumbPaths[page], locale)
    : null;

  // FAQ data (appears on home page)
  const faqData = page === "home" ? generateFAQData() : null;

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