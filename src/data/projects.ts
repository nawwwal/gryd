
import { WorkProject } from '../types/content';

// Sample work projects used on the landing page and legacy detail views
// These mirror the `WorkProject` interface so that pages and loaders share
// a single project type across the application.
export const projects: WorkProject[] = [
  {
    slug: 'tamed-tax-chaos',
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
    slug: 'channeled-dashboard-doubt',
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
  },
  {
    slug: 'fixed-signup-panic',
    title: 'fixed signup panic',
    subtitle: 'deleted 80% of the form fields',
    description: '7-step signup became 1 step. conversion jumped from 2% to 8%.',
    timeline: '1 week',
    impact: '2% to 8% conversion rate',
    content:
      'signup flow had 7 steps. email, password, confirm password, first name, last name, company, phone. by step 3, we lost 60% of users. ' +
      'deleted everything except email. let people use the product immediately. asked for other details only when we needed them. ' +
      'conversion jumped overnight. users who made it past signup were more engaged because they\'d already experienced value. ' +
      'lesson: every field in your form is a question. every question is a reason to leave. ask better questions.',
    metadata: {
      type: 'prototype',
      category: 'conversion',
      status: 'live',
      featured: false,
      publishDate: '2024-01-01',
      lastUpdated: '2024-01-01',
      tools: [],
      tags: [],
      assets: { hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png' },
      interactive: { hasDemo: false }
    }
  },
  {
    slug: 'shipped-without-designers',
    title: 'shipped without designers',
    subtitle: 'b2b product with 2 developers',
    description: 'no design budget, no problem. built a system that got out of users\' way.',
    timeline: '6 weeks',
    impact: '10k signups in first month',
    content:
      'startup with no design budget. two developers who could code but couldn\'t make things pretty. classic problem. ' +
      'studied the best b2b tools. stripe, linear, notion. they all had one thing in common: they got out of the user\'s way. ' +
      'built a design system with 3 colors, 2 fonts, and 1 rule: if it doesn\'t help the user complete their task, delete it. ' +
      'launched with zero custom graphics. users loved how fast everything loaded. competitors still use gradients and shadows. we use math.',
    metadata: {
      type: 'prototype',
      category: 'systems',
      status: 'live',
      featured: false,
      publishDate: '2023-01-01',
      lastUpdated: '2023-01-01',
      tools: [],
      tags: [],
      assets: { hero: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png' },
      interactive: { hasDemo: false }
    }
  }
];
