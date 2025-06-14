
import ScrollFade from '../components/ScrollFade';

const About = () => {
  return (
    <div className="article-container space-y-article pt-16">
      <ScrollFade>
        <h1 className="subhead">about</h1>
      </ScrollFade>

      <ScrollFade>
        <div className="space-y-paragraph body">
          <p>
            i started designing in my first year of college — while doing a btech in computer science.
          </p>
          
          <p>
            it started with club posters and ended with me skipping algorithms class to study typography.
          </p>
          
          <p>
            over a few summer internships, design competitions, freelance gigs, and club work — i did a bit of everything: graphic design, photography, branding, decks.
          </p>
          
          <p>
            in jan 2024, i joined quicko as a product design intern.
            in 6 months, i went full-time.
            i've been here since — building systems, simplifying financial complexity, and learning by shipping.
          </p>
          
          <p>
            i may be early in my career, but i care deeply about what i do.
            i obsess over spacing, narrative, and micro-decisions.
            i want my work to feel inevitable.
          </p>
          
          <p className="text-gryd-soft">
            currently based in the timezone where good coffee happens.
            available for projects that matter.
          </p>
        </div>
      </ScrollFade>

      <ScrollFade>
        <div className="pt-16 border-t border-gryd-soft/20">
          <div className="caption text-gryd-accent">
            last updated: december 2024
          </div>
        </div>
      </ScrollFade>
    </div>
  );
};

export default About;
