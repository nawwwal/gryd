
import ScrollFade from '../components/ScrollFade';
import AuthorInfo from '../components/AuthorInfo';
import DesignerStatus from '../components/DesignerStatus';
import { useState } from 'react';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSwipeGesture } from '../hooks/useSwipeGesture';

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isMobile, isTouch } = useMobileOptimization();

  const swipeRef = useSwipeGesture({
    onSwipeLeft: () => {
      if (!isFlipped) setIsFlipped(true);
    },
    onSwipeRight: () => {
      if (isFlipped) setIsFlipped(false);
    }
  });

  return (
    <div className="h-screen bg-gryd-bg overflow-hidden">
      <div className="editorial-container h-full py-2 sm:py-4">
        <div className="flip-card-container h-full" ref={swipeRef}>
          <div className={`flip-card ${isFlipped ? 'flipped' : ''} ${isMobile ? 'mobile-flip' : ''}`}>
            {/* Front of the card */}
            <div className="flip-card-front">
              <ScrollFade>
                <div className="h-full grid grid-rows-[auto_1fr_auto] gap-2 sm:gap-4 p-4 sm:p-0">
                  {/* Page Header */}
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                      <div className="w-4 sm:w-8 h-px bg-gryd-accent"></div>
                      <span className="caption text-xs sm:text-sm">EPILOGUE</span>
                      <div className="w-4 sm:w-8 h-px bg-gryd-accent"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col justify-center max-w-xl mx-auto space-y-3 sm:space-y-4 px-2 sm:px-4">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline leading-tight text-center text-gryd-text">
                      every story needs an ending.
                    </h1>
                    
                    <div className="space-y-2 sm:space-y-3 text-center">
                      <p className="body text-gryd-soft text-sm sm:text-base leading-relaxed">
                        But the best endings feel like beginnings. Behind every pixel in this magazine is a simple truth: design is about making life better.
                      </p>
                      
                      <p className="body text-gryd-soft text-sm sm:text-base leading-relaxed">
                        I'm Aditya Nawal, the product designer behind GRYD. If you're building something meaningful, I'd love to hear your story.
                      </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pt-2">
                      <a 
                        href="https://calendly.com/your-handle" 
                        className="editorial-link subhead text-base sm:text-lg touch-target"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        schedule a conversation
                      </a>
                    </div>
                  </div>

                  {/* Bottom Section with Flip Button */}
                  <div className="flex justify-between items-end">
                    <div className="caption text-gryd-soft text-xs sm:text-sm">
                      GRYD MAGAZINE
                    </div>
                    <button 
                      onClick={() => setIsFlipped(true)}
                      className="flip-indicator-inline touch-target"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="caption text-gryd-soft hover:text-gryd-accent transition-colors text-xs sm:text-sm">
                          {isMobile ? 'swipe left' : 'more details'}
                        </span>
                        <div className="text-base sm:text-lg text-gryd-accent">→</div>
                      </div>
                    </button>
                  </div>
                </div>
              </ScrollFade>
            </div>

            {/* Back of the card */}
            <div className="flip-card-back">
              <ScrollFade>
                <div className="h-full grid grid-rows-[auto_1fr] gap-2 sm:gap-4 p-4 sm:p-0">
                  {/* Back Button */}
                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="flip-back-btn self-start touch-target"
                  >
                    <span>←</span>
                    <span className="caption text-xs sm:text-sm">
                      {isMobile ? 'swipe right' : 'back'}
                    </span>
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-y-auto">
                    <div className="space-y-4 sm:space-y-6">
                      <AuthorInfo />
                    </div>
                    <div className="space-y-4 sm:space-y-6">
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
