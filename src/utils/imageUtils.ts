import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import type { SanityImage, SanityImageAsset, SanityFile } from '../types/content'
// Temporarily commented out to fix image loading issues
// import { CONNECTION_QUALITY } from './serviceWorker'

// Create a basic client specifically for image URL building
const imageClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.SANITY_API_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || import.meta.env.SANITY_API_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(imageClient)

// Device pixel ratio detection
const getDevicePixelRatio = (): number => {
  return typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
}

// Adaptive image quality based on connection
const getAdaptiveQuality = (): number => {
  if (typeof window === 'undefined') return 80

  try {
    // Temporarily use simplified connection detection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

    if (connection) {
      if (connection.saveData || connection.effectiveType === 'slow-2g') {
        return 40 // Very low quality for data saver mode
      } else if (connection.effectiveType === '2g') {
        return 50 // Low quality for 2G
      } else if (connection.effectiveType === '3g') {
        return 70 // Medium quality for 3G
      }
    }

    return 85 // High quality for 4G and above
  } catch (error) {
    console.warn('Failed to get adaptive quality, using default:', error)
    return 80 // Safe default
  }
}

// Get optimal format based on browser support
const getOptimalFormat = (): 'webp' | 'jpg' => {
  if (typeof window === 'undefined') return 'webp' // Default to webp for SSR

  // Check for WebP support
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const webpSupport = canvas.toDataURL('image/webp').startsWith('data:image/webp')
    return webpSupport ? 'webp' : 'jpg'
  } catch (error) {
    console.warn('Failed to detect WebP support, using default:', error)
    return 'webp' // Safe default
  }
}

export function urlFor(source: SanityImage | SanityImageAsset | string) {
  return builder.image(source)
}

// Helper function to get optimized image URLs with adaptive loading
export function getOptimizedImageUrl(
  image: SanityImage | SanityImageAsset | null | undefined,
  options: {
    width?: number
    height?: number
    format?: 'webp' | 'jpg' | 'png'
    quality?: number
    crop?: 'center' | 'top' | 'bottom' | 'left' | 'right'
    adaptive?: boolean // New option for adaptive loading
    dpr?: number // Manual device pixel ratio override
  } = {}
): string | null {
  if (!image) return null

  // Handle both direct asset references and full image objects
  const imageRef = image.asset || image

  if (!imageRef) return null

    const {
    width = 800,
    height,
    format = 'webp',
    quality = 80,
    crop = 'center',
    adaptive = false, // Default to false to maintain compatibility
    dpr = 1 // Default to 1 to avoid issues
  } = options

  try {
    let imageBuilder = urlFor(imageRef)

    // Apply basic dimensions - simplified approach
    if (width) {
      imageBuilder = imageBuilder.width(width)
    }

    if (height) {
      imageBuilder = imageBuilder.height(height)
      if (crop) {
        imageBuilder = imageBuilder.crop(crop)
      }
    }

    // Apply format and quality - simplified approach
    imageBuilder = imageBuilder
      .format(format)
      .quality(quality)

    return imageBuilder.url()
  } catch (error) {
    console.warn('Failed to generate image URL:', error)

    // Fallback: try basic URL generation
    try {
      return urlFor(imageRef).width(width || 800).url()
    } catch (fallbackError) {
      console.warn('Fallback image URL generation also failed:', fallbackError)
      return null
    }
  }
}

// Alias for consistency with component usage
export const getSanityImageUrl = getOptimizedImageUrl

// Get file URL for attachments
export function getFileUrl(file: SanityFile | null | undefined): string | null {
  if (!file?.asset?.url) return null
  return file.asset.url
}

// Get responsive image URLs for different screen sizes
export function getResponsiveImageUrls(image: SanityImage | SanityImageAsset | null | undefined) {
  if (!image) return {}

  return {
    mobile: getOptimizedImageUrl(image, { width: 480, format: 'webp' }),
    tablet: getOptimizedImageUrl(image, { width: 768, format: 'webp' }),
    desktop: getOptimizedImageUrl(image, { width: 1200, format: 'webp' }),
    large: getOptimizedImageUrl(image, { width: 1920, format: 'webp' })
  }
}

// Get image metadata
export function getImageMetadata(image: SanityImage | null | undefined) {
  if (!image?.asset) return null

  return {
    alt: image.alt || '',
    caption: image.caption || '',
    dimensions: image.asset.metadata?.dimensions,
    hotspot: image.hotspot,
    palette: image.asset.metadata?.palette
  }
}

// Generate image srcset for responsive images with adaptive optimization
export function generateSrcSet(
  image: SanityImage | SanityImageAsset | null | undefined,
  baseWidth?: number
): string {
  if (!image) return ''

  const widths = baseWidth
    ? [
        Math.round(baseWidth * 0.5),  // 0.5x
        baseWidth,                    // 1x
        Math.round(baseWidth * 1.5),  // 1.5x
        Math.round(baseWidth * 2),    // 2x
      ]
    : [320, 480, 768, 1024, 1200, 1920]

  try {
    const format = getOptimalFormat()
    const quality = getAdaptiveQuality()

    return widths
      .map(width => {
        const url = getOptimizedImageUrl(image, {
          width,
          format,
          quality,
          adaptive: false // Use safe mode for srcset generation
        })
        return url ? `${url} ${width}w` : null
      })
      .filter(Boolean)
      .join(', ')
  } catch (error) {
    console.warn('Failed to generate srcset, using basic fallback:', error)

    // Fallback to basic srcset
    return widths
      .map(width => {
        const url = getOptimizedImageUrl(image, {
          width,
          format: 'webp',
          quality: 80,
          adaptive: false
        })
        return url ? `${url} ${width}w` : null
      })
      .filter(Boolean)
      .join(', ')
  }
}

// Get low quality image placeholder (LQIP)
export function getLQIP(image: SanityImage | SanityImageAsset | null | undefined): string | null {
  if (!image) return null

  const imageRef = image.asset || image
  if (!imageRef) return null

  try {
    return urlFor(imageRef)
      .width(40)
      .height(30)
      .quality(20)
      .blur(10)
      .url()
  } catch (error) {
    console.warn('Failed to generate LQIP:', error)
    return null
  }
}

// Preload critical images
export function preloadImage(src: string, options?: {
  as?: 'image'
  crossorigin?: 'anonymous' | 'use-credentials'
}): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = options?.as || 'image'
    link.href = src

    if (options?.crossorigin) {
      link.crossOrigin = options.crossorigin
    }

    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`))

    document.head.appendChild(link)
  })
}

// Image optimization presets for different use cases
export const IMAGE_PRESETS = {
  thumbnail: { width: 200, height: 150, quality: 75 },
  card: { width: 400, height: 300, quality: 80 },
  hero: { width: 1200, height: 600, quality: 85 },
  gallery: { width: 800, height: 600, quality: 90 },
  avatar: { width: 100, height: 100, quality: 80, crop: 'center' as const },
} as const

// Get optimized image URL with preset
export function getPresetImageUrl(
  image: SanityImage | SanityImageAsset | null | undefined,
  preset: keyof typeof IMAGE_PRESETS,
  overrides?: Partial<typeof IMAGE_PRESETS[keyof typeof IMAGE_PRESETS]>
): string | null {
  if (!image) return null

  const config = { ...IMAGE_PRESETS[preset], ...overrides }
  return getOptimizedImageUrl(image, config)
}
