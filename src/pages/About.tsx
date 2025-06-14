
import ScrollFade from '../components/ScrollFade';

const About = () => {
  return (
    <div className="magazine-container">
      {/* Magazine Header */}
      <div className="magazine-hero">
        <div className="hero-paper">
          <div className="paper-binding"></div>
          
          <div className="hero-content">
            <ScrollFade>
              <div className="masthead">
                <div className="issue-details">
                  <span className="issue-number">Profile</span>
                  <span className="issue-date">About</span>
                  <span className="price">2024</span>
                </div>
                
                <h1 className="magazine-logo">
                  ABOUT
                  <span className="subtitle">Designer Profile & Background</span>
                </h1>
                
                <div className="feature-banner">
                  <span>Profile: The Designer Behind The Work</span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={300}>
              <div className="hero-story">
                <div className="story-category">PROFILE</div>
                <h2 className="story-headline">
                  Hello — I'm Adi<br/>
                  <span className="story-subhead">Product Designer & Problem Solver</span>
                </h2>
                
                <div className="story-lead">
                  <p className="lead-text">
                    I started designing in my first year of college — while doing a BTech in computer science.
                    It started with club posters and ended with me skipping algorithms class to study typography.
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="paper-corner"></div>
          <div className="paper-shadow"></div>
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

      {/* Last Updated */}
      <div className="table-of-contents">
        <ScrollFade>
          <div className="toc-header">
            <h3>Last Updated</h3>
            <div className="toc-line"></div>
          </div>
          
          <div className="toc-entries">
            <div className="toc-entry">
              <span className="toc-page">•</span>
              <span className="toc-title">December 2024</span>
            </div>
          </div>
        </ScrollFade>
      </div>

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
