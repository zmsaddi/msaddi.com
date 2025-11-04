import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/config/locales";

interface TermsPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "terms.page"
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.msaddi.com";
  const currentPath = `${params.locale}/terms`;
  const canonicalUrl = `${baseUrl}/${currentPath}`;

  // Generate hreflang alternates
  const languages = locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}/terms`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en/terms`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "MSADDI.EST",
      locale: params.locale === 'ar' ? 'ar_SY' : params.locale === 'tr' ? 'tr_TR' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "terms"
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.msaddi.com";
  const currentUrl = `${baseUrl}/${params.locale}/terms`;

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${params.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("page.title"),
        "item": currentUrl
      }
    ]
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": currentUrl,
    "url": currentUrl,
    "name": t("page.title"),
    "description": t("page.description"),
    "inLanguage": params.locale,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "MSADDI.EST"
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <main className="pt-32 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold mb-8">
            {t("page.title")}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-metal-gray dark:text-silver-accent mb-8">
              {t("page.lastUpdated")}: {new Date().toLocaleDateString(params.locale)}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.acceptance.title")}
              </h2>
              <p>{t("sections.acceptance.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.services.title")}
              </h2>
              <p>{t("sections.services.content")}</p>
              <ul className="list-disc pl-6 mt-4">
                <li>{t("sections.services.items.laser")}</li>
                <li>{t("sections.services.items.bending")}</li>
                <li>{t("sections.services.items.flanging")}</li>
                <li>{t("sections.services.items.custom")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.ordering.title")}
              </h2>
              <p>{t("sections.ordering.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.pricing.title")}
              </h2>
              <p>{t("sections.pricing.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.warranty.title")}
              </h2>
              <p>{t("sections.warranty.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.liability.title")}
              </h2>
              <p>{t("sections.liability.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.contact.title")}
              </h2>
              <p>{t("sections.contact.content")}</p>
              <p className="mt-4">
                <strong>MSADDI.EST</strong><br />
                Aleppo, Syria<br />
                {t("sections.contact.email")}: info@msaddi.com<br />
                {t("sections.contact.phone")}: +963 944 244 604
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}