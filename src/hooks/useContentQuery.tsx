import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import { WorkProject, PlaygroundExperiment, ContentItem, ContentMetadata } from '../types/content'
import optimizedClient from '../lib/sanityClient'

// Query keys for consistent cache management
export const QUERY_KEYS = {
  workProjects: ['work-projects'] as const,
  playgroundExperiments: ['playground-experiments'] as const,
  contentBySlug: (slug: string, type: 'work' | 'playground') => ['content', type, slug] as const,
  contentByType: (type: ContentMetadata['type']) => ['content-by-type', type] as const,
  allContent: ['all-content'] as const,
} as const

// Optimized queries for different content types
const QUERIES = {
  workProjects: `*[_type == "workProject"]|order(metadata.publishDate desc){
    "slug": slug.current,
    title,
    subtitle,
    description,
    timeline,
    impact,
    content,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      hotspot
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      caption,
      hotspot
    },
    attachments[]{
      asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title,
      description
    },
    metadata
  }`,

  playgroundExperiments: `*[_type == "playgroundExperiment"]|order(metadata.publishDate desc){
    "slug": slug.current,
    title,
    subtitle,
    description,
    intensity,
    visual,
    content,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      hotspot
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      caption,
      hotspot
    },
    attachments[]{
      asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title,
      description
    },
    metadata
  }`,

  contentBySlug: (type: 'work' | 'playground') => `*[_type == "${type === 'work' ? 'workProject' : 'playgroundExperiment'}" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    subtitle,
    description,
    ${type === 'work' ? 'timeline, impact,' : 'intensity, visual,'}
    content,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      hotspot
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      caption,
      hotspot
    },
    attachments[]{
      asset->{
        _id,
        url,
        originalFilename,
        size
      },
      title,
      description
    },
    metadata
  }`,

  contentByType: `*[(_type == "workProject" || _type == "playgroundExperiment") && metadata.type == $contentType]|order(metadata.publishDate desc){
    "slug": slug.current,
    "contentType": _type,
    title,
    subtitle,
    description,
    timeline,
    impact,
    intensity,
    visual,
    content,
    heroImage{
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip,
          palette
        }
      },
      alt,
      hotspot
    },
    metadata
  }`
}

// Default query options for optimal performance
const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true,
  retry: (failureCount: number, error: any) => {
    // Don't retry on 4xx errors, but retry on network/5xx errors
    if (error?.status >= 400 && error?.status < 500) return false
    return failureCount < 3
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
} as const

// Hook for work projects with optimizations
export const useWorkProjects = (options?: Partial<UseQueryOptions<WorkProject[], Error>>) => {
  return useQuery({
    queryKey: QUERY_KEYS.workProjects,
    queryFn: () => optimizedClient.fetch<WorkProject[]>(QUERIES.workProjects, undefined, { ttl: 10 * 60 * 1000 }), // 10 min cache
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// Hook for playground experiments with optimizations
export const usePlaygroundExperiments = (options?: Partial<UseQueryOptions<PlaygroundExperiment[], Error>>) => {
  return useQuery({
    queryKey: QUERY_KEYS.playgroundExperiments,
    queryFn: () => optimizedClient.fetch<PlaygroundExperiment[]>(QUERIES.playgroundExperiments, undefined, { ttl: 10 * 60 * 1000 }),
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// Hook for content by slug with optimizations
export const useContentBySlug = (
  slug: string,
  type: 'work' | 'playground',
  options?: Partial<UseQueryOptions<ContentItem | null, Error>>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.contentBySlug(slug, type),
    queryFn: () => optimizedClient.fetch<ContentItem | null>(
      QUERIES.contentBySlug(type),
      { slug },
      { ttl: 15 * 60 * 1000 } // 15 min cache for individual items
    ),
    enabled: !!slug,
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// Hook for content by type with optimizations
export const useContentByType = (
  contentType: ContentMetadata['type'],
  options?: Partial<UseQueryOptions<ContentItem[], Error>>
) => {
  return useQuery({
    queryKey: QUERY_KEYS.contentByType(contentType),
    queryFn: () => optimizedClient.fetch<ContentItem[]>(
      QUERIES.contentByType,
      { contentType },
      { ttl: 8 * 60 * 1000 } // 8 min cache
    ),
    enabled: !!contentType,
    ...DEFAULT_QUERY_OPTIONS,
    ...options,
  })
}

// Hook for prefetching content (for performance optimization)
export const usePrefetchContent = () => {
  const queryClient = useQueryClient()

  const prefetchWorkProjects = async () => {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.workProjects,
      queryFn: () => optimizedClient.fetch<WorkProject[]>(QUERIES.workProjects),
      ...DEFAULT_QUERY_OPTIONS,
    })
  }

  const prefetchPlaygroundExperiments = async () => {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.playgroundExperiments,
      queryFn: () => optimizedClient.fetch<PlaygroundExperiment[]>(QUERIES.playgroundExperiments),
      ...DEFAULT_QUERY_OPTIONS,
    })
  }

  const prefetchContentBySlug = async (slug: string, type: 'work' | 'playground') => {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.contentBySlug(slug, type),
      queryFn: () => optimizedClient.fetch<ContentItem | null>(QUERIES.contentBySlug(type), { slug }),
      ...DEFAULT_QUERY_OPTIONS,
    })
  }

  return {
    prefetchWorkProjects,
    prefetchPlaygroundExperiments,
    prefetchContentBySlug,
  }
}

// Hook for cache management
export const useCacheManager = () => {
  const queryClient = useQueryClient()

  const invalidateWorkProjects = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.workProjects })
    optimizedClient.invalidateCache('workProject')
  }

  const invalidatePlaygroundExperiments = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.playgroundExperiments })
    optimizedClient.invalidateCache('playgroundExperiment')
  }

  const invalidateContentBySlug = (slug: string, type: 'work' | 'playground') => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.contentBySlug(slug, type) })
    optimizedClient.invalidateCache(slug)
  }

  const invalidateAllContent = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allContent })
    optimizedClient.invalidateCache()
  }

  const getCacheStats = () => {
    const reactQueryCache = queryClient.getQueryCache().getAll().map(query => ({
      key: JSON.stringify(query.queryKey),
      dataUpdatedAt: query.state.dataUpdatedAt,
      status: query.state.status,
      fetchStatus: query.state.fetchStatus,
    }))

    const sanityCache = optimizedClient.getCacheStats()

    return {
      reactQuery: {
        size: reactQueryCache.length,
        queries: reactQueryCache,
      },
      sanity: sanityCache,
    }
  }

  return {
    invalidateWorkProjects,
    invalidatePlaygroundExperiments,
    invalidateContentBySlug,
    invalidateAllContent,
    getCacheStats,
  }
}

// Background refresh hook for keeping data fresh
export const useBackgroundRefresh = () => {
  const queryClient = useQueryClient()

  const setupBackgroundRefresh = () => {
    // Refresh critical data every 10 minutes in the background
    const interval = setInterval(() => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.workProjects,
        refetchType: 'none' // Don't trigger loading states
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.playgroundExperiments,
        refetchType: 'none'
      })
    }, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }

  return { setupBackgroundRefresh }
}
