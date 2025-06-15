
import { useState } from 'react';
import ScrollFade from './ScrollFade';
import AuthorInfo from './AuthorInfo';
import DesignerStatus from './DesignerStatus';

const EpilogueSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="epilogue-section">
      <div className="flip-card-container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          {/* Front of the card */}
          <div className="flip-card-front">
            <ScrollFade>
              <div className="epilogue-front-content">
                {/* Page Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-gryd-accent"></div>
                    <span className="caption">EPILOGUE</span>
                    <div className="w-8 h-px bg-gryd-accent"></div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="text-center space-y-6 max-w-2xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-headline leading-tight text-gryd-text">
                    every story needs an ending.
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="body text-gryd-soft text-base leading-relaxed">
                      But the best endings feel like beginnings. Behind every pixel in this magazine is a simple truth: design is about making life better.
                    </p>
                    
                    <p className="body text-gryd-soft text-base leading-relaxed">
                      I'm Aditya Nawal, the product designer behind GRYD. If you're building something meaningful, I'd love to hear your story.
                    </p>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4">
                    <a 
                      href="https://calendly.com/your-handle" 
                      className="editorial-link subhead text-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      schedule a conversation
                    </a>
                  </div>
                </div>

                {/* Bottom Section with Flip Button */}
                <div className="flex justify-between items-end mt-12">
                  <div className="caption text-gryd-soft">
                    GRYD MAGAZINE
                  </div>
                  <button 
                    onClick={() => setIsFlipped(true)}
                    className="flip-indicator-inline"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="caption text-gryd-soft hover:text-gryd-accent transition-colors">
                        more details
                      </span>
                      <div className="text-lg text-gryd-accent">→</div>
                    </div>
                  </button>
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
                  className="flip-back-btn mb-6"
                >
                  <span>←</span>
                  <span className="caption">back</span>
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <AuthorInfo />
                  </div>
                  <div>
                    <DesignerStatus />
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpilogueSection;
