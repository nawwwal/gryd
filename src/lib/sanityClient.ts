import { createClient } from '@sanity/client'

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.SANITY_API_PROJECT_ID
const dataset =
  import.meta.env.VITE_SANITY_DATASET || import.meta.env.SANITY_API_DATASET
const token =
  import.meta.env.VITE_SANITY_READ_TOKEN || import.meta.env.SANITY_API_READ_TOKEN

if (!projectId) {
  throw new Error('Missing required environment variable: VITE_SANITY_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing required environment variable: VITE_SANITY_DATASET')
}

// Enhanced client configuration for optimal performance
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for production
  perspective: 'published', // Only fetch published content for better caching
  ignoreBrowserTokenWarning: true,
  // Configure request timeout and retry logic
  timeout: 30000, // 30 seconds timeout
})

// Enhanced client with request coalescing and deduplication
class OptimizedSanityClient {
  private client = client
  private requestCache = new Map<string, Promise<any>>()
  private resultCache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes default cache TTL

  private getCacheKey(query: string, params?: any): string {
    return `${query}_${JSON.stringify(params || {})}`
  }

  private isValidCacheEntry(cacheKey: string): boolean {
    const entry = this.resultCache.get(cacheKey)
    if (!entry) return false
    return Date.now() - entry.timestamp < entry.ttl
  }

  async fetch<T>(query: string, params?: any, options?: { ttl?: number; forceFresh?: boolean }): Promise<T> {
    const cacheKey = this.getCacheKey(query, params)
    const ttl = options?.ttl || this.defaultTTL
    const forceFresh = options?.forceFresh || false

    // Check cache first (unless forced fresh)
    if (!forceFresh && this.isValidCacheEntry(cacheKey)) {
      const cached = this.resultCache.get(cacheKey)!
      if (import.meta.env.DEV) {
        console.log(`[Cache HIT] ${cacheKey.substring(0, 50)}...`)
      }
      return cached.data as T
    }

    // Check if request is already in flight (request coalescing)
    if (this.requestCache.has(cacheKey)) {
      if (import.meta.env.DEV) {
        console.log(`[Request COALESCE] ${cacheKey.substring(0, 50)}...`)
      }
      return this.requestCache.get(cacheKey) as Promise<T>
    }

    // Make new request
    if (import.meta.env.DEV) {
      console.log(`[Cache MISS] ${cacheKey.substring(0, 50)}...`)
    }
    const requestPromise = this.client.fetch(query, params).then((data) => {
      // Cache the result
      this.resultCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl
      })

      // Remove from request cache
      this.requestCache.delete(cacheKey)

      return data
    }).catch((error) => {
      // Remove from request cache on error
      this.requestCache.delete(cacheKey)
      throw error
    })

    // Store the request promise for coalescing
    this.requestCache.set(cacheKey, requestPromise)

    return requestPromise
  }

  // Method to manually invalidate cache
  invalidateCache(pattern?: string): void {
    if (!pattern) {
      this.resultCache.clear()
      if (import.meta.env.DEV) {
        console.log('[Cache] Cleared all cache entries')
      }
      return
    }

    const keysToDelete = Array.from(this.resultCache.keys()).filter(key =>
      key.includes(pattern)
    )

    keysToDelete.forEach(key => this.resultCache.delete(key))
    if (import.meta.env.DEV) {
      console.log(`[Cache] Invalidated ${keysToDelete.length} entries matching: ${pattern}`)
    }
  }

  // Method to get cache statistics
  getCacheStats(): { size: number; entries: Array<{ key: string; age: number; ttl: number }> } {
    const now = Date.now()
    const entries = Array.from(this.resultCache.entries()).map(([key, entry]) => ({
      key: key.substring(0, 50) + '...',
      age: now - entry.timestamp,
      ttl: entry.ttl
    }))

    return {
      size: this.resultCache.size,
      entries
    }
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now()
    let cleaned = 0

    for (const [key, entry] of this.resultCache.entries()) {
      if (now - entry.timestamp >= entry.ttl) {
        this.resultCache.delete(key)
        cleaned++
      }
    }

    if (cleaned > 0 && import.meta.env.DEV) {
      console.log(`[Cache] Cleaned up ${cleaned} expired entries`)
    }
  }
}

// Create singleton instance
const optimizedClient = new OptimizedSanityClient()

// Set up periodic cleanup
if (typeof window !== 'undefined') {
  setInterval(() => {
    optimizedClient.cleanup()
  }, 60000) // Cleanup every minute
}

export default optimizedClient
