import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN, // We'll use the write token for posting data
  apiVersion: '2024-01-01',
  useCdn: false, // Don't use CDN for mutations
})

// Sample work projects data
const sampleWorkProjects = [
  {
    _type: 'workProject',
    title: 'Echo Design System',
    subtitle: 'Comprehensive design language for modern web applications',
    description: 'A scalable design system built with accessibility and performance in mind, featuring a complete component library and design tokens.',
    slug: {
      _type: 'slug',
      current: 'echo-design-system'
    },
    timeline: '6 months',
    impact: 'Reduced development time by 40% across 5 product teams',
    content: `
# Echo Design System

## Overview
The Echo Design System represents a comprehensive approach to creating consistent, accessible, and performant user interfaces across multiple product lines.

## Key Features
- **Component Library**: Over 50 reusable components
- **Design Tokens**: Systematic approach to colors, typography, and spacing
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for mobile and desktop

## Implementation
Built using React, TypeScript, and Storybook for documentation and testing.

## Results
- 40% reduction in development time
- Improved consistency across products
- Enhanced accessibility scores
- Better developer experience
    `,
    metadata: {
      type: 'code',
      category: 'Design Systems',
      status: 'live',
      featured: true,
      publishDate: '2024-03-15',
      lastUpdated: '2024-12-20',
      tools: ['React', 'TypeScript', 'Storybook', 'Figma'],
      tags: ['design-system', 'accessibility', 'react', 'components'],
      difficulty: 'Advanced',
      assets: {
        hero: '/placeholder.svg',
        gallery: ['/placeholder.svg'],
        downloads: []
      },
      interactive: {
        hasDemo: true,
        demoUrl: 'https://storybook.example.com',
        codeUrl: 'https://github.com/example/echo-design-system'
      }
    }
  },
  {
    _type: 'workProject',
    title: 'Mobile Commerce Platform',
    subtitle: 'Next-generation e-commerce experience for mobile devices',
    description: 'A progressive web app that delivers native-like shopping experiences with advanced personalization and AI-powered recommendations.',
    slug: {
      _type: 'slug',
      current: 'mobile-commerce-platform'
    },
    timeline: '8 months',
    impact: 'Increased mobile conversion rates by 65%',
    content: `
# Mobile Commerce Platform

## Challenge
Traditional e-commerce platforms struggled with mobile conversion rates and user engagement.

## Solution
Developed a progressive web app with:
- AI-powered product recommendations
- One-tap checkout process
- Offline browsing capabilities
- Advanced search and filtering

## Technology Stack
- React Native for cross-platform compatibility
- Node.js backend with GraphQL API
- Machine learning algorithms for personalization
- Progressive Web App (PWA) technologies

## Impact
- 65% increase in mobile conversion rates
- 40% improvement in user engagement
- 50% reduction in cart abandonment
    `,
    metadata: {
      type: 'code',
      category: 'E-commerce',
      status: 'live',
      featured: true,
      publishDate: '2024-02-10',
      lastUpdated: '2024-12-18',
      tools: ['React Native', 'Node.js', 'GraphQL', 'TensorFlow'],
      tags: ['mobile', 'e-commerce', 'pwa', 'ai'],
      difficulty: 'Expert',
      assets: {
        hero: '/placeholder.svg',
        gallery: ['/placeholder.svg'],
        downloads: []
      },
      interactive: {
        hasDemo: true,
        demoUrl: 'https://demo.mobilecommerce.example.com',
        codeUrl: 'https://github.com/example/mobile-commerce'
      }
    }
  }
]

