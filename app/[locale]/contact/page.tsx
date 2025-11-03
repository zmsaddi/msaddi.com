import dynamic from "next/dynamic";
import { ContactHero } from "@/components/sections/contact/contact-hero";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactInfo } from "@/components/sections/contact/contact-info";
import { StructuredData } from "@/components/seo/structured-data";
import { generatePageMetadata } from "@/components/seo/seo-meta";

// ⚡ PERFORMANCE: Lazy load Google Maps (heavy component ~30KB)
// Maps are below the fold and contain Google Maps SDK
// Loading dynamically reduces initial bundle size significantly
const MapSection = dynamic(
  () => import("@/components/sections/contact/map-section").then(mod => ({ default: mod.MapSection })),
  {
    ssr: false, // Don't SSR maps (requires browser APIs)
    loading: () => (
      <div className="h-[400px] md:h-[500px] bg-surface-container animate-pulse">
        <div className="h-full flex items-center justify-center">
          <div className="text-text-secondary">Loading map...</div>
        </div>
      </div>
    )
  }
);

interface ContactPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: ContactPageProps) {
  return generatePageMetadata({
    page: "contact",
    locale: params.locale,
    path: `/${params.locale}/contact`,
  });
}

export default function ContactPage({ params }: ContactPageProps) {
  return (
    <>
      <StructuredData page="contact" locale={params.locale} />
      <ContactHero />
      <div className="section-padding bg-surface">
        <div className="container-custom">
          {/* MD3 Two-column layout: Form + Info with 20px/32px gap */}
          <div className="grid lg:grid-cols-3 gap-5 md:gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
      <MapSection />
    </>
  );
}