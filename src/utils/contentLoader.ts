import { ContentItem, ContentMetadata, WorkProject, PlaygroundExperiment } from '../types/content';
import {
  getWorkProjects,
  getPlaygroundExperiments,
  getContentBySlug as storeGetContentBySlug,
  getAllContentByType as storeGetAllContentByType
} from '../data/contentStore';

export const loadWorkProjects = async (): Promise<WorkProject[]> => {
  return getWorkProjects();
};

export const loadPlaygroundExperiments = async (): Promise<PlaygroundExperiment[]> => {
  return getPlaygroundExperiments();
};

export const getContentBySlug = async (slug: string, type: 'work' | 'playground'): Promise<ContentItem | null> => {
  return storeGetContentBySlug(slug, type);
};

export const getAllContentByType = async (contentType: ContentMetadata['type']): Promise<ContentItem[]> => {
  return storeGetAllContentByType(contentType);
};

