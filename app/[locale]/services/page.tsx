import dynamic from "next/dynamic";
import { ServiceHero } from "@/components/sections/services/service-hero";
import { ServiceGrid } from "@/components/sections/services/service-grid";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

// ⚡ PERFORMANCE: Lazy load below-the-fold sections
const IndustriesSection = dynamic(
  () => import("@/components/sections/services/industries-section").then(mod => ({ default: mod.IndustriesSection })),
  { ssr: true }
);

const ServiceCTA = dynamic(
  () => import("@/components/sections/services/service-cta").then(mod => ({ default: mod.ServiceCTA })),
  { ssr: true }
);

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