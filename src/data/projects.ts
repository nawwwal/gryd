import { WorkProject } from '../types/content';
import { getWorkProjects } from './contentStore';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  year: string;
  timeline: string;
  impact: string;
  featured: boolean;
  content: { type: string; content: string }[];
}

const mapToLegacyProject = (project: WorkProject): Project => ({
  slug: project.slug,
  title: project.title,
  subtitle: project.subtitle,
  description: project.description,
  image: project.metadata.assets.hero || '',
  category: project.metadata.category,
  year: new Date(project.metadata.publishDate).getFullYear().toString(),
  timeline: project.timeline,
  impact: project.impact,
  featured: project.metadata.featured,
  content: [{ type: 'text', content: project.content }]
});

export const getProjects = async (): Promise<Project[]> => {
  const workProjects = await getWorkProjects();
  return workProjects.map(mapToLegacyProject);
};

