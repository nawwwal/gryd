
import { ContentItem, WorkProject, PlaygroundExperiment, ContentMetadata } from '../types/content';

// Mock content loader - in a real implementation, this would read from files
export const loadWorkProjects = async (): Promise<WorkProject[]> => {
  // This would normally read from /content/work/projects/ directory
  const mockProjects: WorkProject[] = [
    {
      slug: 'tamed-tax-chaos',
      title: 'tamed tax chaos',
      subtitle: 'rebuilt checkout flow from scratch',
      description: 'users were abandoning carts because tax calculation took forever. fixed it in 72 hours.',
      timeline: '3 days',
      impact: '$50k/month saved',
      content: 'Full MDX content would be loaded here...',
      metadata: {
        type: 'prototype',
        category: 'product design',
        status: 'live',
        featured: true,
        publishDate: '2024-01-15',
        lastUpdated: '2024-01-20',
        tools: ['Figma', 'React', 'Analytics'],
        tags: ['conversion', 'checkout', 'performance'],
        difficulty: 'Advanced',
        assets: {
          hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
          gallery: []
        },
        interactive: {
          hasDemo: false
        }
      }
    }
  ];
  
  return mockProjects;
};

export const loadPlaygroundExperiments = async (): Promise<PlaygroundExperiment[]> => {
  // This would normally read from /content/playground/experiments/ directory
  const mockExperiments: PlaygroundExperiment[] = [
    {
      slug: 'css-toy-01',
      title: 'css toy 01',
      subtitle: 'buttons that morph into loading states without javascript',
      description: 'buttons that morph into loading states without javascript',
      content: 'Full MDX content would be loaded here...',
      intensity: 'high',
      visual: 'geometric',
      metadata: {
        type: 'code',
        category: 'Frontend Engineering',
        status: 'live',
        featured: false,
        publishDate: '2024-12-01',
        lastUpdated: '2024-12-01',
        tools: ['CSS', 'HTML'],
        tags: ['animation', 'css', 'ui'],
        difficulty: 'Advanced',
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: true,
          demoUrl: '#',
          codeUrl: '#'
        }
      }
    }
  ];
  
  return mockExperiments;
};

export const getContentBySlug = async (slug: string, type: 'work' | 'playground'): Promise<ContentItem | null> => {
  if (type === 'work') {
    const projects = await loadWorkProjects();
    return projects.find(p => p.slug === slug) || null;
  } else {
    const experiments = await loadPlaygroundExperiments();
    return experiments.find(e => e.slug === slug) || null;
  }
};

export const getAllContentByType = async (contentType: ContentMetadata['type']): Promise<ContentItem[]> => {
  const [projects, experiments] = await Promise.all([
    loadWorkProjects(),
    loadPlaygroundExperiments()
  ]);
  
  const allContent = [...projects, ...experiments];
  return allContent.filter(item => item.metadata.type === contentType);
};
