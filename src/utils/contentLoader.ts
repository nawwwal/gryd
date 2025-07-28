import client from '../lib/sanityClient'
import { ContentItem, WorkProject, PlaygroundEntry, ContentMetadata } from '../types/content'

export const loadWorkProjects = async (): Promise<WorkProject[]> => {
  const query = `*[_type == "workProject"]|order(metadata.publishDate desc){
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
        metadata
      },
      alt,
      hotspot
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata
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
  }`
  return await client.fetch(query)
}

export const loadPlaygroundEntries = async (): Promise<PlaygroundEntry[]> => {
  const query = `*[_type == "playgroundEntry"]|order(metadata.publishDate desc){
    "slug": slug.current,
    title,
    entryType,
    coverImage{
      asset->{
        _id,
        url,
        metadata
      },
      alt,
      hotspot
    },
    description,
    content,
    metadata
  }`
  return await client.fetch(query)
}

export const getContentBySlug = async (slug: string, type: 'work' | 'playground'): Promise<WorkProject | PlaygroundEntry | null> => {
  if (type === 'work') {
    const query = `*[_type == "workProject" && slug.current == $slug][0]{
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
          metadata
        },
        alt,
        hotspot
      },
      gallery[]{
        asset->{
          _id,
          url,
          metadata
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
    }`
    const result = await client.fetch(query, { slug })
    return (result as WorkProject) || {
      slug: slug || '',
      title: '',
      subtitle: '',
      description: '',
      timeline: '',
      impact: '',
      metadata: {
        type: 'blog' as const,
        category: '',
        status: 'draft' as const,
        featured: false,
        publishDate: '',
        lastUpdated: '',
        tags: [],
        tools: []
      }
    } as WorkProject
  } else {
    const query = `*[_type == "playgroundEntry" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      entryType,
      coverImage{
        asset->{
          _id,
          url,
          metadata
        },
        alt,
        hotspot
      },
      description,
      content,
      metadata
    }`
    const result = await client.fetch(query, { slug })
    return (result as PlaygroundEntry) || {
      slug: slug || '',
      title: '',
      entryType: 'article' as const,
      description: '',
      metadata: {
        publishDate: '',
        tags: [],
      }
    } as PlaygroundEntry
  }
}

export const getAllContentByType = async (contentType: ContentMetadata['type']): Promise<ContentItem[]> => {
  // Fetch work projects
  const workQuery = `*[_type == "workProject" && metadata.type == $contentType]{
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
        metadata
      },
      alt,
      hotspot
    },
    gallery[]{
      asset->{
        _id,
        url,
        metadata
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
  }`

  // Fetch playground experiments
  const playgroundQuery = `*[_type == "playgroundEntry" && metadata.type == $contentType]{
    "slug": slug.current,
    title,
    entryType,
    coverImage{
        asset->{
            _id,
            url,
            metadata
        },
        alt,
        hotspot
    },
    description,
    content,
    metadata
  }`

  const [workResults, playgroundResults] = await Promise.all([
    client.fetch(workQuery, { contentType }),
    client.fetch(playgroundQuery, { contentType })
  ])

  const workArray = Array.isArray(workResults) ? workResults : [];
  const playgroundArray = Array.isArray(playgroundResults) ? playgroundResults : [];
  return [...workArray, ...playgroundArray]
}
