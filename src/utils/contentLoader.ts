import client from '../lib/sanityClient'
import { ContentItem, WorkProject, PlaygroundExperiment, ContentMetadata } from '../types/content'

export const loadWorkProjects = async (): Promise<WorkProject[]> => {
  const query = `*[_type == "workProject"]|order(publishDate desc){
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
  const query = `*[_type == "playgroundExperiment"]|order(publishDate desc){
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
  const docType = type === 'work' ? 'workProject' : 'playgroundExperiment'
  const query = `*[_type == "${docType}" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    subtitle,
    description,
    timeline,
    impact,
    intensity,
    visual,
    content,
    metadata
  }`
  const result = await client.fetch(query, { slug })
  return result || null
}

export const getAllContentByType = async (contentType: ContentMetadata['type']): Promise<ContentItem[]> => {
  const query = `*[_type in ["workProject","playgroundExperiment"] && metadata.type == $contentType]{
    "slug": slug.current,
    title,
    subtitle,
    description,
    timeline,
    impact,
    intensity,
    visual,
    content,
    metadata
  }`
  return await client.fetch(query, { contentType })
}
