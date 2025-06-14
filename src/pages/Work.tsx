
import { Link } from 'react-router-dom';
import ScrollFade from '../components/ScrollFade';

const projects = [
  {
    slug: 'fixed-tax-panic',
    title: 'fixed tax panic for 10k users',
    subtitle: 'rebuilt entire checkout flow in 72 hours',
    description: 'startup was losing $50k/month to abandoned carts. rewrote the whole thing.',
  },
  {
    slug: 'killed-boring-dashboards',
    title: 'killed boring dashboards',
    subtitle: 'data visualization that people actually use',
    description: 'turned spreadsheet hell into something sales teams fight over.',
  },
  {
    slug: 'launched-without-designers',
    title: 'launched without designers',
    subtitle: 'shipped b2b product with 2 developers',
    description: 'proved you don\'t need a design team if you think like users.',
  },
  {
    slug: 'broke-the-signup-funnel',
    title: 'broke the signup funnel',
    subtitle: 'then rebuilt it 300% better',
    description: 'turned 2% conversion into 8% by deleting everything.',
  },
];

const Work = () => {
  return (
    <div className="space-y-16 pt-8">
      <ScrollFade>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold lowercase">selected work</h1>
          <p className="text-xl text-gryd-soft max-w-2xl">
            things i've built that moved numbers.
            usually involving panic, tight deadlines,
            and making impossible things work.
          </p>
        </div>
      </ScrollFade>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <ScrollFade key={project.slug} delay={index * 100}>
            <Link to={`/work/${project.slug}`}>
              <article className="gryd-card group cursor-pointer">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold lowercase group-hover:text-gryd-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-lg text-gryd-accent lowercase font-medium">
                    {project.subtitle}
                  </p>
                  <p className="text-gryd-soft leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </article>
            </Link>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="text-gryd-soft/60 text-sm">
          <p>more work available under nda. happy to discuss specifics over coffee.</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Work;
