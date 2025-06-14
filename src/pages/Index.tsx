
import ScrollFade from '../components/ScrollFade';

const Index = () => {
  return (
    <div className="space-y-32 pt-16">
      {/* Hero Manifesto */}
      <ScrollFade>
        <div className="space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight lowercase">
            making things
            <br />
            that shouldn't
            <br />
            exist yet
          </h1>
          
          <div className="max-w-2xl space-y-6 text-xl leading-relaxed">
            <p>
              i build products that make people feel something.
              interfaces that don't follow the rules.
              systems that work better than they should.
            </p>
            
            <p className="text-gryd-soft">
              currently available for interesting problems.
              if you're building something that scares you a little,
              let's talk.
            </p>
          </div>
        </div>
      </ScrollFade>

      {/* CTA */}
      <ScrollFade>
        <div className="flex items-center space-x-4">
          <a 
            href="https://calendly.com/your-handle" 
            className="gryd-cta relative"
            target="_blank"
            rel="noopener noreferrer"
          >
            book a call
          </a>
          <div className="w-4 h-4 border border-gryd-accent animate-spin-slow"></div>
        </div>
      </ScrollFade>

      {/* Footer */}
      <ScrollFade>
        <div className="text-sm text-gryd-soft/60 lowercase">
          <p>gryd.dev — portfolio of experimental work</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Index;
