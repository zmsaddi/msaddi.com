import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LayoutDirection } from "@/components/providers/layout-direction";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import WhatsAppButtonDynamic from "@/components/ui/whatsapp-button-dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isValidLocale } from "@/config/locales";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isArabic = locale === 'ar';

  return (
    <>
      {/* ⚡ Performance: Conditional Arabic Font Preloading */}
      {isArabic && (
        <>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIhTp2mxdt0UX8.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l_6gLrZjiLlJ-G0.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </>
      )}
      <NextIntlClientProvider locale={locale} messages={messages}>
        <LayoutDirection />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButtonDynamic />
        </ThemeProvider>
        <GoogleAnalytics />
        <Analytics mode={process.env.NODE_ENV === 'production' ? 'production' : 'development'} />
        <SpeedInsights />
      </NextIntlClientProvider>
    </>
  );
}