
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';

const MagazineHero = () => {
  const heroCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = heroCardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -3; // Reduced from -10 to -3
      const rotateY = (x - centerX) / centerX * 3;   // Reduced from 10 to 3
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(1deg) rotateY(-0.5deg) translateZ(0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="magazine-hero">
      <div ref={heroCardRef} className="hero-paper gyroscopic-card">
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
                <Link to="/about" className="continue-reading-link">
                  Continue reading inside →
                </Link>
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
