import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceDetailHero } from "@/components/sections/services/service-detail-hero";
import { ServiceDetailFeatures } from "@/components/sections/services/service-detail-features";
import { ServiceDetailSpecs } from "@/components/sections/services/service-detail-specs";
import { ServiceDetailProcess } from "@/components/sections/services/service-detail-process";
import { ServiceDetailGallery } from "@/components/sections/services/service-detail-gallery";
import { ServiceDetailCTA } from "@/components/sections/services/service-detail-cta";
import { generateAlternates, getFullUrl, getSchemaId, ORGANIZATION_ID, LOGO_URL, SITE_URL, getImageUrl } from "@/lib/seo-helpers";

interface CustomFabricationPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: CustomFabricationPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "services-details.customFabrication.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: generateAlternates("services/custom-fabrication", locale),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: getFullUrl(locale, "services/custom-fabrication"),
      siteName: "MSADDI.EST",
      locale: locale,
      type: "website",
      images: [
        {
          url: getImageUrl("/images/demo/service-custom-fabrication-demo.webp"),
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [getImageUrl("/images/demo/service-custom-fabrication-demo.webp")],
    },
  };
}

export default async function CustomFabricationPage({
  params: { locale },
}: CustomFabricationPageProps) {
  const t = await getTranslations({
    locale,
    namespace: "services-details.customFabrication",
  });

  const tContact = await getTranslations({
    locale,
    namespace: "contact.info",
  });

  // Schema.org Service markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": getSchemaId(`${locale}/services/custom-fabrication`),
    name: t("hero.title"),
    description: t("hero.description"),
    provider: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "MSADDI.EST",
      url: SITE_URL,
      logo: LOGO_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aleppo",
        addressRegion: "Aleppo Governorate",
        addressCountry: "SY",
        streetAddress: "Al-Shaqeef Industrial Zone",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: tContact("items.phone.value"),
        email: tContact("items.email.value"),
        contactType: "Customer Service",
        availableLanguage: ["English", "Arabic", "Turkish"],
      },
    },
    serviceType: "Custom Metal Fabrication Services",
    areaServed: {
      "@type": "Country",
      name: "Syria",
    },
    category: "Metal Fabrication",
    image: getImageUrl("/images/demo/service-custom-fabrication-demo.webp"),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Page Sections */}
      <ServiceDetailHero serviceKey="customFabrication" />
      <ServiceDetailFeatures serviceKey="customFabrication" />
      <ServiceDetailSpecs serviceKey="customFabrication" />
      <ServiceDetailProcess serviceKey="customFabrication" />
      <ServiceDetailGallery serviceKey="customFabrication" />
      <ServiceDetailCTA serviceKey="customFabrication" />
    </>
  );
}
