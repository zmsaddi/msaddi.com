"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (pathname && GA_MEASUREMENT_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

      // Track page views
      window.gtag?.("config", GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Enhanced measurement configuration
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            enhanced_measurement: true,
            custom_map: {
              'dimension1': 'user_language',
              'dimension2': 'page_category',
              'metric1': 'engagement_score'
            },
            // Cookie consent configuration
            cookie_flags: 'SameSite=None;Secure',
            cookie_domain: 'msaddi.com',
            cookie_expires: 63072000, // 2 years
            // Enhanced conversions
            allow_google_signals: true,
            allow_ad_personalization_signals: true
          });
        `}
      </Script>
    </>
  );
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}