'use client';

/**
 * PWA Initialization
 *
 * Handles service worker registration and PWA features initialization
 */

import { useEffect } from 'react';
import { registerServiceWorker, isOnline } from '@/lib/pwa';

export default function PWAInit() {
  useEffect(() => {
    // Only register in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('[PWA] Service Worker disabled in development');
      return;
    }

    // Register service worker
    registerServiceWorker();

    // Log initial online status
    console.log('[PWA] Initial online status:', isOnline());

    // Add network status listeners
    const handleOnline = () => {
      console.log('[PWA] Back online');
      // Optionally show a toast notification
    };

    const handleOffline = () => {
      console.log('[PWA] Gone offline');
      // Optionally show a toast notification
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null; // This component doesn't render anything
}
