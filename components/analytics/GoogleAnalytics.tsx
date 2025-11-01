'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Google Analytics 4 (GA4) Component
 *
 * Features:
 * - Automatic page view tracking
 * - Event tracking
 * - E-commerce tracking
 * - Custom dimensions
 * - Privacy-compliant
 *
 * Environment Variables Required:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Your GA4 Measurement ID (G-XXXXXXXXXX)
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export default function GoogleAnalytics({
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (!measurementId || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('config', measurementId, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [pathname, searchParams, measurementId]);

  // Don't load in development unless explicitly enabled
  if (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_GA_DEBUG
  ) {
    return null;
  }

  // Don't load if no measurement ID
  if (!measurementId) {
    console.warn('GA4 Measurement ID not found. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env');
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              cookie_domain: 'auto',
              cookie_expires: 63072000, // 2 years
            });
          `,
        }}
      />
    </>
  );
}

/**
 * GA4 Event Tracking Utilities
 */

export const GA_EVENTS = {
  // Page Events
  PAGE_VIEW: 'page_view',

  // Navigation Events
  CLICK_LINK: 'click_link',
  CLICK_BUTTON: 'click_button',

  // Form Events
  FORM_START: 'form_start',
  FORM_SUBMIT: 'form_submit',
  FORM_ERROR: 'form_error',

  // RFQ Events
  RFQ_START: 'rfq_start',
  RFQ_SUBMIT: 'rfq_submit',
  RFQ_SUCCESS: 'rfq_success',
  RFQ_ERROR: 'rfq_error',

  // Contact Events
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',

  // Service Events
  SERVICE_VIEW: 'service_view',
  PRODUCT_VIEW: 'product_view',

  // File Events
  FILE_DOWNLOAD: 'file_download',
  FILE_UPLOAD: 'file_upload',

  // Language Events
  LANGUAGE_CHANGE: 'language_change',

  // Engagement Events
  SCROLL_DEPTH: 'scroll_depth',
  VIDEO_PLAY: 'video_play',
  VIDEO_COMPLETE: 'video_complete',
} as const;

export type GAEventName = typeof GA_EVENTS[keyof typeof GA_EVENTS];

export interface GAEventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Track a Google Analytics event
 */
export function trackEvent(
  eventName: GAEventName | string,
  params?: GAEventParams
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    window.gtag('event', eventName, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    });

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 Event]', eventName, params);
    }
  } catch (error) {
    console.error('Error tracking GA4 event:', error);
  }
}

/**
 * Track RFQ Submission
 */
export function trackRFQSubmission(data: {
  service: string;
  material: string;
  quantity: number;
  timeline: string;
}) {
  trackEvent(GA_EVENTS.RFQ_SUBMIT, {
    category: 'engagement',
    label: data.service,
    value: data.quantity,
    service: data.service,
    material: data.material,
    quantity: data.quantity,
    timeline: data.timeline,
  });
}

/**
 * Track RFQ Success
 */
export function trackRFQSuccess(rfqId: string) {
  trackEvent(GA_EVENTS.RFQ_SUCCESS, {
    category: 'conversion',
    label: rfqId,
    rfq_id: rfqId,
  });
}

/**
 * Track Contact Form Submission
 */
export function trackContactSubmission(data: {
  service: string;
  name: string;
}) {
  trackEvent(GA_EVENTS.CONTACT_FORM_SUBMIT, {
    category: 'engagement',
    label: data.service,
    service: data.service,
  });
}

/**
 * Track External Link Click
 */
export function trackExternalClick(
  destination: string,
  label?: string
) {
  trackEvent(GA_EVENTS.CLICK_LINK, {
    category: 'outbound',
    label: label || destination,
    destination,
  });
}

/**
 * Track WhatsApp Click
 */
export function trackWhatsAppClick() {
  trackEvent(GA_EVENTS.WHATSAPP_CLICK, {
    category: 'contact',
    label: 'whatsapp_button',
  });
}

/**
 * Track Phone Click
 */
export function trackPhoneClick(number: string) {
  trackEvent(GA_EVENTS.PHONE_CLICK, {
    category: 'contact',
    label: number,
  });
}

/**
 * Track Email Click
 */
export function trackEmailClick(email: string) {
  trackEvent(GA_EVENTS.EMAIL_CLICK, {
    category: 'contact',
    label: email,
  });
}

/**
 * Track Language Change
 */
export function trackLanguageChange(
  from: string,
  to: string
) {
  trackEvent(GA_EVENTS.LANGUAGE_CHANGE, {
    category: 'engagement',
    from_language: from,
    to_language: to,
  });
}

/**
 * Track File Upload
 */
export function trackFileUpload(
  fileName: string,
  fileSize: number,
  fileType: string
) {
  trackEvent(GA_EVENTS.FILE_UPLOAD, {
    category: 'engagement',
    label: fileName,
    file_name: fileName,
    file_size: fileSize,
    file_type: fileType,
  });
}

/**
 * Track Service View
 */
export function trackServiceView(serviceName: string) {
  trackEvent(GA_EVENTS.SERVICE_VIEW, {
    category: 'content',
    label: serviceName,
    service: serviceName,
  });
}

/**
 * Track Product View
 */
export function trackProductView(productName: string) {
  trackEvent(GA_EVENTS.PRODUCT_VIEW, {
    category: 'content',
    label: productName,
    product: productName,
  });
}

/**
 * Track Scroll Depth
 */
export function trackScrollDepth(percentage: number) {
  trackEvent(GA_EVENTS.SCROLL_DEPTH, {
    category: 'engagement',
    label: `${percentage}%`,
    scroll_depth: percentage,
  });
}
