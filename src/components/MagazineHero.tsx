
import ScrollFade from './ScrollFade';

const MagazineHero = () => {
  return (
    <div className="magazine-hero">
      <div className="hero-paper">
        <div className="paper-binding"></div>
        
        <div className="hero-content">
          <ScrollFade>
            <div className="masthead">
              <div className="issue-details">
                <span className="issue-number">No. 01</span>
                <span className="issue-date">Winter 2024</span>
                <span className="price">Free</span>
              </div>
              
              <h1 className="magazine-logo">
                THE GRYD
                <span className="subtitle">Design Portfolio & Journal</span>
              </h1>
              
              <div className="feature-banner">
                <span>Featured: The Art of Fixing Broken Products</span>
              </div>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={300}>
            <div className="hero-story">
              <div className="story-category">COVER STORY</div>
              <h2 className="story-headline">
                Hello — I'm Adi.<br/>
                <span className="story-subhead">I Fix Messy Products</span>
              </h2>
              
              <div className="story-lead">
                <p className="lead-text">
                  Six months into my first full-time role at Quicko, 
                  I've learned that good design isn't about making things pretty. 
                  It's about making complex things feel inevitable.
                </p>
                
                <div className="story-byline">
                  <span>By Adi Gryd</span>
                  <span>•</span>
                  <span>Product Designer</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
              
              <div className="continue-reading">
                <span>Continue reading inside →</span>
              </div>
            </div>
          </ScrollFade>
        </div>
        
        <div className="paper-corner"></div>
        <div className="paper-shadow"></div>
      </div>
    </div>
  );
};

export default MagazineHero;
