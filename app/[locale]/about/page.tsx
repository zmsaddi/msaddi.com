import dynamic from "next/dynamic";
import { AboutHero } from "@/components/sections/about/about-hero";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

// ⚡ PERFORMANCE: Lazy load below-the-fold sections
const MissionVision = dynamic(
  () => import("@/components/sections/about/mission-vision").then(mod => ({ default: mod.MissionVision })),
  { ssr: true }
);

const ValuesSection = dynamic(
  () => import("@/components/sections/about/values-section").then(mod => ({ default: mod.ValuesSection })),
  { ssr: true }
);

const Timeline = dynamic(
  () => import("@/components/sections/about/timeline").then(mod => ({ default: mod.Timeline })),
  { ssr: true }
);

const ExpertiseSection = dynamic(
  () => import("@/components/sections/about/expertise-section").then(mod => ({ default: mod.ExpertiseSection })),
  { ssr: true }
);

const AboutCTA = dynamic(
  () => import("@/components/sections/about/about-cta").then(mod => ({ default: mod.AboutCTA })),
  { ssr: true }
);

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