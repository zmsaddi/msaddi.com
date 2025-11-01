/**
 * Sentry Client Configuration
 *
 * Captures client-side errors and performance data
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring

  // Session Replay
  replaysSessionSampleRate: 0.1, // Sample 10% of sessions
  replaysOnErrorSampleRate: 1.0, // Sample 100% when an error occurs

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore specific errors
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    // Network errors
    'NetworkError',
    'Failed to fetch',
    // Random plugins/extensions
    'fb_xd_fragment',
  ],

  // Filter out local development
  beforeSend(event, hint) {
    // Don't send events from localhost in development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});
