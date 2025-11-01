/**
 * Global Error Handler
 *
 * Catches unhandled errors and sends them to Sentry
 */

'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '50px', textAlign: 'center' }}>
          <h1>Something went wrong!</h1>
          <p>We've been notified and are looking into it.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
