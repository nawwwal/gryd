
import ScrollFade from '../components/ScrollFade';
import AuthorInfo from '../components/AuthorInfo';
import DesignerStatus from '../components/DesignerStatus';
import { useState } from 'react';

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-screen bg-gryd-bg overflow-hidden">
      <div className="editorial-container h-full py-4">
        <div className="flip-card-container h-full">
          <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <ScrollFade>
                <div className="h-full grid grid-rows-[auto_1fr_auto] gap-4">
                  {/* Page Header */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-8 h-px bg-gryd-accent"></div>
                      <span className="caption">EPILOGUE</span>
                      <div className="w-8 h-px bg-gryd-accent"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col justify-center max-w-xl mx-auto space-y-4 px-4">
                    <h1 className="text-4xl md:text-5xl font-headline leading-tight text-center text-gryd-text">
                      every story needs an ending.
                    </h1>
                    
                    <div className="space-y-3 text-center">
                      <p className="body text-gryd-soft text-base leading-relaxed">
                        But the best endings feel like beginnings. Behind every pixel in this magazine is a simple truth: design is about making life better.
                      </p>
                      
                      <p className="body text-gryd-soft text-base leading-relaxed">
                        I'm Aditya Nawal, the product designer behind GRYD. If you're building something meaningful, I'd love to hear your story.
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pt-2">
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
                  <div className="flex justify-between items-end">
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
                <div className="h-full grid grid-rows-[auto_1fr] gap-4">
                  {/* Back Button */}
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flip-back-btn self-start"
                  >
                    <span>←</span>
                    <span className="caption">back</span>
                  </button>

                  <div className="grid md:grid-cols-2 gap-6 overflow-y-auto">
                    <div className="space-y-6">
                      <AuthorInfo />
                    </div>
                    <div className="space-y-6">
                      <DesignerStatus />
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
