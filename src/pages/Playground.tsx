
import ScrollFade from '../components/ScrollFade';

const experiments = [
  {
    title: 'css toy 01',
    description: 'buttons that morph into loading states without javascript',
    status: 'live experiment',
  },
  {
    title: 'photo series',
    description: 'brutalist architecture meets minimal composition',
    status: 'ongoing',
  },
  {
    title: 'micro-interaction study',
    description: 'hover effects that don\'t make you want to close the tab',
    status: 'prototype',
  },
  {
    title: 'dashboard autopsy',
    description: 'photographic evidence of why most dashboards fail',
    status: 'case study',
  },
  {
    title: 'impossible color combinations',
    description: 'palettes that shouldn\'t work but somehow do',
    status: 'color study',
  },
  {
    title: 'form field archaeology',
    description: 'digging up the worst input patterns on the internet',
    status: 'research',
  },
];

const Playground = () => {
  return (
    <div className="editorial-container space-y-article pt-16">
      <ScrollFade>
        <div className="space-y-8">
          <h1 className="subhead">playground</h1>
          <p className="body text-xl max-w-2xl text-gryd-soft">
            experiments, dead ends, and things that make me curious.
            most of this is useless. some of it changes everything.
          </p>
        </div>
      </ScrollFade>

      <div className="grid gap-12 md:grid-cols-2 pt-8">
        {experiments.map((experiment, index) => (
          <ScrollFade key={experiment.title} delay={index * 100}>
            <div className="group cursor-pointer space-y-4 transition-all duration-300 hover:translate-x-2">
              <div className="space-y-2">
                <h3 className="font-headline text-xl font-medium lowercase group-hover:text-gryd-accent transition-colors">
                  {experiment.title}
                </h3>
                <span className="caption text-gryd-accent">
                  {experiment.status}
                </span>
              </div>
              <p className="body text-gryd-soft">
                {experiment.description}
              </p>
            </div>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="caption text-gryd-soft text-center pt-16">
          <p>
            this page updates whenever i break something new.
            bookmark it if you're into that sort of thing.
          </p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Playground;
