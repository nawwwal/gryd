import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_API_PROJECT_ID
const dataset = process.env.SANITY_API_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity credentials in environment variables')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false })

const projects = [
  {
    _id: 'workProject.tamed-tax-chaos',
    _type: 'workProject',
    slug: { _type: 'slug', current: 'tamed-tax-chaos' },
    title: 'tamed tax chaos',
    subtitle: 'rebuilt checkout flow from scratch',
    description: 'users were abandoning carts because tax calculation took forever. fixed it in 72 hours.',
    timeline: '3 days',
    impact: '$50k/month saved',
    content:
      'the problem was obvious once you saw it. users would add items to cart, start checkout, then disappear. classic abandonment, but at scale that hurt. ' +
      'dug into the data. tax calculation was taking 15+ seconds. people thought the site was broken. they were right. ' +
      'scrapped the entire tax service integration. built a local lookup table with 99.7% accuracy for common cases. edge cases got flagged for manual review. ' +
      'checkout time dropped from 45 seconds to 8 seconds. conversion jumped from 12% to 31%. math works when users trust the process.',
    metadata: {
      type: 'prototype',
      category: 'product design',
      status: 'live',
      featured: true,
      publishDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      tools: [],
      tags: [],
      assets: { hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png' },
      interactive: { hasDemo: false }
    }
  },
  {
    _id: 'workProject.channeled-dashboard-doubt',
    _type: 'workProject',
    slug: { _type: 'slug', current: 'channeled-dashboard-doubt' },
    title: 'channeled dashboard doubt',
    subtitle: 'turned data paralysis into clarity',
    description: 'sales team had dashboards they never used. made them obsess over 3 numbers instead.',
    timeline: '2 weeks',
    impact: '340% increase in daily active users',
    content:
      'sales team had a dashboard. they never used it. asked why. "too much clicking to find what matters." ' +
      'watched them work for a day. they wanted 3 numbers: pipeline health, monthly recurring revenue, deals closing this week. everything else was noise. ' +
      'deleted 80% of the dashboard. put those 3 numbers front and center. made them update in real-time. added context when you hover. ' +
      'usage went from "occasionally" to "obsessively." team started making better decisions because they could see what mattered.',
    metadata: {
      type: 'research',
      category: 'ux design',
      status: 'live',
      featured: false,
      publishDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      tools: [],
      tags: [],
      assets: { hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png' },
      interactive: { hasDemo: false }
    }
  }
]

const experiments = [
  {
    _id: 'playgroundExperiment.gravity-sim',
    _type: 'playgroundExperiment',
    slug: { _type: 'slug', current: 'gravity-sim' },
    title: 'gravity simulation',
    subtitle: 'testing physics renders',
    description: 'a small demo that shows falling particles with HTML canvas.',
    intensity: 'medium',
    visual: 'interactive',
    content: 'some long form explanation of the experiment results.',
    metadata: {
      type: 'prototype',
      category: 'code',
      status: 'live',
      featured: false,
      publishDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      tools: ['canvas'],
      tags: [],
      assets: { hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png' },
      interactive: { hasDemo: true, demoUrl: 'https://example.com' }
    }
  }
]

async function seed() {
  for (const doc of [...projects, ...experiments]) {
    await client.createIfNotExists(doc)
  }
  console.log('Seeded Sanity with sample data')
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
