
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
      const rotateX = (y - centerY) / centerY * -2.5;
      const rotateY = (x - centerX) / centerX * 2.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0.5deg) rotateY(-0.25deg) translateZ(0)';
    };

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    // Set initial state
    card.style.transform = 'perspective(1000px) rotateX(0.5deg) rotateY(-0.25deg) translateZ(0)';

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="magazine-hero">
      <Link to="/about" className="block group cursor-pointer">
        <div
          ref={heroCardRef}
          className="hero-paper gyroscopic-card transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.01]"
        >
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
                  <span className="continue-reading-text group-hover:text-orange-700 transition-colors">
                    Continue reading inside →
                  </span>
                </div>
              </div>
            </ScrollFade>
          </div>

          <div className="paper-corner"></div>
          <div className="paper-shadow"></div>
        </div>
      </Link>
    </div>
  );
};

export default MagazineHero;
