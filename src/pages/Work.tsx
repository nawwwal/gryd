
import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';

const projects = [
  {
    slug: 'tamed-tax-chaos',
    title: 'tamed tax chaos',
    subtitle: 'rebuilt checkout flow from scratch',
    description: 'users were abandoning carts because tax calculation took forever. fixed it in 72 hours.',
  },
  {
    slug: 'channeled-dashboard-doubt',
    title: 'channeled dashboard doubt',
    subtitle: 'turned data paralysis into clarity',
    description: 'sales team had dashboards they never used. made them obsess over 3 numbers instead.',
  },
  {
    slug: 'fixed-signup-panic',
    title: 'fixed signup panic',
    subtitle: 'deleted 80% of the form fields',
    description: '7-step signup became 1 step. conversion jumped from 2% to 8%.',
  },
  {
    slug: 'shipped-without-designers',
    title: 'shipped without designers',
    subtitle: 'b2b product with 2 developers',
    description: 'no design budget, no problem. built a system that got out of users\' way.',
  },
];

const Work = () => {
  return (
    <div className="editorial-container space-y-article pt-16">
      <ScrollFade>
        <div className="space-y-8">
          <h1 className="subhead">selected work</h1>
          <p className="body text-xl max-w-2xl text-gryd-soft">
            things i've built that moved numbers.
            usually involving panic, tight deadlines,
            and making impossible things work.
          </p>
        </div>
      </ScrollFade>

      <div className="space-y-0 pt-8">
        {projects.map((project, index) => (
          <ScrollFade key={project.slug} delay={index * 100}>
            <Link to={`/work/${project.slug}`}>
              <article className="project-card group cursor-pointer">
                <div className="space-y-4">
                  <h2 className="headline text-4xl group-hover:text-gryd-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="subhead text-gryd-accent">
                    {project.subtitle}
                  </p>
                  <p className="body text-gryd-soft max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </article>
            </Link>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="caption text-gryd-soft pt-16">
          <p>more work available under nda. happy to discuss specifics over coffee.</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Work;
