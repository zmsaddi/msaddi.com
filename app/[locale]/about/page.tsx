import { AboutHero } from "@/components/sections/about/about-hero";
import { MissionVision } from "@/components/sections/about/mission-vision";
import { ValuesSection } from "@/components/sections/about/values-section";
import { Timeline } from "@/components/sections/about/timeline";
import { ExpertiseSection } from "@/components/sections/about/expertise-section";
import { AboutCTA } from "@/components/sections/about/about-cta";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

interface AboutPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: AboutPageProps) {
  return generatePageMetadata({
    page: "about",
    locale: params.locale,
    path: `/${params.locale}/about`,
  });
}

export default function AboutPage({ params }: AboutPageProps) {
  return (
    <>
      <StructuredData page="about" locale={params.locale} />
      <AboutHero />
      <MissionVision />
      <ValuesSection />
      <Timeline />
      <ExpertiseSection />
      <AboutCTA />
    </>
  );
}