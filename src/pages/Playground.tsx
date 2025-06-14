
import ScrollFade from '../components/ScrollFade';

const experiments = [
  {
    title: 'css morphing buttons',
    description: 'buttons that transform into loading states without javascript',
    status: 'live experiment',
  },
  {
    title: 'brutalist data tables',
    description: 'making spreadsheets sexy (somehow)',
    status: 'concept',
  },
  {
    title: 'micro-interaction library',
    description: 'hover effects that don\'t make you want to throw your laptop',
    status: 'work in progress',
  },
  {
    title: 'dashboard autopsy',
    description: 'photographic evidence of why most dashboards suck',
    status: 'photo series',
  },
  {
    title: 'impossible gradients',
    description: 'color combinations that shouldn\'t work but do',
    status: 'color study',
  },
  {
    title: 'form field archaeology',
    description: 'digging up the worst input patterns on the internet',
    status: 'ongoing research',
  },
];

const Playground = () => {
  return (
    <div className="space-y-16 pt-8">
      <ScrollFade>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold lowercase">playground</h1>
          <p className="text-xl text-gryd-soft max-w-2xl">
            experiments, dead ends, and things that make me curious.
            most of this is useless. some of it changes everything.
          </p>
        </div>
      </ScrollFade>

      <div className="grid gap-8 md:grid-cols-2">
        {experiments.map((experiment, index) => (
          <ScrollFade key={experiment.title} delay={index * 100}>
            <div className="gryd-card group cursor-pointer">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold lowercase group-hover:text-gryd-accent transition-colors">
                    {experiment.title}
                  </h3>
                  <span className="inline-block px-2 py-1 text-xs uppercase tracking-wide bg-gryd-soft/10 text-gryd-soft">
                    {experiment.status}
                  </span>
                </div>
                <p className="text-gryd-soft leading-relaxed">
                  {experiment.description}
                </p>
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>

      <ScrollFade>
        <div className="text-center">
          <p className="text-gryd-soft/60 text-sm">
            this page updates whenever i break something new.
            bookmark it if you're into that sort of thing.
          </p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Playground;
