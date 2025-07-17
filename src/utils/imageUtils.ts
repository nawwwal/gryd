import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import type { SanityImage, SanityImageAsset, SanityFile } from '../types/content'

// Validate required environment variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.SANITY_API_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || import.meta.env.SANITY_API_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing required Sanity project ID. Please set VITE_SANITY_PROJECT_ID or SANITY_API_PROJECT_ID environment variable.'
  )
}

// Create a basic client specifically for image URL building
const imageClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(imageClient)

/**
 * Checks if the asset is an SVG.
 *
 * @param source - The image source object.
 * @returns True if the image is an SVG, false otherwise.
 */
function isSvg(source: SanityImage | SanityImageAsset | string): boolean {
  if (typeof source === 'string') {
    return source.endsWith('.svg')
  }
  const asset = 'asset' in source ? source.asset : source
  return asset?.url?.endsWith('.svg') || false
}

export function urlFor(source: SanityImage | SanityImageAsset | string) {
  const asset = 'asset' in source ? source.asset : source

  if (isSvg(source) && asset && 'url' in asset) {
    // For SVGs, we return a simple object that has a `url()` method,
    // mimicking the builder but just returning the direct URL.
    return {
      url: () => asset.url,
    }
  }
  return builder.image(source)
}

/**
 * Generates an optimized image URL from a Sanity image source.
 * This function simplifies the previous implementation by removing complex adaptive logic
 * and focusing on delivering high-quality images.
 *
 * @param image - The Sanity image asset or object.
 * @param options - Configuration for the image URL.
 * @returns A URL string or null if the image is invalid.
 */
export function getOptimizedImageUrl(
  image: SanityImage | SanityImageAsset | null | undefined,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
  } = {}
): string | null {
  if (!image) return null

  const imageRef = 'asset' in image ? image.asset : image
  if (!imageRef) return null

  // If the image is an SVG, return its direct URL
  if (isSvg(imageRef)) {
    return imageRef.url || null
  }

  const { width, height, quality = 90, format = 'webp' } = options

  try {
    let imageBuilder = builder.image(imageRef).auto('format').format(format).quality(quality)

    if (width) {
      imageBuilder = imageBuilder.width(Math.round(width))
    }

    if (height) {
      imageBuilder = imageBuilder.height(Math.round(height))
    }

    return imageBuilder.url()
  } catch (error) {
    console.warn('Failed to generate optimized image URL:', error)
    // Fallback to a basic URL if optimization fails
    try {
      return builder.image(imageRef).url()
    } catch (fallbackError) {
      console.warn('Fallback image URL generation also failed:', fallbackError)
      return null
    }
  }
}
export const getSanityImageUrl = getOptimizedImageUrl

// Get file URL for attachments
export function getFileUrl(file: SanityFile | null | undefined): string | null {
  if (!file?.asset?.url) return null
  return file.asset.url
}

// Get responsive image URLs for different screen sizes
export function getResponsiveImageUrls(
  image: SanityImage | SanityImageAsset | null | undefined
) {
  if (!image) return {}

  return {
    mobile: getOptimizedImageUrl(image, { width: 480 }),
    tablet: getOptimizedImageUrl(image, { width: 768 }),
    desktop: getOptimizedImageUrl(image, { width: 1200 }),
    large: getOptimizedImageUrl(image, { width: 1920 })
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
  options: {
    baseWidth?: number
  } = {}
): string {
  if (!image) return ''

  const { baseWidth } = options

  const widths = baseWidth
    ? [
        Math.round(baseWidth * 0.5),  // 0.5x
        baseWidth,                    // 1x
        Math.round(baseWidth * 1.5),  // 1.5x
        Math.round(baseWidth * 2),    // 2x
      ]
    : [320, 480, 768, 1024, 1200, 1920]

  try {
    return widths
      .map(width => {
        const url = getOptimizedImageUrl(image, {
          width
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
          quality: 80
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

  // Handle both direct asset references and full image objects
  const imageRef = 'asset' in image ? image.asset : image
  if (!imageRef) return null

  try {
    return builder.image(imageRef)
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
