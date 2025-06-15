
import ScrollFade from '../components/ScrollFade';
import EpilogueSection from '../components/EpilogueSection';

const About = () => {
  return (
    <div className="magazine-container">
      {/* About Profile Header */}
      <div className="about-profile-header">
        <div className="profile-paper">
          <div className="profile-header-content">
            <div className="profile-byline">
              <span>DESIGNER PROFILE</span>
              <span>•</span>
              <span>EST. 2021</span>
            </div>
            
            <div className="profile-name-section">
              <h1 className="profile-name">
                {'HELLO — I\'M ADI'.split('').map((letter, index) => (
                  <span key={index} className="hover-letter ink-bleed" style={{ animationDelay: `${index * 30}ms` }}>
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </h1>
              <div className="profile-role">Product Designer & Problem Solver</div>
            </div>
            
            <div className="profile-quote">
              <div className="quote-mark">"</div>
              <p className="quote-text">
                Good design isn't about making things pretty. 
                It's about making complex things feel inevitable.
              </p>
            </div>
          </div>
          
          <div className="profile-corner-fold"></div>
        </div>
      </div>

      {/* Article Content */}
      <div className="magazine-spread">
        <article className="featured-article">
          <ScrollFade>
            <div className="article-header">
              <div className="article-category">BACKGROUND</div>
              <h3 className="article-headline">The Journey So Far</h3>
              <p className="article-deck">From college posters to product design at Quicko</p>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={200}>
            <div className="article-excerpt">
              <p>Over a few summer internships, design competitions, freelance gigs, and club work — I did a bit of everything: graphic design, photography, branding, decks.</p>
              
              <p>In Jan 2024, I joined Quicko as a product design intern. In 6 months, I went full-time. I've been here since — building systems, simplifying financial complexity, and learning by shipping.</p>
              
              <p>I may be early in my career, but I care deeply about what I do. I obsess over spacing, narrative, and micro-decisions. I want my work to feel inevitable.</p>
              
              <p className="impact">Currently based in the timezone where good coffee happens. Available for projects that matter.</p>
            </div>
          </ScrollFade>
        </article>
      </div>

      {/* Epilogue Section */}
      <div className="magazine-spread">
        <EpilogueSection />
      </div>

      {/* Magazine Footer */}
      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>About • Designer Profile</span>
            <span>Last Updated: December 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
