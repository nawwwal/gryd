
import { useParams, Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';

const projectData: Record<string, any> = {
  'tamed-tax-chaos': {
    title: 'tamed tax chaos',
    subtitle: 'rebuilt checkout flow from scratch',
    timeline: '3 days',
    impact: '$50k/month saved',
    content: [
      {
        type: 'text',
        content: 'the problem was obvious once you saw it. users would add items to cart, start checkout, then disappear. classic abandonment, but at scale that hurt.'
      },
      {
        type: 'text',
        content: 'dug into the data. tax calculation was taking 15+ seconds. people thought the site was broken. they were right.'
      },
      {
        type: 'text',
        content: 'scrapped the entire tax service integration. built a local lookup table with 99.7% accuracy for common cases. edge cases got flagged for manual review.'
      },
      {
        type: 'text',
        content: 'checkout time dropped from 45 seconds to 8 seconds. conversion jumped from 12% to 31%. math works when users trust the process.'
      }
    ]
  },
  'killed-boring-dashboards': {
    title: 'killed boring dashboards',
    subtitle: 'data visualization that people actually use',
    timeline: '2 weeks',
    impact: '340% increase in daily active users',
    content: [
      {
        type: 'text',
        content: 'sales team had a dashboard. they never used it. asked why. "too much clicking to find what matters."'
      },
      {
        type: 'text',
        content: 'watched them work for a day. they wanted 3 numbers: pipeline health, monthly recurring revenue, deals closing this week. everything else was noise.'
      },
      {
        type: 'text',
        content: 'deleted 80% of the dashboard. put those 3 numbers front and center. made them update in real-time. added context when you hover.'
      },
      {
        type: 'text',
        content: 'usage went from "occasionally" to "obsessively." team started making better decisions because they could see what mattered.'
      }
    ]
  },
  'launched-without-designers': {
    title: 'launched without designers',
    subtitle: 'shipped b2b product with 2 developers',
    timeline: '6 weeks',
    impact: '10k signups in first month',
    content: [
      {
        type: 'text',
        content: 'startup with no design budget. two developers who could code but couldn\'t make things pretty. classic problem.'
      },
      {
        type: 'text',
        content: 'studied the best b2b tools. stripe, linear, notion. they all had one thing in common: they got out of the user\'s way.'
      },
      {
        type: 'text',
        content: 'built a design system with 3 colors, 2 fonts, and 1 rule: if it doesn\'t help the user complete their task, delete it.'
      },
      {
        type: 'text',
        content: 'launched with zero custom graphics. users loved how fast everything loaded. competitors still use gradients and shadows. we use math.'
      }
    ]
  },
  'broke-the-signup-funnel': {
    title: 'broke the signup funnel',
    subtitle: 'then rebuilt it 300% better',
    timeline: '1 week',
    impact: '2% to 8% conversion rate',
    content: [
      {
        type: 'text',
        content: 'signup flow had 7 steps. email, password, confirm password, first name, last name, company, phone. by step 3, we lost 60% of users.'
      },
      {
        type: 'text',
        content: 'deleted everything except email. let people use the product immediately. asked for other details only when we needed them.'
      },
      {
        type: 'text',
        content: 'conversion jumped overnight. users who made it past signup were more engaged because they\'d already experienced value.'
      },
      {
        type: 'text',
        content: 'lesson: every field in your form is a question. every question is a reason to leave. ask better questions.'
      }
    ]
  }
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projectData[slug] : null;

  if (!project) {
    return (
      <div className="article-container pt-16">
        <p className="body">project not found</p>
        <Link to="/work" className="editorial-link">← back to work</Link>
      </div>
    );
  }

  return (
    <div className="article-container space-y-article pt-16">
      <ScrollFade>
        <div className="space-y-8">
          <Link to="/work" className="editorial-link caption">← back to work</Link>
          <h1 className="headline">
            {project.title}
          </h1>
          <p className="subhead text-gryd-accent">
            {project.subtitle}
          </p>
          
          <div className="flex space-x-12 caption">
            <div>
              <span className="text-gryd-soft">timeline:</span>
              <span className="ml-2 text-gryd-text">{project.timeline}</span>
            </div>
            <div>
              <span className="text-gryd-soft">impact:</span>
              <span className="ml-2 text-gryd-accent">{project.impact}</span>
            </div>
          </div>
        </div>
      </ScrollFade>

      <div className="space-y-paragraph">
        {project.content.map((section: any, index: number) => (
          <ScrollFade key={index} delay={index * 100}>
            <div className="body">
              <p>{section.content}</p>
            </div>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="pt-16 border-t border-gryd-soft/20 space-y-4">
          <p className="body text-gryd-soft">
            want to discuss this project in detail? let's talk.
          </p>
          <a 
            href="https://calendly.com/your-handle" 
            className="editorial-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            book a call →
          </a>
        </div>
      </ScrollFade>
    </div>
  );
};

export default ProjectDetail;
