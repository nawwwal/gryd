import { useState, useEffect } from 'react';
import { useCacheManager } from '../hooks/useContentQuery';
import { SW_REGISTRATION, CONNECTION_QUALITY, PERFORMANCE_MONITOR } from '../utils/serviceWorker';

interface PerformanceStats {
  reactQueryCache: {
    size: number;
    queries: Array<{
      key: string;
      dataUpdatedAt: number;
      status: string;
      fetchStatus: string;
    }>;
  };
  sanityCache: {
    size: number;
    entries: Array<{
      key: string;
      age: number;
      ttl: number;
    }>;
  };
  serviceWorkerCache?: any;
  connectionInfo: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
  };
  performanceMetrics?: any;
}

export const PerformanceMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getCacheStats, invalidateAllContent } = useCacheManager();

  // Only show in development
  if (import.meta.env.PROD) return null;

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [cacheStats, swCacheStats, performanceMetrics] = await Promise.all([
        getCacheStats(),
        SW_REGISTRATION.getCacheStats(),
        Promise.resolve(PERFORMANCE_MONITOR.getPerformanceMetrics())
      ]);

      setStats({
        reactQueryCache: cacheStats.reactQuery,
        sanityCache: cacheStats.sanity,
        serviceWorkerCache: swCacheStats,
        connectionInfo: CONNECTION_QUALITY.getConnectionInfo(),
        performanceMetrics
      });
    } catch (error) {
      console.error('Failed to fetch performance stats:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && !stats) {
      fetchStats();
    }
  }, [isOpen]);

  const handleClearCache = async () => {
    try {
      await Promise.all([
        invalidateAllContent(),
        SW_REGISTRATION.invalidateCache()
      ]);

      // Refresh stats after clearing
      await fetchStats();

      console.log('[Performance] All caches cleared');
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Performance Monitor"
      >
        ⚡
      </button>

      {/* Performance Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white border border-gray-300 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Performance Monitor</h3>
              <div className="flex gap-2">
                <button
                  onClick={fetchStats}
                  disabled={isLoading}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Refresh'}
                </button>
                <button
                  onClick={handleClearCache}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Clear Cache
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4 text-sm">
            {stats && (
              <>
                {/* Connection Info */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Connection</h4>
                  <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                    <div>Type: <span className="font-mono">{stats.connectionInfo.effectiveType}</span></div>
                    <div>Speed: <span className="font-mono">{stats.connectionInfo.downlink} Mbps</span></div>
                    <div>RTT: <span className="font-mono">{stats.connectionInfo.rtt}ms</span></div>
                    <div>Data Saver: <span className="font-mono">{stats.connectionInfo.saveData ? 'On' : 'Off'}</span></div>
                  </div>
                </div>

                {/* React Query Cache */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">React Query Cache</h4>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <div className="mb-2">Queries: <span className="font-mono">{stats.reactQueryCache.size}</span></div>
                    <div className="max-h-20 overflow-y-auto space-y-1">
                      {stats.reactQueryCache.queries.slice(0, 5).map((query, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-mono truncate">{query.key}</div>
                          <div className="text-gray-500">
                            Status: {query.status} | {query.fetchStatus}
                          </div>
                        </div>
                      ))}
                      {stats.reactQueryCache.queries.length > 5 && (
                        <div className="text-gray-500">
                          ...and {stats.reactQueryCache.queries.length - 5} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sanity Cache */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Sanity Cache</h4>
                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <div className="mb-2">Entries: <span className="font-mono">{stats.sanityCache.size}</span></div>
                    <div className="max-h-20 overflow-y-auto space-y-1">
                      {stats.sanityCache.entries.slice(0, 3).map((entry, index) => (
                        <div key={index} className="text-xs">
                          <div className="font-mono truncate">{entry.key}</div>
                          <div className="text-gray-500">
                            Age: {formatDuration(entry.age)} | TTL: {formatDuration(entry.ttl)}
                          </div>
                        </div>
                      ))}
                      {stats.sanityCache.entries.length > 3 && (
                        <div className="text-gray-500">
                          ...and {stats.sanityCache.entries.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Worker Cache */}
                {stats.serviceWorkerCache && Object.keys(stats.serviceWorkerCache).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Service Worker Cache</h4>
                    <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                      {Object.entries(stats.serviceWorkerCache).map(([cacheName, count]) => (
                        <div key={cacheName}>
                          {cacheName}: <span className="font-mono">{count as number} entries</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Metrics */}
                {stats.performanceMetrics && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Performance</h4>
                    <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                      {stats.performanceMetrics.navigation && (
                        <>
                          <div>DOM Ready: <span className="font-mono">{formatDuration(stats.performanceMetrics.navigation.domContentLoaded || 0)}</span></div>
                          <div>Load Complete: <span className="font-mono">{formatDuration(stats.performanceMetrics.navigation.loadComplete || 0)}</span></div>
                          <div>First Byte: <span className="font-mono">{formatDuration(stats.performanceMetrics.navigation.firstByte || 0)}</span></div>
                        </>
                      )}
                      {stats.performanceMetrics.paint && (
                        <>
                          <div>First Paint: <span className="font-mono">{formatDuration(stats.performanceMetrics.paint.firstPaint || 0)}</span></div>
                          <div>FCP: <span className="font-mono">{formatDuration(stats.performanceMetrics.paint.firstContentfulPaint || 0)}</span></div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {!stats && !isLoading && (
              <div className="text-center text-gray-500 py-4">
                Click refresh to load performance stats
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
