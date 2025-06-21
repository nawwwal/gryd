// Service Worker registration and management utilities
export const SW_REGISTRATION = {
  registration: null as ServiceWorkerRegistration | null,

  async register(): Promise<ServiceWorkerRegistration | null> {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none' // Always check for SW updates
        });

        this.registration = registration;

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                this.notifyUpdate();
              }
            });
          }
        });

        // Handle messages from SW
        navigator.serviceWorker.addEventListener('message', this.handleMessage);

        console.log('[SW] Registered successfully');
        return registration;
      } catch (error) {
        console.error('[SW] Registration failed:', error);
        return null;
      }
    }
    return null;
  },

  async unregister(): Promise<boolean> {
    if (this.registration) {
      const success = await this.registration.unregister();
      this.registration = null;
      return success;
    }
    return false;
  },

  handleMessage(event: MessageEvent) {
    const { data } = event;

    if (data.type === 'CACHE_UPDATED') {
      console.log('[SW] Cache updated for:', data.url);
    }
  },

  notifyUpdate() {
    // Notify user about available update
    if (window.confirm('A new version is available. Reload to update?')) {
      window.location.reload();
    }
  },

  // Cache management functions
  async invalidateCache(): Promise<void> {
    if (this.registration && this.registration.active) {
      const messageChannel = new MessageChannel();

      return new Promise((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            console.log('[SW] Cache invalidated successfully');
            resolve();
          }
        };

        this.registration!.active!.postMessage(
          { type: 'CACHE_INVALIDATE' },
          [messageChannel.port2]
        );
      });
    }
  },

  async getCacheStats(): Promise<any> {
    if (this.registration && this.registration.active) {
      const messageChannel = new MessageChannel();

      return new Promise((resolve) => {
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.stats);
        };

        this.registration!.active!.postMessage(
          { type: 'CACHE_STATS' },
          [messageChannel.port2]
        );
      });
    }
    return {};
  }
};

// Connection quality detection
export const CONNECTION_QUALITY = {
  getConnectionInfo(): {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  } {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      return {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false
      };
    }

    return {
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false
    };
  },

  isSlowConnection(): boolean {
    const info = this.getConnectionInfo();
    return info.effectiveType === 'slow-2g' ||
           info.effectiveType === '2g' ||
           info.saveData;
  },

  isFastConnection(): boolean {
    const info = this.getConnectionInfo();
    return info.effectiveType === '4g' && info.downlink > 5;
  }
};

// Network monitoring
export const NETWORK_MONITOR = {
  listeners: new Set<(isOnline: boolean) => void>(),

  init() {
    window.addEventListener('online', () => this.notifyListeners(true));
    window.addEventListener('offline', () => this.notifyListeners(false));
  },

  isOnline(): boolean {
    return navigator.onLine;
  },

  addListener(callback: (isOnline: boolean) => void) {
    this.listeners.add(callback);
  },

  removeListener(callback: (isOnline: boolean) => void) {
    this.listeners.delete(callback);
  },

  notifyListeners(isOnline: boolean) {
    this.listeners.forEach(callback => callback(isOnline));
  }
};

// Performance monitoring
export const PERFORMANCE_MONITOR = {
  measureCacheHit(key: string, wasHit: boolean) {
    if ('performance' in window && 'mark' in performance) {
      const markName = `cache-${wasHit ? 'hit' : 'miss'}-${key}`;
      performance.mark(markName);
    }
  },

  measureFetchTime(url: string, startTime: number) {
    if ('performance' in window && 'measure' in performance) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log slow requests
      if (duration > 2000) {
        console.warn(`[Performance] Slow fetch detected: ${url} took ${duration}ms`);
      }

      performance.mark(`fetch-end-${url}`);
      try {
        performance.measure(`fetch-duration-${url}`, `fetch-start-${url}`, `fetch-end-${url}`);
      } catch (error) {
        // Mark doesn't exist, that's okay
      }
    }
  },

  getPerformanceMetrics(): any {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      return {
        navigation: {
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
          loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart,
          firstByte: navigation?.responseStart - navigation?.requestStart,
        },
        paint: {
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        }
      };
    }
    return null;
  }
};

// Initialize everything
export const initPerformanceOptimizations = async () => {
  // Register service worker
  await SW_REGISTRATION.register();

  // Initialize network monitoring
  NETWORK_MONITOR.init();

  // Log initial performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = PERFORMANCE_MONITOR.getPerformanceMetrics();
      if (metrics) {
        console.log('[Performance] Initial metrics:', metrics);
      }
    }, 1000);
  });
};
