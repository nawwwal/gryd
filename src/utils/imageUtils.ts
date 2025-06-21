import imageUrlBuilder from '@sanity/image-url'
import client from '../lib/sanityClient'
import type { SanityImage, SanityImageAsset, SanityFile } from '../types/content'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage | SanityImageAsset | string) {
  return builder.image(source)
}

// Helper function to get optimized image URLs
export function getOptimizedImageUrl(
  image: SanityImage | SanityImageAsset | null | undefined,
  options: {
    width?: number
    height?: number
    format?: 'webp' | 'jpg' | 'png'
    quality?: number
    crop?: 'center' | 'top' | 'bottom' | 'left' | 'right'
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
    crop = 'center'
  } = options

  try {
    let imageBuilder = urlFor(imageRef)
      .width(width)
      .format(format)
      .quality(quality)

    if (height) {
      imageBuilder = imageBuilder.height(height).crop(crop)
    }

    return imageBuilder.url()
  } catch (error) {
    console.warn('Failed to generate image URL:', error)
    return null
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

// Generate image srcset for responsive images
export function generateSrcSet(image: SanityImage | SanityImageAsset | null | undefined): string {
  if (!image) return ''

  const widths = [320, 480, 768, 1024, 1200, 1920]

  return widths
    .map(width => {
      const url = getOptimizedImageUrl(image, { width, format: 'webp' })
      return `${url} ${width}w`
    })
    .join(', ')
}
