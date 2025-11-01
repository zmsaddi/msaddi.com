/**
 * Sentry Server Configuration
 *
 * Captures server-side errors and performance data
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.1, // Capture 10% of transactions

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore specific errors
  ignoreErrors: [
    // Network errors
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
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
