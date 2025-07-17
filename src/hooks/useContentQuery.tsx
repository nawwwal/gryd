import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanityClient';
import type { WorkProject, PlaygroundExperiment } from '../types/content';

// Default query options for optimal performance
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes (garbage collection time)
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true,
  retry: (failureCount: number, error: any) => {
    // Don't retry on client errors (4xx), but retry on server errors (5xx) and network errors
    if (error?.status >= 400 && error?.status < 500) return false;
    return failureCount < 3;
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
};

// Common fields for all content types
const COMMON_FIELDS = `
  _id,
  title,
  subtitle,
  slug,
  description,
  content,
  contentLegacy,
  heroImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        palette,
        lqip,
        blurHash
      }
    },
    alt,
    hotspot
  },
  gallery[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        palette,
        lqip,
        blurHash
      }
    },
    alt,
    caption,
    hotspot
  },
  attachments[] {
    asset->{
      _id,
      url,
      originalFilename,
      size
    },
    title,
    description
  },
  metadata {
    category,
    status,
    featured,
    publishDate,
    lastUpdated,
    tools,
    tags,
    interactive {
      hasLiveVersion,
      liveUrl
    }
  }
`;

// Work Projects Query
const WORK_PROJECTS_QUERY = `*[_type == "workProject"] | order(metadata.publishDate desc) {
  ${COMMON_FIELDS}
}`;

// Playground Experiments Query
const PLAYGROUND_EXPERIMENTS_QUERY = `*[_type == "playgroundExperiment"] | order(metadata.publishDate desc) {
  ${COMMON_FIELDS},
  intensity,
  visual
}`;

// Single content item by slug and type
const CONTENT_BY_SLUG_QUERY = (type: 'work' | 'playground') => `
  *[_type == "${type === 'work' ? 'workProject' : 'playgroundExperiment'}" && slug.current == $slug][0] {
    ${COMMON_FIELDS}
    ${type === 'work' ? '' : ', intensity, visual'}
  }
`;

// Content by metadata category
const CONTENT_BY_TYPE_QUERY = (contentType: 'work' | 'playground') => `
  *[(_type == "workProject" || _type == "playgroundExperiment") && metadata.category == $contentCategory] | order(metadata.publishDate desc) {
    ${COMMON_FIELDS}
    ${contentType === 'work' ? '' : ', intensity, visual'}
  }
`;

// Featured content query
const FEATURED_CONTENT_QUERY = `*[(_type == "workProject" || _type == "playgroundExperiment") && metadata.featured == true] | order(metadata.publishDate desc) {
  ${COMMON_FIELDS}
}`;

// All content queries
const QUERIES = {
  workProjects: WORK_PROJECTS_QUERY,
  playgroundExperiments: PLAYGROUND_EXPERIMENTS_QUERY,
  contentBySlug: CONTENT_BY_SLUG_QUERY,
  contentByType: CONTENT_BY_TYPE_QUERY,
  featuredContent: FEATURED_CONTENT_QUERY,
} as const;

// Hook for work projects
export const useWorkProjects = () => {
  return useQuery<WorkProject[]>({
    queryKey: ['workProjects'],
    queryFn: () => sanityClient.fetch(QUERIES.workProjects),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

// Hook for playground experiments
export const usePlaygroundExperiments = () => {
  return useQuery<PlaygroundExperiment[]>({
    queryKey: ['playgroundExperiments'],
    queryFn: () => sanityClient.fetch(QUERIES.playgroundExperiments),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

// Hook for single content item by slug
export const useContentBySlug = (type: 'work' | 'playground', slug: string) => {
  return useQuery<WorkProject | PlaygroundExperiment | null>({
    queryKey: ['content', type, slug],
    queryFn: () => sanityClient.fetch(QUERIES.contentBySlug(type), { slug }),
    enabled: !!slug,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

// Hook for content by category
export const useContentByType = (contentCategory: string) => {
  return useQuery<(WorkProject | PlaygroundExperiment)[]>({
    queryKey: ['contentByType', contentCategory],
    queryFn: () => sanityClient.fetch(QUERIES.contentByType('work'), { contentCategory }),
    enabled: !!contentCategory,
    ...DEFAULT_QUERY_OPTIONS,
  });
};

// Hook for featured content
export const useFeaturedContent = () => {
  return useQuery<(WorkProject | PlaygroundExperiment)[]>({
    queryKey: ['featuredContent'],
    queryFn: () => sanityClient.fetch(QUERIES.featuredContent),
    ...DEFAULT_QUERY_OPTIONS,
  });
};

// Hook for prefetching content
export const usePrefetchContent = () => {
  const queryClient = useQueryClient();

  const prefetchWorkProjects = () => {
    queryClient.prefetchQuery({
      queryKey: ['workProjects'],
      queryFn: () => sanityClient.fetch(QUERIES.workProjects),
      ...DEFAULT_QUERY_OPTIONS,
    });
  };

  const prefetchPlaygroundExperiments = () => {
    queryClient.prefetchQuery({
      queryKey: ['playgroundExperiments'],
      queryFn: () => sanityClient.fetch(QUERIES.playgroundExperiments),
      ...DEFAULT_QUERY_OPTIONS,
    });
  };

  const prefetchContentBySlug = (type: 'work' | 'playground', slug: string) => {
    queryClient.prefetchQuery({
      queryKey: ['content', type, slug],
      queryFn: () => sanityClient.fetch(QUERIES.contentBySlug(type), { slug }),
      ...DEFAULT_QUERY_OPTIONS,
    });
  };

  return {
    prefetchWorkProjects,
    prefetchPlaygroundExperiments,
    prefetchContentBySlug,
  };
};

// Cache management hook
export const useCacheManager = () => {
  const queryClient = useQueryClient();

  const invalidateContent = (type?: 'work' | 'playground') => {
    if (type) {
      queryClient.invalidateQueries({
        queryKey: type === 'work' ? ['workProjects'] : ['playgroundExperiments']
      });
    } else {
      queryClient.invalidateQueries({ queryKey: ['workProjects'] });
      queryClient.invalidateQueries({ queryKey: ['playgroundExperiments'] });
    }
  };

  const clearCache = () => {
    queryClient.clear();
  };

  const getCacheStats = () => {
    const cache = queryClient.getQueryCache();
    return {
      queries: cache.getAll().length,
      size: cache.getAll().reduce((acc, query) => acc + (query.state.dataUpdatedAt || 0), 0)
    };
  };

  return {
    invalidateContent,
    clearCache,
    getCacheStats,
  };
};
