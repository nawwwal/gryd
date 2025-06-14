
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
  content: { type: string; content: string }[];
}

export const projects: Project[] = [
  {
    slug: 'tamed-tax-chaos',
    title: 'tamed tax chaos',
    subtitle: 'rebuilt checkout flow from scratch',
    description: 'users were abandoning carts because tax calculation took forever. fixed it in 72 hours.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'product design',
    year: '2024',
    timeline: '3 days',
    impact: '$50k/month saved',
    content: [
      { type: 'text', content: 'the problem was obvious once you saw it. users would add items to cart, start checkout, then disappear. classic abandonment, but at scale that hurt.' },
      { type: 'text', content: 'dug into the data. tax calculation was taking 15+ seconds. people thought the site was broken. they were right.' },
      { type: 'text', content: 'scrapped the entire tax service integration. built a local lookup table with 99.7% accuracy for common cases. edge cases got flagged for manual review.' },
      { type: 'text', content: 'checkout time dropped from 45 seconds to 8 seconds. conversion jumped from 12% to 31%. math works when users trust the process.' }
    ]
  },
  {
    slug: 'channeled-dashboard-doubt',
    title: 'channeled dashboard doubt',
    subtitle: 'turned data paralysis into clarity',
    description: 'sales team had dashboards they never used. made them obsess over 3 numbers instead.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'ux design',
    year: '2024',
    timeline: '2 weeks',
    impact: '340% increase in daily active users',
    content: [
      { type: 'text', content: 'sales team had a dashboard. they never used it. asked why. "too much clicking to find what matters."' },
      { type: 'text', content: 'watched them work for a day. they wanted 3 numbers: pipeline health, monthly recurring revenue, deals closing this week. everything else was noise.' },
      { type: 'text', content: 'deleted 80% of the dashboard. put those 3 numbers front and center. made them update in real-time. added context when you hover.' },
      { type: 'text', content: 'usage went from "occasionally" to "obsessively." team started making better decisions because they could see what mattered.' }
    ]
  },
  {
    slug: 'fixed-signup-panic',
    title: 'fixed signup panic',
    subtitle: 'deleted 80% of the form fields',
    description: '7-step signup became 1 step. conversion jumped from 2% to 8%.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'conversion',
    year: '2024',
    timeline: '1 week',
    impact: '2% to 8% conversion rate',
    content: [
      { type: 'text', content: 'signup flow had 7 steps. email, password, confirm password, first name, last name, company, phone. by step 3, we lost 60% of users.' },
      { type: 'text', content: 'deleted everything except email. let people use the product immediately. asked for other details only when we needed them.' },
      { type: 'text', content: 'conversion jumped overnight. users who made it past signup were more engaged because they\'d already experienced value.' },
      { type: 'text', content: 'lesson: every field in your form is a question. every question is a reason to leave. ask better questions.' }
    ]
  },
  {
    slug: 'shipped-without-designers',
    title: 'shipped without designers',
    subtitle: 'b2b product with 2 developers',
    description: 'no design budget, no problem. built a system that got out of users\' way.',
    image: '/lovable-uploads/c6b12080-f90a-463b-a0cf-70e56178bc31.png',
    category: 'systems',
    year: '2023',
    timeline: '6 weeks',
    impact: '10k signups in first month',
    content: [
      { type: 'text', content: 'startup with no design budget. two developers who could code but couldn\'t make things pretty. classic problem.' },
      { type: 'text', content: 'studied the best b2b tools. stripe, linear, notion. they all had one thing in common: they got out of the user\'s way.' },
      { type: 'text', content: 'built a design system with 3 colors, 2 fonts, and 1 rule: if it doesn\'t help the user complete their task, delete it.' },
      { type: 'text', content: 'launched with zero custom graphics. users loved how fast everything loaded. competitors still use gradients and shadows. we use math.' }
    ]
  }
];