// Sample playground experiments data
const samplePlaygroundExperiments = [
  {
    _type: 'playgroundExperiment',
    title: 'Fluid Typography Explorer',
    subtitle: 'Interactive tool for exploring responsive typography scales',
    description: 'A visual playground for experimenting with fluid typography using CSS clamp() and custom viewport units.',
    slug: {
      _type: 'slug',
      current: 'fluid-typography-explorer'
    },
    intensity: 'medium',
    visual: 'typographic',
    content: `
# Fluid Typography Explorer

## Concept
Typography that responds fluidly to viewport changes without discrete breakpoints.

## Implementation
Using CSS clamp() function to create smooth scaling between minimum and maximum font sizes:

\`\`\`css
font-size: clamp(1rem, 2.5vw, 2rem);
\`\`\`

## Features
- Real-time preview of typography scales
- Custom viewport testing
- Export CSS code
- Accessibility considerations

## Learning Outcomes
Understanding the mathematical relationships in fluid design and how to balance readability across devices.
    `,
    metadata: {
      type: 'prototype',
      category: 'Typography',
      status: 'prototype',
      featured: false,
      publishDate: '2024-01-20',
      lastUpdated: '2024-12-15',
      tools: ['CSS', 'JavaScript', 'HTML'],
      tags: ['typography', 'responsive', 'css', 'fluid-design'],
      difficulty: 'Intermediate',
      assets: {
        hero: '/placeholder.svg',
        gallery: ['/placeholder.svg'],
        downloads: []
      },
      interactive: {
        hasDemo: true,
        demoUrl: 'https://typography-explorer.example.com',
        codeUrl: 'https://codepen.io/example/fluid-typography'
      }
    }
  },
  {
    _type: 'playgroundExperiment',
    title: 'Generative Art with P5.js',
    subtitle: 'Algorithmic art generation using noise functions',
    description: 'Exploring the intersection of mathematics and creativity through procedural generation techniques.',
    slug: {
      _type: 'slug',
      current: 'generative-art-p5js'
    },
    intensity: 'high',
    visual: 'geometric',
    content: `
# Generative Art with P5.js

## Inspiration
Inspired by the work of Casey Reas and the Processing community.

## Technique
Using Perlin noise to create organic, flowing patterns:

\`\`\`javascript
function draw() {
  for (let x = 0; x < width; x += 10) {
    for (let y = 0; y < height; y += 10) {
      let noiseVal = noise(x * 0.01, y * 0.01, frameCount * 0.01);
      stroke(noiseVal * 255);
      point(x, y);
    }
  }
}
\`\`\`

## Exploration Areas
- Color palette generation
- Motion and animation
- User interaction
- Export capabilities

## Process
Documenting the iterative process of discovering interesting patterns and refining algorithms.
    `,
    metadata: {
      type: 'visual',
      category: 'Generative Art',
      status: 'ongoing',
      featured: true,
      publishDate: '2024-01-05',
      lastUpdated: '2024-12-10',
      tools: ['P5.js', 'JavaScript', 'Processing'],
      tags: ['generative-art', 'p5js', 'creative-coding', 'algorithms'],
      difficulty: 'Intermediate',
      assets: {
        hero: '/placeholder.svg',
        gallery: ['/placeholder.svg'],
        downloads: []
      },
      interactive: {
        hasDemo: true,
        demoUrl: 'https://generative-art.example.com',
        codeUrl: 'https://github.com/example/generative-art-p5'
      }
    }
  },
  {
    _type: 'playgroundExperiment',
    title: 'CSS Grid Masonry Layout',
    subtitle: 'Exploring CSS-only masonry layouts without JavaScript',
    description: 'Investigating the upcoming CSS Grid Level 3 masonry feature and alternative pure CSS approaches.',
    slug: {
      _type: 'slug',
      current: 'css-grid-masonry'
    },
    intensity: 'low',
    visual: 'geometric',
    content: `
# CSS Grid Masonry Layout

## Problem
Traditional masonry layouts require JavaScript libraries like Masonry.js or Isotope.

## CSS-Only Solution
Experimenting with CSS Grid and flexbox combinations to achieve masonry-like effects:

\`\`\`css
.masonry {
  columns: 4;
  column-gap: 1rem;
  break-inside: avoid;
}

.masonry-item {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
}
\`\`\`

## Browser Support
Testing across different browsers and documenting fallbacks for older versions.

## Performance
Comparing performance metrics against JavaScript-based solutions.
    `,
    metadata: {
      type: 'prototype',
      category: 'CSS Layouts',
      status: 'prototype',
      featured: false,
      publishDate: '2023-12-15',
      lastUpdated: '2024-12-05',
      tools: ['CSS', 'HTML'],
      tags: ['css-grid', 'masonry', 'layout', 'responsive'],
      difficulty: 'Beginner',
      assets: {
        hero: '/placeholder.svg',
        gallery: ['/placeholder.svg'],
        downloads: []
      },
      interactive: {
        hasDemo: true,
        demoUrl: 'https://css-masonry.example.com',
        codeUrl: 'https://codepen.io/example/css-masonry'
      }
    }
  }
]

async function postSampleData() {
  console.log('🚀 Starting Sanity integration test...')

  try {
    // Test connection
    console.log('📡 Testing Sanity connection...')
    const projects = await client.fetch('*[_type == "workProject"][0...1]')
    console.log('✅ Connection successful!')

    // Post work projects
    console.log('\n📝 Posting sample work projects...')
    for (const project of sampleWorkProjects) {
      const result = await client.create(project)
      console.log(`✅ Created work project: ${result.title} (ID: ${result._id})`)
    }

    // Post playground experiments
    console.log('\n🧪 Posting sample playground experiments...')
    for (const experiment of samplePlaygroundExperiments) {
      const result = await client.create(experiment)
      console.log(`✅ Created playground experiment: ${result.title} (ID: ${result._id})`)
    }

    // Verify data
    console.log('\n🔍 Verifying posted data...')
    const allProjects = await client.fetch('*[_type == "workProject"]')
    const allExperiments = await client.fetch('*[_type == "playgroundExperiment"]')

    console.log(`✅ Total work projects in Sanity: ${allProjects.length}`)
    console.log(`✅ Total playground experiments in Sanity: ${allExperiments.length}`)

    // Test your existing queries
    console.log('\n🧪 Testing your application queries...')

    const workQuery = `*[_type == "workProject"]|order(metadata.publishDate desc){
      "slug": slug.current,
      title,
      subtitle,
      description,
      timeline,
      impact,
      content,
      metadata
    }`

    const playgroundQuery = `*[_type == "playgroundExperiment"]|order(metadata.publishDate desc){
      "slug": slug.current,
      title,
      subtitle,
      description,
      intensity,
      visual,
      content,
      metadata
    }`

    const workResults = await client.fetch(workQuery)
    const playgroundResults = await client.fetch(playgroundQuery)

    console.log(`✅ Work projects query returned ${workResults.length} items`)
    console.log(`✅ Playground experiments query returned ${playgroundResults.length} items`)

    console.log('\n🎉 Sanity integration test completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`   • Posted ${sampleWorkProjects.length} work projects`)
    console.log(`   • Posted ${samplePlaygroundExperiments.length} playground experiments`)
    console.log(`   • All queries working correctly`)
    console.log(`   • Integration is fully functional! ✨`)

  } catch (error) {
    console.error('❌ Error during Sanity integration test:', error)
    process.exit(1)
  }
}

// Run the test
postSampleData()
