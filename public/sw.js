/**
 * Service Worker for MSADDI Website
 *
 * Provides offline support and caching strategies for PWA functionality
 */

const CACHE_VERSION = 'v1';
const CACHE_NAME = `msaddi-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline';

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
];

// Cache strategy configurations
const CACHE_STRATEGIES = {
  // Static assets: Cache First (with fallback to network)
  static: [
    /\.(js|css|woff|woff2|ttf|otf)$/,
    /\/_next\/static\//,
    /\/icons\//,
  ],

  // Images: Cache First (with stale-while-revalidate)
  images: [
    /\.(png|jpg|jpeg|gif|svg|webp|avif|ico)$/,
  ],

  // API routes: Network First (with cache fallback)
  api: [
    /\/api\//,
  ],

  // Pages: Network First (with cache fallback)
  pages: [
    /\/[a-z]{2}(\/.*)?$/,
  ],
};

/**
 * Install Event - Cache static assets
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installed successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[Service Worker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activated successfully');
        return self.clients.claim(); // Take control immediately
      })
  );
});

/**
 * Fetch Event - Handle requests with appropriate caching strategy
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Determine caching strategy based on request type
  if (matchesPattern(url.pathname, CACHE_STRATEGIES.static)) {
    event.respondWith(cacheFirst(request));
  } else if (matchesPattern(url.pathname, CACHE_STRATEGIES.images)) {
    event.respondWith(staleWhileRevalidate(request));
  } else if (matchesPattern(url.pathname, CACHE_STRATEGIES.api)) {
    event.respondWith(networkFirst(request));
  } else if (matchesPattern(url.pathname, CACHE_STRATEGIES.pages)) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

/**
 * Cache First Strategy
 * Try cache first, fallback to network
 */
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Cache First failed:', error);
    return await caches.match(OFFLINE_URL) || new Response('Offline');
  }
}

/**
 * Network First Strategy
 * Try network first, fallback to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Network First failed:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return await caches.match(OFFLINE_URL) || new Response('Offline');
    }

    return new Response('Offline', { status: 503 });
  }
}

/**
 * Stale While Revalidate Strategy
 * Return cached response immediately, update cache in background
 */
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch((error) => {
      console.error('[Service Worker] Stale While Revalidate failed:', error);
    });

  return cachedResponse || fetchPromise || new Response('Offline', { status: 503 });
}

/**
 * Check if URL matches any pattern in the list
 */
function matchesPattern(url, patterns) {
  return patterns.some((pattern) => pattern.test(url));
}

/**
 * Message Event - Handle messages from clients
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls || [];
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urls))
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME)
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        })
    );
  }
});

/**
 * Sync Event - Handle background sync
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-rfq') {
    event.waitUntil(syncRFQSubmissions());
  }
});

/**
 * Sync RFQ submissions when back online
 */
async function syncRFQSubmissions() {
  try {
    // Get pending RFQ submissions from IndexedDB
    // This would require IndexedDB implementation
    console.log('[Service Worker] Syncing RFQ submissions...');
    // Implementation would go here
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

/**
 * Push Event - Handle push notifications (optional)
 */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'MSADDI Notification';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'default',
    requireInteraction: false,
    data: data.url || '/',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * Notification Click Event - Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if no matching client
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

console.log('[Service Worker] Loaded');
