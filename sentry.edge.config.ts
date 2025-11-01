/**
 * Sentry Edge Configuration
 *
 * Captures errors in Edge Runtime (middleware, edge functions)
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.1,

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Environment
  environment: process.env.NODE_ENV,
});
