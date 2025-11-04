import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { locales } from "@/config/locales";

interface PrivacyPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "privacy.page"
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.msaddi.com";
  const currentPath = `${params.locale}/privacy`;
  const canonicalUrl = `${baseUrl}/${currentPath}`;

  // Generate hreflang alternates
  const languages = locales.reduce((acc, locale) => {
    acc[locale] = `${baseUrl}/${locale}/privacy`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en/privacy`,
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

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "privacy"
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.msaddi.com";
  const currentUrl = `${baseUrl}/${params.locale}/privacy`;

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
                {t("sections.introduction.title")}
              </h2>
              <p>{t("sections.introduction.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.dataCollection.title")}
              </h2>
              <p>{t("sections.dataCollection.content")}</p>
              <ul className="list-disc pl-6 mt-4">
                <li>{t("sections.dataCollection.items.name")}</li>
                <li>{t("sections.dataCollection.items.email")}</li>
                <li>{t("sections.dataCollection.items.phone")}</li>
                <li>{t("sections.dataCollection.items.message")}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.dataUse.title")}
              </h2>
              <p>{t("sections.dataUse.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.dataProtection.title")}
              </h2>
              <p>{t("sections.dataProtection.content")}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-4">
                {t("sections.contact.title")}
              </h2>
              <p>{t("sections.contact.content")}</p>
              <p className="mt-4">
                <strong>{t("sections.contact.email")}:</strong> info@msaddi.com<br />
                <strong>{t("sections.contact.phone")}:</strong> +963 944 244 604
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}