
import ScrollFade from '../components/ScrollFade';

const Index = () => {
  return (
    <div className="editorial-container space-y-section pt-16">
      {/* Hero */}
      <ScrollFade>
        <div className="space-y-article">
          <h1 className="headline max-w-4xl">
            hello — i'm adi.
            <br />
            i fix messy products.
          </h1>
          
          <div className="max-w-2xl space-y-paragraph">
            <p className="body text-xl">
              six months into my first full-time role at quicko,
              i've learned that good design isn't about making things pretty.
              it's about making complex things feel inevitable.
            </p>
            
            <p className="body text-gryd-soft">
              currently building financial tools that don't make you want to cry.
              if you're working on something that keeps you up at night,
              let's talk.
            </p>
          </div>
        </div>
      </ScrollFade>

      {/* CTA */}
      <ScrollFade>
        <div className="py-8">
          <a 
            href="https://calendly.com/your-handle" 
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            book a call
          </a>
        </div>
      </ScrollFade>

      {/* Animated line */}
      <ScrollFade>
        <div className="relative py-16">
          <div className="scroll-line h-px bg-gryd-accent"></div>
        </div>
      </ScrollFade>

      {/* Footer note */}
      <ScrollFade>
        <div className="caption text-gryd-soft">
          <p>gryd.dev — product designer, early career, obsessive about details</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Index;
