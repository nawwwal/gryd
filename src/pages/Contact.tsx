
import ScrollFade from '../components/ScrollFade';
import AuthorInfo from '../components/AuthorInfo';
import DesignerStatus from '../components/DesignerStatus';

const Contact = () => {
  return (
    <div className="contact-magazine-container">
      {/* Editorial Epilogue Spread */}
      <div className="contact-editorial-spread">
        {/* Left Page - Epilogue Content */}
        <div className="contact-left-page">
          <div className="page-content">
            <ScrollFade>
              <div className="editorial-header">
                <div className="section-marker">
                  <span className="marker-line animated-line"></span>
                  <span className="marker-text">EPILOGUE</span>
                  <span className="marker-line animated-line"></span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={200}>
              <div className="main-editorial">
                <h1 className="editorial-title animated-title">every story needs an ending.</h1>
                
                <div className="editorial-body">
                  <p className="drop-cap-paragraph">
                    <span className="drop-cap floating">B</span>ut the best endings feel like beginnings. Behind every pixel, wireframe, and user journey in this magazine is a simple truth: design is about making life a little better for the people who matter most.
                  </p>
                  
                  <p className="body-text fade-in-text">
                    I'm Aditya Nawal, the product designer behind GRYD. This magazine isn't just a portfolio—it's a manifesto for thoughtful design that bridges human needs with business goals.
                  </p>

                  <p className="body-text fade-in-text">
                    Every project you've seen here represents a conversation, a problem solved, a user delighted. If you're building something meaningful and need a design partner who thinks strategically, I'd love to hear your story.
                  </p>
                  
                  <div className="call-to-action">
                    <a 
                      href="https://calendly.com/your-handle" 
                      className="primary-action interactive-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="action-text">schedule a conversation</span>
                      <span className="action-arrow animated-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          {/* Interactive binding effects */}
          <div className="page-binding left-binding interactive-binding"></div>
        </div>
        
        {/* Right Page - Author Details */}
        <div className="contact-right-page">
          <div className="page-content">
            <ScrollFade delay={600}>
              <AuthorInfo />
            </ScrollFade>
            
            <ScrollFade delay={800}>
              <DesignerStatus />
            </ScrollFade>
            
            <ScrollFade delay={1000}>
              <div className="publication-details">
                <div className="pub-line animated-pub-line"></div>
                <div className="pub-info">
                  <span>GRYD MAGAZINE</span>
                  <span className="pub-separator">•</span>
                  <span>Design Portfolio</span>
                  <span className="pub-separator">•</span>
                  <span>By Aditya Nawal</span>
                </div>
                <div className="pub-line animated-pub-line"></div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="page-binding right-binding interactive-binding"></div>
        </div>
        
        {/* Interactive center binding */}
        <div className="center-binding interactive-center-binding"></div>
        
        {/* Animated page numbers */}
        <div className="page-numbers">
          <span className="page-number left-page-num animated-page-num">46</span>
          <span className="page-number right-page-num animated-page-num">47</span>
        </div>
      </div>
      
      {/* Enhanced Back Cover */}
      <div className="back-cover interactive-back-cover">
        <ScrollFade delay={1200}>
          <div className="back-cover-content">
            <div className="publisher-mark interactive-publisher">
              <div className="logo-symbol floating-logo">A</div>
              <div className="publisher-text">
                <span>ADITYA NAWAL</span>
                <span>PRODUCT DESIGNER</span>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>
    </div>
  );
};

export default Contact;
