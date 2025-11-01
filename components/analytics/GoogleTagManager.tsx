'use client';

import Script from 'next/script';

/**
 * Google Tag Manager (GTM) Component
 *
 * Provides centralized tag management for:
 * - Google Analytics
 * - Facebook Pixel
 * - LinkedIn Insight
 * - Custom conversion pixels
 * - Third-party marketing tags
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_GTM_ID: Your GTM Container ID (GTM-XXXXXXX)
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

interface GoogleTagManagerProps {
  gtmId?: string;
}

export default function GoogleTagManager({
  gtmId = process.env.NEXT_PUBLIC_GTM_ID,
}: GoogleTagManagerProps) {
  // Don't load in development unless explicitly enabled
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_GTM_DEBUG
  ) {
    return null;
  }

  // Don't load if no GTM ID
  if (!gtmId) {
    console.warn('GTM Container ID not found. Set NEXT_PUBLIC_GTM_ID in .env');
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Head Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* Google Tag Manager - NoScript Fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}

/**
 * GTM Data Layer Push Utilities
 */

export interface GTMEvent {
  event: string;
  [key: string]: any;
}

/**
 * Push event to GTM dataLayer
 */
export function pushToDataLayer(data: GTMEvent) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[GTM DataLayer]', data);
  }
}

/**
 * Push RFQ conversion event
 */
export function pushRFQConversion(data: {
  rfqId: string;
  service: string;
  material: string;
  quantity: number;
  value?: number;
}) {
  pushToDataLayer({
    event: 'rfq_conversion',
    rfq_id: data.rfqId,
    service: data.service,
    material: data.material,
    quantity: data.quantity,
    value: data.value || data.quantity,
    currency: 'USD',
  });
}

/**
 * Push contact form conversion
 */
export function pushContactConversion(data: {
  formName: string;
  service?: string;
}) {
  pushToDataLayer({
    event: 'contact_conversion',
    form_name: data.formName,
    service: data.service,
  });
}

/**
 * Push user properties
 */
export function pushUserProperties(properties: {
  userId?: string;
  userType?: string;
  industry?: string;
  [key: string]: any;
}) {
  pushToDataLayer({
    event: 'user_properties',
    ...properties,
  });
}

/**
 * Push custom event
 */
export function pushCustomEvent(
  eventName: string,
  parameters?: Record<string, any>
) {
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });
}

/**
 * Push e-commerce event
 */
export function pushEcommerceEvent(data: {
  event: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';
  ecommerce: {
    currency?: string;
    value?: number;
    items: Array<{
      item_id: string;
      item_name: string;
      item_category?: string;
      price?: number;
      quantity?: number;
    }>;
  };
}) {
  // Clear previous ecommerce data
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'ecommerce_clear',
      ecommerce: null,
    });
  }

  // Push new ecommerce event
  pushToDataLayer(data);
}
