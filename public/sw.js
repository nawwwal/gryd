// Service Worker for advanced caching strategies
const CACHE_NAME = 'gryd-echo-forge-v1';
const STATIC_CACHE = 'static-v1';
const IMAGE_CACHE = 'images-v1';
const API_CACHE = 'api-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/work',
  '/about',
  '/playground',
  '/manifest.json',
  '/favicon.ico',
];

// Cache strategies
const CACHE_STRATEGIES = {
  // Stale while revalidate for HTML pages
  staleWhileRevalidate: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    });

    return cachedResponse || fetchPromise;
  },

  // Cache first for static assets
  cacheFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  },

  // Network first for API calls with cache fallback
  networkFirst: async (request, cacheName) => {
    const cache = await caches.open(cacheName);

    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  }
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(STATIC_ASSETS);
      self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== IMAGE_CACHE && name !== API_CACHE)
          .map(name => caches.delete(name))
      );
      self.clients.claim();
    })()
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/') || url.hostname.includes('sanity')) {
    // API requests - Network first with cache fallback
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, API_CACHE));
  } else if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    // Images - Cache first with network fallback
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, IMAGE_CACHE));
  } else if (request.destination === 'document' || url.pathname.match(/\.(html|htm)$/i)) {
    // HTML pages - Stale while revalidate
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE));
  } else {
    // Other static assets - Cache first
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, STATIC_CACHE));
  }
});

// Background sync for offline actions (optional enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync operations
      console.log('Background sync triggered')
    );
  }
});

// Push notifications support (optional enhancement)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: data.url
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

// Message handler for cache management from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'CACHE_INVALIDATE':
        event.waitUntil(
          (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
              cacheNames.map(name => caches.delete(name))
            );
            event.ports[0].postMessage({ success: true });
          })()
        );
        break;

      case 'CACHE_STATS':
        event.waitUntil(
          (async () => {
            const cacheNames = await caches.keys();
            const stats = {};

            for (const name of cacheNames) {
              const cache = await caches.open(name);
              const keys = await cache.keys();
              stats[name] = keys.length;
            }

            event.ports[0].postMessage({ stats });
          })()
        );
        break;
    }
  }
});

// Periodic cache cleanup (runs when SW is active)
const cleanupCache = async () => {
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    // Remove entries older than 7 days
    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const dateHeader = response.headers.get('date');
        if (dateHeader && new Date(dateHeader).getTime() < oneWeekAgo) {
          await cache.delete(request);
        }
      }
    }
  }
};

// Schedule periodic cleanup
setInterval(cleanupCache, 24 * 60 * 60 * 1000); // Daily cleanup
