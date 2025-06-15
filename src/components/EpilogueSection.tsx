
import { useState, useEffect } from 'react';
import ScrollFade from './ScrollFade';
import AuthorInfo from './AuthorInfo';
import DesignerStatus from './DesignerStatus';

const EpilogueSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="magazine-spread">
      <div className="epilogue-section">
        <div className="flip-card-container">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <ScrollFade>
                <div className="epilogue-front-content">
                  {/* Page Header */}
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-8 h-px bg-orange-600"></div>
                      <span className="section-category">EPILOGUE</span>
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
                      <button 
                        onClick={() => setIsFlipped(true)}
                        className="magazine-cta-button"
                      >
                        <span className="cta-text">Turn the Page</span>
                        <span className="cta-arrow">→</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Section with Page Info */}
                  <div className="flex justify-between items-end mt-16 pt-8 border-t border-gray-200">
                    <div className="text-sm text-gray-500 font-mono">
                      GRYD MAGAZINE • ISSUE 001
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      PAGE 32 • {currentTime.toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>

            {/* Back of the card */}
            <div className="flip-card-back">
              <ScrollFade>
                <div className="epilogue-back-content">
                  {/* Back Button */}
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flip-back-btn mb-8"
                  >
                    <span>←</span>
                    <span className="text-sm uppercase tracking-wider">back to story</span>
                  </button>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <AuthorInfo />
                    </div>
                    <div>
                      <DesignerStatus />
                      
                      {/* Contact CTA on back */}
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            Building something meaningful?
                          </p>
                          <a 
                            href="https://calendly.com/your-handle" 
                            className="editorial-link text-lg"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            schedule a conversation
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpilogueSection;
