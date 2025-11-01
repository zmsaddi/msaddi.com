'use client';

/**
 * Lazy-loaded Components for Performance Optimization
 *
 * These components are loaded dynamically to reduce initial bundle size
 * and improve First Contentful Paint (FCP) and Largest Contentful Paint (LCP)
 */

import dynamic from 'next/dynamic';
import { ComponentProps, Suspense } from 'react';

/**
 * Lazy-loaded WhatsApp Button
 * Not critical for initial render - loads after main content
 */
export const LazyWhatsAppButton = dynamic(
  () => import('./WhatsAppButton'),
  {
    loading: () => null, // No loading state needed
    ssr: false, // Client-side only
  }
);

/**
 * Lazy-loaded Google Translate Widget
 * Optional feature - loads on demand
 */
export const LazyGoogleTranslateWidget = dynamic(
  () => import('./GoogleTranslateWidget'),
  {
    loading: () => null,
    ssr: false,
  }
);

/**
 * Lazy-loaded Machine Translation Badge
 * Only shown when needed - can be lazy loaded
 */
export const LazyMachineTranslationBadge = dynamic(
  () => import('./MachineTranslationBadge'),
  {
    loading: () => null,
    ssr: false,
  }
);

/**
 * Lazy-loaded RFQ Form
 * Heavy component with validation - only load when needed
 */
export const LazyRFQForm = dynamic(
  () => import('./RFQForm'),
  {
    loading: () => (
      <div style={{
        padding: '48px',
        textAlign: 'center',
        color: '#666'
      }}>
        Loading form...
      </div>
    ),
    ssr: false,
  }
);

/**
 * Wrapper components with Suspense boundary
 */

export function WhatsAppButtonWrapper() {
  return (
    <Suspense fallback={null}>
      <LazyWhatsAppButton />
    </Suspense>
  );
}

export function GoogleTranslateWidgetWrapper(
  props: ComponentProps<typeof LazyGoogleTranslateWidget>
) {
  return (
    <Suspense fallback={null}>
      <LazyGoogleTranslateWidget {...props} />
    </Suspense>
  );
}

export function MachineTranslationBadgeWrapper() {
  return (
    <Suspense fallback={null}>
      <LazyMachineTranslationBadge />
    </Suspense>
  );
}

export function RFQFormWrapper(
  props: ComponentProps<typeof LazyRFQForm>
) {
  return (
    <Suspense fallback={
      <div style={{
        padding: '48px',
        textAlign: 'center',
        color: '#666'
      }}>
        Loading...
      </div>
    }>
      <LazyRFQForm {...props} />
    </Suspense>
  );
}
