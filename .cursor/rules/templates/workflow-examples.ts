/**
 * Workflow Examples for THE GRYD Content Management
 * Reference implementations for content optimization and workflows
 */

// ==========================================================================
// CONTENT LOADING UTILITIES
// ==========================================================================

import { useState, useEffect, useRef, useCallback } from 'react'

// Cache duration configuration
export const CACHE_DURATIONS = {
  workProjects: 10 * 60 * 1000,      // 10 minutes
  playgroundExperiments: 10 * 60 * 1000,
  contentBySlug: 15 * 60 * 1000,     // 15 minutes
  sanityClient: 5 * 60 * 1000        // 5 minutes
}

// React Query default options
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000,          // 5 minutes
  gcTime: 30 * 60 * 1000,            // 30 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: false
}

// ==========================================================================
// IMAGE OPTIMIZATION UTILITIES
// ==========================================================================

// Adaptive quality based on network conditions
export const getOptimalImageQuality = (): number => {
  const connection = (navigator as any).connection
  if (!connection) return 75

  const { effectiveType, downlink } = connection

  if (effectiveType === '4g' && downlink > 5) return 85
  if (effectiveType === '4g') return 75
  if (effectiveType === '3g') return 60
  return 40
}

// Image URL builder with optimization
export const buildOptimizedImageUrl = (source: any, width: number): string => {
  const quality = getOptimalImageQuality()
  return urlFor(source)
    .width(width)
    .format('webp')
    .quality(quality)
    .url()
}

// Progressive image loading hook
export const useProgressiveImage = (src: string, placeholder?: string) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const imageToLoad = new Image()
    imageToLoad.src = src

    imageToLoad.onload = () => {
      setCurrentSrc(src)
      setLoading(false)
    }

    imageToLoad.onerror = () => {
      setError(true)
      setLoading(false)
    }
  }, [src])

  return { currentSrc, loading, error }
}

// ==========================================================================
// CONTENT LAZY LOADING
// ==========================================================================

// Lazy loading with intersection observer
export const useContentLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Unobserve after loading to prevent re-triggers
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      { threshold, rootMargin: '50px' }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ==========================================================================
// CONTENT QUALITY VALIDATION
// ==========================================================================

interface ContentQualityCheck {
  hasTitle: boolean
  hasDescription: boolean
  hasProperImages: boolean
  hasAltText: boolean
  meetsMinLength: boolean
  hasValidCode: boolean
}

export const validateContentQuality = (content: any): ContentQualityCheck => {
  return {
    hasTitle: Boolean(content.title?.length > 3),
    hasDescription: Boolean(content.description?.length > 10),
    hasProperImages: content.images?.every((img: any) =>
      img.asset && img.alt && img.alt.length > 5
    ) || true,
    hasAltText: content.heroImage?.alt?.length > 5 || false,
    meetsMinLength: content.content?.length > 100 || false,
    hasValidCode: !content.content?.some((block: any) =>
      block._type === 'codeDemo' && !block.code
    ) || true
  }
}

// ==========================================================================
// PERFORMANCE MONITORING
// ==========================================================================

// Development-only performance monitoring
export const measurePerformance = <T>(name: string, fn: () => T): T => {
  if (process.env.NODE_ENV !== 'development') return fn()

  const start = performance.now()
  const result = fn()
  const end = performance.now()

  console.log(`${name}: ${end - start}ms`)
  return result
}

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return

  // Largest Contentful Paint
  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lcp = entries[entries.length - 1] as any
    console.log('LCP:', lcp.startTime)
  })
  observer.observe({ type: 'largest-contentful-paint', buffered: true })

  // Cumulative Layout Shift
  let clsValue = 0
  const clsObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries() as any[]) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    }
    console.log('CLS:', clsValue)
  })
  clsObserver.observe({ type: 'layout-shift', buffered: true })
}

// ==========================================================================
// CONTENT BACKUP UTILITIES
// ==========================================================================

// Export content for backup
export const exportContentBackup = async () => {
  try {
    const response = await fetch('/api/backup/export')
    const data = await response.json()

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gryd-backup-${new Date().toISOString().split('T')[0]}.json`
    link.click()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Backup export failed:', error)
  }
}

// ==========================================================================
// CONTENT MIGRATION UTILITIES
// ==========================================================================

// Migrate legacy markdown to rich content
export const migrateLegacyContent = (markdownContent: string) => {
  // Simple markdown to block conversion
  const blocks = []
  const lines = markdownContent.split('\n')

  let currentParagraph = ''

  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (currentParagraph) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph }]
        })
        currentParagraph = ''
      }
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: line.substring(2) }]
      })
    } else if (line.startsWith('## ')) {
      if (currentParagraph) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph }]
        })
        currentParagraph = ''
      }
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: line.substring(3) }]
      })
    } else if (line.trim() === '') {
      if (currentParagraph) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: currentParagraph }]
        })
        currentParagraph = ''
      }
    } else {
      currentParagraph += (currentParagraph ? ' ' : '') + line
    }
  }

  if (currentParagraph) {
    blocks.push({
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: currentParagraph }]
    })
  }

  return blocks
}

// ==========================================================================
// ANALYTICS AND INSIGHTS
// ==========================================================================

// Track content engagement
export const trackContentEngagement = (contentId: string, eventType: string) => {
  if (typeof window === 'undefined') return

  // Simple analytics tracking
  const event = {
    contentId,
    eventType,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  }

  // Send to analytics service
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  }).catch(error => console.error('Analytics tracking failed:', error))
}
