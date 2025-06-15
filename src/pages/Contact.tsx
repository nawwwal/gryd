
import ScrollFade from '../components/ScrollFade';
import AuthorInfo from '../components/AuthorInfo';
import DesignerStatus from '../components/DesignerStatus';
import { useState } from 'react';

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-screen bg-gryd-bg overflow-hidden">
      <div className="editorial-container h-full py-8">
        <div className="flip-card-container h-full">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <ScrollFade>
                <div className="h-full flex flex-col justify-between space-y-6">
                  {/* Page Header */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-px bg-gryd-accent"></div>
                      <span className="caption">EPILOGUE</span>
                      <div className="w-12 h-px bg-gryd-accent"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto space-y-6">
                    <h1 className="headline text-center">
                      every story needs an ending.
                    </h1>
                    
                    <div className="space-y-4">
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
                    <div className="text-center pt-4">
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

                  {/* Flip Indicator - Fixed positioning */}
                  <button 
                    onClick={() => setIsFlipped(true)}
                    className="flip-indicator-fixed"
                  >
                    <div className="flip-icon">
                      <span className="caption text-gryd-soft hover:text-gryd-accent transition-colors">
                        more details
                      </span>
                      <div className="flip-arrow">→</div>
                    </div>
                  </button>
                </div>
              </ScrollFade>
            </div>

            {/* Back of the card */}
            <div className="flip-card-back">
              <ScrollFade>
                <div className="h-full flex flex-col space-y-6">
                  {/* Back Button */}
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flip-back-btn self-start"
                  >
                    <span>←</span>
                    <span className="caption">back</span>
                  </button>

                  <div className="flex-1 grid md:grid-cols-2 gap-8 items-start">
                    <AuthorInfo />
                    <DesignerStatus />
                  </div>

                  {/* Publication Details */}
                  <div className="text-center pt-4 border-t border-gryd-soft/20">
                    <div className="caption text-gryd-soft">
                      GRYD MAGAZINE • Design Portfolio • By Aditya Nawal
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
