
import ScrollFade from '../components/ScrollFade';
import AuthorInfo from '../components/AuthorInfo';
import DesignerStatus from '../components/DesignerStatus';
import { useState } from 'react';

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen bg-gryd-bg py-section">
      <div className="editorial-container">
        <div className="flip-card-container">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <ScrollFade>
                <div className="space-y-12">
                  {/* Page Header */}
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-px bg-gryd-accent"></div>
                      <span className="caption">EPILOGUE</span>
                      <div className="w-12 h-px bg-gryd-accent"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="max-w-2xl mx-auto space-y-8">
                    <h1 className="headline text-center">
                      every story needs an ending.
                    </h1>
                    
                    <div className="space-y-6">
                      <p className="body text-gryd-soft">
                        But the best endings feel like beginnings. Behind every pixel, wireframe, and user journey in this magazine is a simple truth: design is about making life a little better for the people who matter most.
                      </p>
                      
                      <p className="body text-gryd-soft">
                        I'm Aditya Nawal, the product designer behind GRYD. This magazine isn't just a portfolio—it's a manifesto for thoughtful design that bridges human needs with business goals.
                      </p>

                      <p className="body text-gryd-soft">
                        Every project you've seen here represents a conversation, a problem solved, a user delighted. If you're building something meaningful and need a design partner who thinks strategically, I'd love to hear your story.
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pt-8">
                      <a 
                        href="https://calendly.com/your-handle" 
                        className="editorial-link subhead"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        schedule a conversation
                      </a>
                    </div>
                  </div>

                  {/* Flip Indicator */}
                  <div className="text-center pt-12">
                    <button 
                      onClick={() => setIsFlipped(true)}
                      className="flip-indicator group"
                    >
                      <div className="flip-icon">
                        <span className="caption text-gryd-soft group-hover:text-gryd-accent transition-colors">
                          more details
                        </span>
                        <div className="flip-arrow">→</div>
                      </div>
                    </button>
                  </div>
                </div>
              </ScrollFade>
            </div>

            {/* Back of the card */}
            <div className="flip-card-back">
              <ScrollFade>
                <div className="space-y-12">
                  {/* Back Button */}
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flip-back-btn"
                  >
                    <span>←</span>
                    <span className="caption">back</span>
                  </button>

                  <div className="grid md:grid-cols-2 gap-12">
                    <AuthorInfo />
                    <DesignerStatus />
                  </div>

                  {/* Publication Details */}
                  <div className="text-center pt-8 border-t border-gryd-soft/20">
                    <div className="space-y-2">
                      <div className="caption text-gryd-soft">
                        GRYD MAGAZINE • Design Portfolio • By Aditya Nawal
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

export default Contact;
