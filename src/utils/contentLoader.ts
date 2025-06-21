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
    metadata
  }`
  return await client.fetch(query)
}

export const getContentBySlug = async (slug: string, type: 'work' | 'playground'): Promise<ContentItem | null> => {
  if (type === 'work') {
    const query = `*[_type == "workProject" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      subtitle,
      description,
      timeline,
      impact,
      content,
      metadata
    }`
    const result = await client.fetch(query, { slug })
    return result || null
  } else {
    const query = `*[_type == "playgroundExperiment" && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      subtitle,
      description,
      intensity,
      visual,
      content,
      metadata
    }`
    const result = await client.fetch(query, { slug })
    return result || null
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
    metadata
  }`

  const [workResults, playgroundResults] = await Promise.all([
    client.fetch(workQuery, { contentType }),
    client.fetch(playgroundQuery, { contentType })
  ])

  return [...workResults, ...playgroundResults]
}
