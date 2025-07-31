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
    <div className="magazine-spread" id="epilogue">
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

            {/* Back of the card */}
            <div className="flip-card-back">
              <div className="epilogue-back-content-redesigned">
                {/* Back Navigation */}
                <div className="back-navigation flex justify-center">
                  <button onClick={() => setIsFlipped(false)} className="back-button-magazine">
                    <span className="back-arrow">←</span>
                    <span className="back-label">back to story</span>
                  </button>
                </div>

                {/* Editorial Note – Option B */}
                <div className="editor-note-container relative flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                  {/* Letter from the editor */}
                  <p className="font-serif text-xl leading-relaxed text-gray-800">
                    Stories end, but conversations keep unfolding. Thank you for paging through GRYD;<br />every pixel here is a promise that design can make life a little better.
                  </p>

                  {/* Signature image - Positioned absolutely to overlay without pushing content */}
                  <img
                    src="/Signature.png"
                    alt="Aditya Nawal signature"
                    className="absolute inset-0 m-auto h-60 w-auto object-contain pointer-events-none -translate-y-5"
                  />

                  {/* Placeholder to create space for the signature */}
                  <div className="h-48" />

                  {/* Correspondence */}
                  <div className="space-y-4 w-full">
                    <h3 className="font-mono uppercase tracking-widest text-xs text-gray-400">Correspondence</h3>

                    {/* Primary contact */}
                    <div className="flex items-center justify-center space-x-6">
                      <a
                        href="mailto:hey@naw.al?subject=A%20note%20from%20your%20portfolio&body=Hey%20Adi%2C%0A%0AI%20just%20finished%20reading%20GRYD%20and%20would%20love%20to%20connect.%0A%0ABest%2C"
                        className="contact-email"
                      >
                        hey@naw.al
                      </a>
                      <span className="text-gray-400 font-mono text-lg">/</span>
                      <a href="tel:+918320443632" className="contact-email">
                        +91&nbsp;83204&nbsp;43632
                      </a>
                    </div>

                    {/* Social links */}
                    <div className="flex flex-wrap justify-center gap-4">
                      <a href="https://www.linkedin.com/in/adityanawal/" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">LinkedIn</span>
                        <span className="external-arrow">↗</span>
                      </a>
                      <a href="https://github.com/nawwwal" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">GitHub</span>
                        <span className="external-arrow">↗</span>
                      </a>
                      <a href="https://x.com/naawwwal" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">X (Twitter)</span>
                        <span className="external-arrow">↗</span>
                      </a>
                      <a href="https://www.instagram.com/naawwwaal/" target="_blank" rel="noopener noreferrer" className="social-link-magazine">
                        <span className="platform-name">Instagram</span>
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
