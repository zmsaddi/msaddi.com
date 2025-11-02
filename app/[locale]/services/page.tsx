import { ServiceHero } from "@/components/sections/services/service-hero";
import { ServiceGrid } from "@/components/sections/services/service-grid";
import { IndustriesSection } from "@/components/sections/services/industries-section";
import { ServiceCTA } from "@/components/sections/services/service-cta";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

interface ServicesPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ServicesPageProps) {
  return generatePageMetadata({
    page: "services",
    locale: params.locale,
    path: `/${params.locale}/services`,
  });
}

export default function ServicesPage({ params }: ServicesPageProps) {
  return (
    <>
      <StructuredData page="services" locale={params.locale} />
      <ServiceHero />
      <ServiceGrid />
      <IndustriesSection />
      <ServiceCTA />
    </>
  );
}