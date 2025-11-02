import { HeroSection } from "@/components/sections/home/hero-section";
import { AboutSection } from "@/components/sections/home/about-section";
import { ServicesSection } from "@/components/sections/home/services-section";
import { CapabilitiesSection } from "@/components/sections/home/capabilities-section";
import { CTASection } from "@/components/sections/home/cta-section";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

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