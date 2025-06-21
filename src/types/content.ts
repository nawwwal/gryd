// Sanity Image Types
export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
    palette?: {
      dominant?: {
        background?: string
        foreground?: string
      }
      darkMuted?: {
        background?: string
        foreground?: string
      }
      lightVibrant?: {
        background?: string
        foreground?: string
      }
      darkVibrant?: {
        background?: string
        foreground?: string
      }
      vibrant?: {
        background?: string
        foreground?: string
      }
      muted?: {
        background?: string
        foreground?: string
      }
    }
    lqip?: string
    blurHash?: string
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityFileAsset {
  _id: string
  url: string
  originalFilename?: string
  size?: number
}

export interface SanityFile {
  asset: SanityFileAsset
  title?: string
  description?: string
}

export interface ContentMetadata {
  type: 'photography' | 'code' | 'blog' | 'prototype' | 'research' | 'visual' | 'note';
  category: string;
  status: 'live' | 'prototype' | 'archived' | 'ongoing' | 'draft';
  featured: boolean;
  publishDate: string;
  lastUpdated: string;
  tools: string[];
  tags: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  interactive?: {
    hasDemo: boolean;
    demoUrl?: string;
    codeUrl?: string;
  };
}

export interface ContentItem {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  metadata: ContentMetadata;
  content: string;
  heroImage?: SanityImage;
  gallery?: SanityImage[];
  attachments?: SanityFile[];
}

export interface WorkProject extends ContentItem {
  timeline: string;
  impact: string;
}

export interface PlaygroundExperiment extends ContentItem {
  intensity: 'low' | 'medium' | 'high';
  visual: 'geometric' | 'photographic' | 'interactive' | 'analytical' | 'colorful' | 'technical' | 'motion' | 'typographic';
}
