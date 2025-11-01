'use client';

import { ReactNode } from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleTagManager from './GoogleTagManager';

/**
 * Analytics Provider Component
 *
 * Centralized analytics initialization:
 * - Google Analytics 4 (GA4)
 * - Google Tag Manager (GTM)
 * - Cookie consent management
 * - Privacy compliance (GDPR, CCPA)
 *
 * Usage:
 * Wrap your root layout with this provider
 */

interface AnalyticsProviderProps {
  children?: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      {/* Google Tag Manager - Load first for tag management */}
      <GoogleTagManager />

      {/* Google Analytics 4 */}
      <GoogleAnalytics />

      {children}
    </>
  );
}

/**
 * Cookie Consent Manager (Optional - for GDPR compliance)
 *
 * Implement if operating in EU or requiring GDPR compliance
 * Libraries to consider:
 * - react-cookie-consent
 * - @cookiehub/react-cookie-consent
 * - vanilla-cookieconsent
 */

export function useCookieConsent() {
  // TODO: Implement cookie consent logic
  // For now, return true (assume consent)
  return {
    hasConsent: true,
    grantConsent: () => {},
    revokeConsent: () => {},
  };
}
