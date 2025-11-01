/**
 * PWA Utilities
 *
 * Service worker registration and PWA management utilities
 */

/**
 * Register service worker
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[PWA] Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });

    console.log('[PWA] Service Worker registered successfully');

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[PWA] New Service Worker available');

          // Notify user about update
          if (confirm('A new version of the app is available. Reload to update?')) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          }
        }
      });
    });

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[PWA] Service Worker controller changed');
    });

    return registration;
  } catch (error) {
    console.error('[PWA] Service Worker registration failed:', error);
    return null;
  }
}

/**
 * Unregister service worker
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.unregister();
      console.log('[PWA] Service Worker unregistered');
      return true;
    }
    return false;
  } catch (error) {
    console.error('[PWA] Service Worker unregistration failed:', error);
    return false;
  }
}

/**
 * Check if app is installed (running in standalone mode)
 */
export function isAppInstalled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const standalone = window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://');

  return standalone;
}

/**
 * Check if device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

/**
 * Check if app can be installed
 */
export function canInstallApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Already installed
  if (isAppInstalled()) {
    return false;
  }

  // iOS devices can always install via Safari
  if (isIOS()) {
    return true;
  }

  // For other devices, check if beforeinstallprompt was fired
  // This would be set by the beforeinstallprompt event handler
  return true;
}

/**
 * Cache URLs for offline access
 */
export async function cacheURLs(urls: string[]): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration || !registration.active) {
      return false;
    }

    const serviceWorker = registration.active;
    const messageChannel = new MessageChannel();

    return new Promise((resolve) => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      serviceWorker.postMessage(
        {
          type: 'CACHE_URLS',
          urls,
        },
        [messageChannel.port2]
      );
    });
  } catch (error) {
    console.error('[PWA] Cache URLs failed:', error);
    return false;
  }
}

/**
 * Clear service worker cache
 */
export async function clearCache(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration || !registration.active) {
      return false;
    }

    const serviceWorker = registration.active;
    const messageChannel = new MessageChannel();

    return new Promise((resolve) => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      serviceWorker.postMessage(
        {
          type: 'CLEAR_CACHE',
        },
        [messageChannel.port2]
      );
    });
  } catch (error) {
    console.error('[PWA] Clear cache failed:', error);
    return false;
  }
}

/**
 * Check if online
 */
export function isOnline(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  return navigator.onLine;
}

/**
 * Add online/offline event listeners
 */
export function addNetworkListeners(
  onOnline?: () => void,
  onOffline?: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => {
    console.log('[PWA] Back online');
    onOnline?.();
  };

  const handleOffline = () => {
    console.log('[PWA] Gone offline');
    onOffline?.();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.storage || !navigator.storage.persist) {
    return false;
  }

  try {
    const isPersisted = await navigator.storage.persist();
    console.log('[PWA] Persistent storage:', isPersisted ? 'granted' : 'denied');
    return isPersisted;
  } catch (error) {
    console.error('[PWA] Persistent storage request failed:', error);
    return false;
  }
}

/**
 * Estimate storage usage
 */
export async function getStorageEstimate(): Promise<{
  usage: number;
  quota: number;
  percentage: number;
} | null> {
  if (typeof window === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
    return null;
  }

  try {
    const estimate = await navigator.storage.estimate();
    const usage = estimate.usage || 0;
    const quota = estimate.quota || 0;
    const percentage = quota > 0 ? (usage / quota) * 100 : 0;

    console.log(`[PWA] Storage: ${(usage / 1024 / 1024).toFixed(2)}MB / ${(quota / 1024 / 1024).toFixed(2)}MB (${percentage.toFixed(2)}%)`);

    return {
      usage,
      quota,
      percentage,
    };
  } catch (error) {
    console.error('[PWA] Storage estimate failed:', error);
    return null;
  }
}

/**
 * Share content using Web Share API
 */
export async function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.share) {
    return false;
  }

  try {
    await navigator.share(data);
    console.log('[PWA] Content shared successfully');
    return true;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('[PWA] Share failed:', error);
    }
    return false;
  }
}

/**
 * Can use Web Share API
 */
export function canShare(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return 'share' in navigator;
}
