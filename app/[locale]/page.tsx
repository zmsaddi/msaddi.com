import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/home/hero-section";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

// ⚡ PERFORMANCE: Lazy load below-the-fold sections
// These components are not visible on initial page load, so we can defer their loading
// This reduces initial bundle size and improves FCP/LCP metrics
const AboutSection = dynamic(
  () => import("@/components/sections/home/about-section").then(mod => ({ default: mod.AboutSection })),
  { ssr: true }
);

const ServicesSection = dynamic(
  () => import("@/components/sections/home/services-section").then(mod => ({ default: mod.ServicesSection })),
  { ssr: true }
);

const CapabilitiesSection = dynamic(
  () => import("@/components/sections/home/capabilities-section").then(mod => ({ default: mod.CapabilitiesSection })),
  { ssr: true }
);

const CTASection = dynamic(
  () => import("@/components/sections/home/cta-section").then(mod => ({ default: mod.CTASection })),
  { ssr: true }
);

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: HomePageProps) {
  return generatePageMetadata({
    page: "home",
    locale: params.locale,
    path: `/${params.locale}`,
  });
}

export default function HomePage({ params }: HomePageProps) {
  return (
    <>
      <StructuredData page="home" locale={params.locale} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CapabilitiesSection />
      <CTASection />
    </>
  );
}