
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
  assets: {
    hero?: string;
    gallery?: string[];
    downloads?: string[];
  };
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
}

export interface WorkProject extends ContentItem {
  timeline: string;
  impact: string;
}

export interface PlaygroundExperiment extends ContentItem {
  intensity: 'low' | 'medium' | 'high';
  visual: 'geometric' | 'photographic' | 'interactive' | 'analytical' | 'colorful' | 'technical' | 'motion' | 'typographic';
}
