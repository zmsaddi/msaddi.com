import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceDetailHero } from "@/components/sections/services/service-detail-hero";
import { ServiceDetailFeatures } from "@/components/sections/services/service-detail-features";
import { ServiceDetailSpecs } from "@/components/sections/services/service-detail-specs";
import { ServiceDetailProcess } from "@/components/sections/services/service-detail-process";
import { ServiceDetailGallery } from "@/components/sections/services/service-detail-gallery";
import { ServiceDetailCTA } from "@/components/sections/services/service-detail-cta";

interface CNCBendingPageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: CNCBendingPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "services-details.cncBending.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/services/cnc-bending`,
      languages: {
        en: "/en/services/cnc-bending",
        ar: "/ar/services/cnc-bending",
        tr: "/tr/services/cnc-bending",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}/services/cnc-bending`,
      siteName: "MSADDI.EST",
      locale: locale,
      type: "website",
      images: [
        {
          url: "/images/demo/service-cnc-bending-demo.webp",
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
      images: ["/images/demo/service-cnc-bending-demo.webp"],
    },
  };
}

export default async function CNCBendingPage({
  params: { locale },
}: CNCBendingPageProps) {
  const t = await getTranslations({
    locale,
    namespace: "services-details.cncBending",
  });

  const tContact = await getTranslations({
    locale,
    namespace: "contact.info",
  });

  // Schema.org Service markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://msaddi.com/${locale}/services/cnc-bending`,
    name: t("hero.title"),
    description: t("hero.description"),
    provider: {
      "@type": "Organization",
      "@id": "https://msaddi.com/#organization",
      name: "MSADDI.EST",
      url: "https://msaddi.com",
      logo: "https://msaddi.com/logo.png",
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
    serviceType: "CNC Bending Services",
    areaServed: {
      "@type": "Country",
      name: "Syria",
    },
    category: "Metal Fabrication",
    image: "https://msaddi.com/images/demo/service-cnc-bending-demo.webp",
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Page Sections */}
      <ServiceDetailHero serviceKey="cncBending" />
      <ServiceDetailFeatures serviceKey="cncBending" />
      <ServiceDetailSpecs serviceKey="cncBending" />
      <ServiceDetailProcess serviceKey="cncBending" />
      <ServiceDetailGallery serviceKey="cncBending" />
      <ServiceDetailCTA serviceKey="cncBending" />
    </>
  );
}
