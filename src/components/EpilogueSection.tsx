import { useState, useEffect } from 'react';
import ScrollFade from './ScrollFade';

const EpilogueSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="magazine-spread">
      <ScrollFade>
        <div className="flip-card-container">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <div className="epilogue-front-content">
                {/* Page Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-orange-600"></div>
                    <span className="section-category my-0">EPILOGUE</span>
                    <div className="w-8 h-px bg-orange-600"></div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-8 max-w-3xl mx-auto">
                  <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    every story needs an ending.
                  </h2>

                  <div className="space-y-6 text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto">
                    <p>
                      But the best endings feel like beginnings. Behind every pixel in this magazine is a simple truth: design is about making life better.
                    </p>

                    <p>
                      I'm Aditya Nawal, the product designer behind GRYD. This magazine is my story, told through systems and sidequests.
                    </p>
                  </div>

                  {/* Primary Call to Action - Flip Card */}
                  <div className="pt-8">
                    <button onClick={() => setIsFlipped(true)} className="magazine-cta-button">
                      <span className="cta-text text-gryd-bg">Turn the Page</span>
                      <span className="cta-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of the card - Streamlined */}
            <div className="flip-card-back">
              <div className="epilogue-back-content-redesigned">
                {/* Back Navigation */}
                <div className="back-navigation">
                  <button onClick={() => setIsFlipped(false)} className="back-button-magazine">
                    <span className="back-arrow">←</span>
                    <span className="back-label">back to story</span>
                  </button>
                </div>

                {/* Centered Magazine-Style Bio - Streamlined */}
                <div className="magazine-bio-section">
                  {/* Author Portrait Section */}
                  <div className="author-portrait-section">
                    <div className="author-name-display">
                      <h2 className="contributor-name">ADITYA NAWAL</h2>
                      <div className="contributor-title">Product Designer</div>
                    </div>
                  </div>

                  {/* Status & Availability */}
                  <div className="bio-content">
                    <div className="bio-paragraph">
                      <p className="bio-text" style={{ fontStyle: 'italic', fontSize: '1.05rem', color: '#44403c' }}>
                        This magazine is a living document of my work and process. I hope it offers a glimpse into not just what I do, but how I think.
                      </p>
                    </div>
                    <div className="status-section">
                      <div className="status-indicator">
                        <div className="status-dot-live"></div>
                        <span className="status-text">Currently exploring new roles & collaborations</span>
                      </div>
                    </div>
                  </div>

                  {/* Essential Contact */}
                  <div className="contact-section-compact">
                    <div className="primary-contact">
                      <a
                        href="mailto:hey@naw.al?subject=A%20note%20from%20your%20portfolio&body=Hey%20Adi%2C%0A%0ACame%20across%20your%20portfolio%20and%20really%20enjoyed%20your%20work.%0A%0AWould%20love%20to%20connect.%0A%0ABest%2C"
                        className="contact-email"
                      >
                        hey@naw.al
                      </a>
                    </div>

                    <div className="social-connections-compact">
                      <a href="https://www.linkedin.com/in/adityanawal/" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">LinkedIn</span>
                        <span className="external-arrow">↗</span>
                      </a>
                      <a href="https://github.com/nawwwal" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">GitHub</span>
                        <span className="external-arrow">↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollFade>
    </div>
  );
};

export default EpilogueSection;
