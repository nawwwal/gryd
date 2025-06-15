import { ContentItem, WorkProject, PlaygroundExperiment, ContentMetadata } from '../types/content';

// Mock content loader - in a real implementation, this would read from files
export const loadWorkProjects = async (): Promise<WorkProject[]> => {
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
    },
    {
      slug: 'dashboard-redesign',
      title: 'dashboard autopsy',
      subtitle: 'turned data chaos into actionable insights',
      description: 'enterprise dashboard was overwhelming users with 47 metrics. reduced to 12 key indicators.',
      timeline: '6 weeks',
      impact: '40% faster task completion',
      content: 'Detailed case study content...',
      metadata: {
        type: 'research',
        category: 'data visualization',
        status: 'live',
        featured: true,
        publishDate: '2024-02-01',
        lastUpdated: '2024-02-15',
        tools: ['Tableau', 'Figma', 'User Research'],
        tags: ['dashboard', 'analytics', 'enterprise'],
        difficulty: 'Expert',
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: true,
          demoUrl: '#dashboard-demo'
        }
      }
    },
    {
      slug: 'mobile-payments',
      title: 'mobile payment flow',
      subtitle: 'made sending money feel like texting',
      description: 'complex peer-to-peer payment app simplified into 3-tap experience.',
      timeline: '4 weeks',
      impact: '200% increase in transactions',
      content: 'Mobile UX case study...',
      metadata: {
        type: 'prototype',
        category: 'mobile design',
        status: 'live',
        featured: false,
        publishDate: '2024-03-01',
        lastUpdated: '2024-03-10',
        tools: ['Sketch', 'Principle', 'InVision'],
        tags: ['mobile', 'payments', 'fintech'],
        difficulty: 'Advanced',
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: true,
          demoUrl: '#mobile-demo'
        }
      }
    }
  ];
  
  return mockProjects;
};

export const loadPlaygroundExperiments = async (): Promise<PlaygroundExperiment[]> => {
  const mockExperiments: PlaygroundExperiment[] = [
    {
      slug: 'css-toy-01',
      title: 'css toy 01',
      subtitle: 'buttons that morph into loading states without javascript',
      description: 'pure css animations that transform button states seamlessly',
      content: 'Interactive CSS demo and code walkthrough...',
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
          demoUrl: '#css-demo',
          codeUrl: '#css-code'
        }
      }
    },
    {
      slug: 'brutalist-photography',
      title: 'concrete stories',
      subtitle: 'brutalist architecture through a minimal lens',
      description: 'exploring the raw beauty of concrete structures across urban landscapes',
      content: 'Photography series with behind-the-scenes insights...',
      intensity: 'medium',
      visual: 'photographic',
      metadata: {
        type: 'photography',
        category: 'Architecture Photography',
        status: 'ongoing',
        featured: true,
        publishDate: '2024-11-15',
        lastUpdated: '2024-12-10',
        tools: ['Sony A7R IV', 'Lightroom', '35mm lens'],
        tags: ['architecture', 'brutalism', 'minimal'],
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: false
        }
      }
    },
    {
      slug: 'design-thinking-critique',
      title: 'design thinking is broken',
      subtitle: 'why most design processes fail in practice',
      description: 'a critical examination of design thinking methodology and its real-world limitations',
      content: 'Long-form analysis with case studies and alternative approaches...',
      intensity: 'high',
      visual: 'analytical',
      metadata: {
        type: 'blog',
        category: 'Design Criticism',
        status: 'draft',
        featured: false,
        publishDate: '2024-12-15',
        lastUpdated: '2024-12-15',
        tools: ['Research', 'Writing'],
        tags: ['design-thinking', 'methodology', 'critique'],
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: false
        }
      }
    },
    {
      slug: 'color-emotion-study',
      title: 'impossible colors',
      subtitle: 'palettes that shouldn\'t work but somehow do',
      description: 'exploring unconventional color combinations and their psychological impact',
      content: 'Interactive color theory exploration...',
      intensity: 'high',
      visual: 'colorful',
      metadata: {
        type: 'visual',
        category: 'Color Theory',
        status: 'live',
        featured: true,
        publishDate: '2024-11-01',
        lastUpdated: '2024-11-30',
        tools: ['Adobe Color', 'Figma', 'Eye Tracking'],
        tags: ['color', 'psychology', 'theory'],
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: true,
          demoUrl: '#color-demo'
        }
      }
    },
    {
      slug: 'micro-interactions',
      title: 'hover states that don\'t suck',
      subtitle: 'subtle animations that enhance rather than distract',
      description: 'collection of thoughtful micro-interactions for modern web interfaces',
      content: 'Interactive demo collection with implementation notes...',
      intensity: 'medium',
      visual: 'interactive',
      metadata: {
        type: 'prototype',
        category: 'Interaction Design',
        status: 'live',
        featured: false,
        publishDate: '2024-10-15',
        lastUpdated: '2024-12-01',
        tools: ['Framer', 'CSS', 'JavaScript'],
        tags: ['interactions', 'animation', 'ux'],
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: true,
          demoUrl: '#interactions-demo',
          codeUrl: '#interactions-code'
        }
      }
    },
    {
      slug: 'typography-research',
      title: 'reading patterns study',
      subtitle: 'how font choices affect comprehension speed',
      description: 'quantitative research on typography\'s impact on reading performance',
      content: 'Research methodology, findings, and recommendations...',
      intensity: 'low',
      visual: 'typographic',
      metadata: {
        type: 'research',
        category: 'Typography Research',
        status: 'archived',
        featured: false,
        publishDate: '2024-09-01',
        lastUpdated: '2024-09-30',
        tools: ['Eye Tracking', 'Statistics', 'Survey Tools'],
        tags: ['typography', 'research', 'reading'],
        assets: {
          hero: '',
          gallery: []
        },
        interactive: {
          hasDemo: false
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
