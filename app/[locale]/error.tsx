'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

/**
 * Error Boundary Component
 *
 * This component catches React errors anywhere in the app tree
 * and displays a fallback UI instead of crashing the whole app.
 *
 * Features:
 * - User-friendly error message
 * - Option to retry (reset error)
 * - Option to go home
 * - Error logging for developers
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  useEffect(() => {
    // Log error to console (and monitoring service in production)
    console.error('Application Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, send to monitoring service (Sentry, LogRocket, etc.)
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-surface to-surface-footer px-4">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-error" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {t('errors.title') || 'Oops! Something went wrong'}
          </h1>
          <p className="text-text-secondary mb-2">
            {t('errors.description') || 'We encountered an unexpected error. Please try again.'}
          </p>

          {/* Show error details in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left bg-surface-footer p-4 rounded-lg text-sm">
              <summary className="cursor-pointer font-medium text-error mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs overflow-auto text-text-secondary whitespace-pre-wrap">
                {error.message}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* Try Again Button */}
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            {t('buttons.tryAgain') || 'Try Again'}
          </button>

          {/* Go Home Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-white border-2 border-outline text-text-primary rounded-lg font-medium hover:bg-surface transition-colors"
          >
            <Home className="w-4 h-4" />
            {t('buttons.goHome') || 'Go Home'}
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center text-sm text-text-secondary">
          <p>
            {t('errors.persist') || 'If the problem persists, please'}{' '}
            <Link href="/contact" className="text-primary hover:underline">
              {t('nav.contact') || 'contact us'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
