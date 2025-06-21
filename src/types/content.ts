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

// Rich Content Block Types
export interface ContentBlock {
  _type: string;
  _key: string;
}

export interface TextBlock extends ContentBlock {
  _type: 'block';
  style?: 'normal' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
}

export interface CodeDemoBlock extends ContentBlock {
  _type: 'codeDemo';
  title?: string;
  language?: string;
  code: string;
  description?: string;
}

export interface ImageGalleryBlock extends ContentBlock {
  _type: 'imageGallery';
  title?: string;
  layout?: 'grid' | 'masonry' | 'carousel' | 'before-after';
  images: SanityImage[];
  caption?: string;
}

export interface VideoEmbedBlock extends ContentBlock {
  _type: 'videoEmbed';
  title?: string;
  url: string;
  caption?: string;
  autoplay?: boolean;
}

export interface ProjectTimelineBlock extends ContentBlock {
  _type: 'projectTimeline';
  title?: string;
  events: Array<{
    date: string;
    title: string;
    description?: string;
    status: 'completed' | 'in-progress' | 'planned' | 'cancelled';
  }>;
}

export interface TechStackBlock extends ContentBlock {
  _type: 'techStack';
  title?: string;
  categories: Array<{
    category: string;
    technologies: Array<{
      name: string;
      description?: string;
      icon?: SanityImage;
      color?: string;
    }>;
  }>;
}

export interface CalloutBlock extends ContentBlock {
  _type: 'callout';
  type?: 'info' | 'warning' | 'success' | 'error' | 'note';
  title?: string;
  content: string;
}

export interface ImageBlock extends ContentBlock {
  _type: 'image';
  asset: SanityImageAsset;
  alt?: string;
  caption?: string;
}

// Union type for all content blocks
export type RichContentBlock =
  | TextBlock
  | CodeDemoBlock
  | ImageGalleryBlock
  | VideoEmbedBlock
  | ProjectTimelineBlock
  | TechStackBlock
  | CalloutBlock
  | ImageBlock;

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
  // Support both legacy and new content formats
  content?: RichContentBlock[]; // New rich content format
  contentLegacy?: string; // Legacy markdown string (fallback)
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
