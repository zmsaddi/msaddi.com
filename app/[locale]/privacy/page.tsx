import { getTranslations } from "next-intl/server";

interface PrivacyPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "privacy.page"
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "privacy"
  });

  return (
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
  );
}