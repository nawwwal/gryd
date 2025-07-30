// Simple, reliable Service Worker for THE GRYD
const CACHE_VERSION = 'gryd-v3';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;
const FONT_CACHE = `fonts-${CACHE_VERSION}`;

// Only cache truly static assets - NO HTML PAGES
const STATIC_ASSETS = [
  '/manifest.json',
  '/favicon.ico',
  '/robots.txt'
];

// Install event - cache only essential static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => !name.includes(CACHE_VERSION))
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - simple caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // NEVER cache HTML documents - always fetch fresh
  if (request.mode === 'navigate' ||
      request.destination === 'document' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/' ||
      (!url.pathname.includes('.') && !url.pathname.startsWith('/api'))) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response('Offline - Please check your connection', {
          status: 503,
          headers: { 'Content-Type': 'text/html' }
        });
      })
    );
    return;
  }

  // Cache images
  if (request.destination === 'image' ||
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    event.respondWith(
      caches.open(IMAGE_CACHE)
        .then(cache => {
          return cache.match(request)
            .then(response => {
              if (response) return response;

              return fetch(request).then(response => {
                // Only cache successful responses
                if (response.ok) {
                  cache.put(request, response.clone());
                }
                return response;
              });
            });
        })
        .catch(() => new Response('Image not available', { status: 404 }))
    );
    return;
  }

  // Cache fonts
  if (request.destination === 'font' || url.pathname.match(/\.(woff|woff2|ttf|otf)$/i)) {
    event.respondWith(
      caches.open(FONT_CACHE)
        .then(cache => {
          return cache.match(request)
            .then(response => {
              if (response) return response;

              return fetch(request).then(response => {
                if (response.ok) {
                  cache.put(request, response.clone());
                }
                return response;
              });
            });
        })
        .catch(() => new Response('Font not available', { status: 404 }))
    );
    return;
  }

  // For CSS and JS files, use network-first approach
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      url.pathname.match(/\.(css|js)$/i)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Don't cache if not successful
          if (!response.ok) return response;

          // Don't cache if it has a hash (versioned files)
          if (url.pathname.includes('.') && url.pathname.match(/\.[a-f0-9]{8,}\./)) {
            return caches.open(STATIC_CACHE)
              .then(cache => {
                cache.put(request, response.clone());
                return response;
              });
          }

          return response;
        })
        .catch(() => {
          // Try cache as fallback
          return caches.match(request)
            .then(response => response || new Response('Offline', { status: 503 }));
        })
    );
    return;
  }

  // Default: network only (for API calls, etc.)
  event.respondWith(fetch(request));
});

// Message handler for cache control
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys()
        .then(cacheNames => Promise.all(cacheNames.map(name => caches.delete(name))))
        .then(() => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ success: true });
          }
        })
    );
  }
});
