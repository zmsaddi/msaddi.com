import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getDirection } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const locales = ["en", "ar", "tr"];

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();
  const direction = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={direction === "rtl" ? "rtl" : ""}
    >
      <body className="font-body antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}