
import ScrollFade from '../components/ScrollFade';
import { Circle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="space-y-32 pt-8">
      <ScrollFade>
        <div className="space-y-12">
          <h1 className="text-6xl md:text-8xl font-bold leading-tight lowercase">
            let's
            <br />
            make
            <br />
            something
          </h1>
          
          <div className="max-w-2xl space-y-6 text-xl leading-relaxed">
            <p>
              got a project that's keeping you up at night?
              something your team says is impossible?
              a problem that needs thinking sideways?
            </p>
            
            <p className="text-gryd-soft">
              book 30 minutes.
              we'll figure out if i can help.
              no sales pitch, just straight talk.
            </p>
          </div>
        </div>
      </ScrollFade>

      <ScrollFade>
        <div className="flex items-center space-x-6">
          <a 
            href="https://calendly.com/your-handle" 
            className="gryd-cta relative"
            target="_blank"
            rel="noopener noreferrer"
          >
            book a call
          </a>
          <Circle className="w-6 h-6 text-gryd-accent animate-spin-slow" />
        </div>
      </ScrollFade>

      <ScrollFade>
        <div className="text-gryd-soft/60 text-sm space-y-2">
          <p>usually respond within a few hours.</p>
          <p>if it's urgent, mention that in the booking.</p>
          <p>if it's not urgent, still mention that. i like clarity.</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Contact;
