
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="article-container space-y-article pt-16">
      <ScrollFade>
        <div className="space-y-article">
          <h1 className="headline">
            let's
            <br />
            talk.
          </h1>
          
          <div className="space-y-paragraph body">
            <p className="text-xl">
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

      <ScrollFade>
        <div className="caption text-gryd-soft space-y-2 pt-16">
          <p>usually respond within a few hours.</p>
          <p>if it's urgent, mention that in the booking.</p>
          <p>if it's not urgent, still mention that. i like clarity.</p>
        </div>
      </ScrollFade>
    </div>
  );
};

export default Contact;
