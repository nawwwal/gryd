import client from '../lib/sanityClient'
import { ContentItem, WorkProject, PlaygroundExperiment, ContentMetadata } from '../types/content'

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

export const loadPlaygroundExperiments = async (): Promise<PlaygroundExperiment[]> => {
  const query = `*[_type == "playgroundExperiment"]|order(metadata.publishDate desc){
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

export const getContentBySlug = async (slug: string, type: 'work' | 'playground'): Promise<WorkProject | PlaygroundExperiment | null> => {
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
    const query = `*[_type == "playgroundExperiment" && slug.current == $slug][0]{
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
    return (result as PlaygroundExperiment) || {
      slug: slug || '',
      title: '',
      subtitle: '',
      description: '',
      intensity: 'low' as const,
      visual: 'geometric' as const,
      metadata: {
        type: 'prototype' as const,
        category: '',
        status: 'draft' as const,
        featured: false,
        publishDate: '',
        lastUpdated: '',
        tags: [],
        tools: []
      }
    } as PlaygroundExperiment
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
  const playgroundQuery = `*[_type == "playgroundExperiment" && metadata.type == $contentType]{
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

  const [workResults, playgroundResults] = await Promise.all([
    client.fetch(workQuery, { contentType }),
    client.fetch(playgroundQuery, { contentType })
  ])

  const workArray = Array.isArray(workResults) ? workResults : [];
  const playgroundArray = Array.isArray(playgroundResults) ? playgroundResults : [];
  return [...workArray, ...playgroundArray]
}
