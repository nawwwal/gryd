// Enhanced Service Worker for THE GRYD with Sanity CDN optimization
const CACHE_NAME = 'gryd-echo-forge-v2';
const STATIC_CACHE = 'static-v2';
const IMAGE_CACHE = 'images-v2';
const API_CACHE = 'api-v2';
const SANITY_CACHE = 'sanity-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/work',
  '/about',
  '/playground',
  '/manifest.json',
  '/favicon.ico',
];

// Sanity CDN domains for targeted caching
const SANITY_DOMAINS = [
  'cdn.sanity.io',
  'api.sanity.io'
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

  // Cache first for static assets and images
  cacheFirst: async (request, cacheName, maxAge = 86400000) => { // 24 hours default
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    // Check if cached response is still valid
    if (cachedResponse) {
      const cachedTime = cachedResponse.headers.get('sw-cached-time');
      if (cachedTime && Date.now() - parseInt(cachedTime) < maxAge) {
        return cachedResponse;
      }
    }

    try {
      const response = await fetch(request);
      if (response.ok) {
        // Add timestamp to cached response
        const responseClone = response.clone();
        const modifiedResponse = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: {
            ...Object.fromEntries(responseClone.headers.entries()),
            'sw-cached-time': Date.now().toString()
          }
        });
        cache.put(request, modifiedResponse);
      }
      return response;
    } catch (error) {
      return cachedResponse || new Response('Offline', { status: 503 });
    }
  },

  // Network first for API calls with cache fallback
  networkFirst: async (request, cacheName, timeout = 3000) => {
    const cache = await caches.open(cacheName);

    // Race network request against timeout
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Network timeout')), timeout)
    );

    try {
      const response = await Promise.race([networkPromise, timeoutPromise]);
      if (response.ok) {
        // Cache successful responses with timestamp
        const responseClone = response.clone();
        const modifiedResponse = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: {
            ...Object.fromEntries(responseClone.headers.entries()),
            'sw-cached-time': Date.now().toString()
          }
        });
        cache.put(request, modifiedResponse);
      }
      return response;
    } catch (error) {
      console.log('Network failed, trying cache:', error);
      const cachedResponse = await cache.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  // Sanity-specific caching with long TTL for images
  sanityCaching: async (request, isImage = false) => {
    const cacheName = isImage ? IMAGE_CACHE : SANITY_CACHE;
    const maxAge = isImage ? 604800000 : 300000; // 7 days for images, 5 minutes for data

    return CACHE_STRATEGIES.cacheFirst(request, cacheName, maxAge);
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
          .filter(name => !name.includes('v2'))
          .map(name => caches.delete(name))
      );
      self.clients.claim();
    })()
  );
});

// Fetch event - implement enhanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle http(s) requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle Sanity CDN requests with optimized caching
  if (SANITY_DOMAINS.some(domain => url.hostname.includes(domain))) {
    const isImage = url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
                   url.searchParams.has('w') ||
                   url.searchParams.has('h');

    event.respondWith(CACHE_STRATEGIES.sanityCaching(request, isImage));
    return;
  }

  // Handle API requests (including Sanity API)
  if (url.pathname.startsWith('/api/') || url.hostname.includes('api.sanity')) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, API_CACHE));
    return;
  }

  // Handle images with aggressive caching
  if (request.destination === 'image' || url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    event.respondWith(CACHE_STRATEGIES.cacheFirst(request, IMAGE_CACHE, 604800000)); // 7 days
    return;
  }

  // Handle HTML pages with stale-while-revalidate
  if (request.destination === 'document' || url.pathname.match(/\.(html|htm)$/i)) {
    event.respondWith(CACHE_STRATEGIES.staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Handle other static assets (CSS, JS, fonts)
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'font' ||
      url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i)) {
    event.respondWith(CACHE_STRATEGIES.networkFirst(request, STATIC_CACHE));
    return;
  }

  // Default: try network first, then cache
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request) || new Response('Offline', { status: 503 });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'content-sync') {
    event.waitUntil(
      (async () => {
        console.log('[SW] Background sync triggered for content');
        // Prefetch critical content when back online
        try {
          const cache = await caches.open(SANITY_CACHE);
          const criticalRequests = [
            '/api/work-projects',
            '/api/playground-experiments'
          ];

          await Promise.allSettled(
            criticalRequests.map(url =>
              fetch(url).then(response => {
                if (response.ok) {
                  cache.put(url, response);
                }
              })
            )
          );
        } catch (error) {
          console.log('[SW] Background sync failed:', error);
        }
      })()
    );
  }
});

// Push notifications support
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: data.url,
      actions: [
        {
          action: 'open',
          title: 'Read Article'
        },
        {
          action: 'close',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open' && event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

// Enhanced message handler for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'CACHE_INVALIDATE':
        event.waitUntil(
          (async () => {
            const pattern = event.data.pattern;
            if (pattern) {
              // Invalidate specific pattern
              const cacheNames = await caches.keys();
              for (const cacheName of cacheNames) {
                const cache = await caches.open(cacheName);
                const keys = await cache.keys();
                await Promise.all(
                  keys
                    .filter(request => request.url.includes(pattern))
                    .map(request => cache.delete(request))
                );
              }
            } else {
              // Invalidate all
              const cacheNames = await caches.keys();
              await Promise.all(
                cacheNames.map(name => caches.delete(name))
              );
            }
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
              stats[name] = {
                count: keys.length,
                size: await getCacheSize(cache, keys)
              };
            }

            event.ports[0].postMessage({ stats });
          })()
        );
        break;

      case 'PREFETCH_CONTENT':
        event.waitUntil(
          (async () => {
            const { urls } = event.data;
            const cache = await caches.open(SANITY_CACHE);

            await Promise.allSettled(
              urls.map(async (url) => {
                try {
                  const response = await fetch(url);
                  if (response.ok) {
                    await cache.put(url, response);
                  }
                } catch (error) {
                  console.log(`[SW] Failed to prefetch: ${url}`, error);
                }
              })
            );

            event.ports[0].postMessage({ success: true });
          })()
        );
        break;
    }
  }
});

// Helper function to estimate cache size
async function getCacheSize(cache, keys) {
  let totalSize = 0;
  for (const request of keys.slice(0, 10)) { // Sample first 10 for performance
    try {
      const response = await cache.match(request);
      if (response && response.body) {
        const reader = response.body.getReader();
        const chunks = [];
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) chunks.push(value);
        }

        totalSize += chunks.reduce((size, chunk) => size + chunk.length, 0);
      }
    } catch (error) {
      // Skip if unable to read
    }
  }
  return Math.round(totalSize / 1024); // Return size in KB
}

// Periodic cache cleanup
const cleanupCache = async () => {
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();

    for (const request of keys) {
      const response = await cache.match(request);
      if (response) {
        const cachedTime = response.headers.get('sw-cached-time');
        if (cachedTime) {
          const age = Date.now() - parseInt(cachedTime);
          const maxAge = cacheName.includes('image') ? 604800000 : 86400000; // 7 days for images, 1 day for others

          if (age > maxAge) {
            await cache.delete(request);
          }
        }
      }
    }
  }
};

// Run cleanup every hour
setInterval(cleanupCache, 3600000);
