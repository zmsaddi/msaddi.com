'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home } from 'lucide-react';

/**
 * Global Error Boundary
 *
 * This catches errors in the root layout.
 * Must be a minimal implementation without dependencies
 * that might fail (like i18n hooks).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log critical error
    console.error('CRITICAL ERROR:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send to critical error monitoring
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '1rem',
        }}>
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            {/* Error Icon */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AlertTriangle style={{ width: '2.5rem', height: '2.5rem', color: '#dc2626' }} />
              </div>
            </div>

            {/* Error Message */}
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem',
            }}>
              Critical Error
            </h1>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
            }}>
              We encountered a critical error. Please refresh the page or try again later.
            </p>

            {/* Development Details */}
            {process.env.NODE_ENV === 'development' && (
              <details style={{
                marginTop: '1rem',
                textAlign: 'left',
                backgroundColor: '#f3f4f6',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '500', color: '#dc2626', marginBottom: '0.5rem' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  color: '#6b7280',
                  whiteSpace: 'pre-wrap',
                }}>
                  {error.message}
                  {error.digest && `\n\nDigest: ${error.digest}`}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0066d9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: '#1f2937',
                  borderRadius: '0.5rem',
                  border: '2px solid #e5e7eb',
                  fontWeight: '500',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                Go Home
              </a>
            </div>

            {/* Contact Info */}
            <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
              <p>
                Need help? Contact us at{' '}
                <a href="mailto:info@msaddi.com" style={{ color: '#007BFF', textDecoration: 'none' }}>
                  info@msaddi.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
