import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollFade from './ScrollFade';
import MobileTouchFeedback from './MobileTouchFeedback';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const MobileHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile, isTouch } = useMobileOptimization();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCTAClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
  };

  if (isMobile) {
    return (
      <div className="mobile-hero-container">
        <div className="mobile-container">
          <div className="mobile-hero-content">
            <ScrollFade>
              <div className="mobile-hero-header">
                <div className="mobile-issue-details">
                  <span className="mobile-issue-number">No. 01</span>
                  <span className="mobile-issue-date">Winter 2024</span>
                  <span className="mobile-price">Free</span>
                </div>
                
                <h1 className="mobile-hero-title">
                  THE GRYD
                  <span className="mobile-hero-subtitle">Design Portfolio & Journal</span>
                </h1>
                
                <div className="mobile-feature-banner">
                  <span>Featured: The Art of Fixing Broken Products</span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={200}>
              <div className="mobile-hero-story">
                <div className="mobile-story-category">COVER STORY</div>
                <h2 className="mobile-story-headline">
                  Hello — I'm Adi.
                  <span className="mobile-story-subhead">I Fix Messy Products</span>
                </h2>
                
                <div className="mobile-story-lead">
                  <p className="mobile-lead-text">
                    Six months into my first full-time role at Quicko, 
                    I've learned that good design isn't just about making things pretty. 
                    It's about making complex things feel inevitable.
                  </p>
                  
                  <div className="mobile-story-byline">
                    <span>By Aditya Nawal</span>
                    <span>•</span>
                    <span>Product Designer</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>
                
                <div className="mobile-continue-reading">
                  {isTouch ? (
                    <MobileTouchFeedback onTap={handleCTAClick} hapticFeedback>
                      <Link to="/about" className="mobile-cta-button">
                        Continue reading inside →
                      </Link>
                    </MobileTouchFeedback>
                  ) : (
                    <Link to="/about" className="mobile-cta-button" onClick={handleCTAClick}>
                      Continue reading inside →
                    </Link>
                  )}
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - keep existing gyroscopic card
  return (
    <div className="magazine-hero">
      <div ref={heroRef} className="hero-paper gyroscopic-card">
        <div className="paper-binding"></div>
        
        <div className="hero-content pl-8 sm:pl-12 md:pl-16 lg:pl-20">
          <ScrollFade>
            <div className="masthead">
              <div className="issue-details">
                <span className="issue-number font-mono font-medium">No. 01</span>
                <span className="issue-date font-mono font-medium">Winter 2024</span>
                <span className="price font-mono font-medium">Free</span>
              </div>
              
              <h1 className="magazine-logo">
                THE GRYD
                <span className="subtitle">Design  Portfolio  &  Journal</span>
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
                Hello — I'm Adi.<br />
                <span className="story-subhead">I Fix Messy Products</span>
              </h2>
              
              <div className="story-lead">
                <p className="lead-text">
                  Six months into my first full-time role at Quicko, 
                  I've learned that good design isn't about making things pretty. 
                  It's about making complex things feel inevitable.
                </p>
                
                <div className="story-byline">
                  <span>By Aditya Nawal</span>
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

export default MobileHero;
