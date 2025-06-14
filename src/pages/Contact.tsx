
import ScrollFade from '../components/ScrollFade';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import StatusIndicator from '../components/StatusIndicator';

const Contact = () => {
  return (
    <div className="contact-magazine-container">
      {/* Editorial Contact Spread */}
      <div className="contact-editorial-spread">
        {/* Left Page - Main Content */}
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
                <h1 className="editorial-title animated-title">let's talk.</h1>
                
                <div className="editorial-body">
                  <p className="drop-cap-paragraph">
                    <span className="drop-cap floating">I</span> work with teams who care deeply about what they're building. These are the collaborators who understand that great products aren't just functional—they're thoughtful, intentional, and crafted with genuine care for the people who'll use them.
                  </p>
                  
                  <p className="body-text fade-in-text">
                    If that sounds like you and your team, I'd love to hear about what you're working on.
                  </p>
                  
                  <div className="call-to-action">
                    <a 
                      href="https://calendly.com/your-handle" 
                      className="primary-action interactive-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="action-text">book a call</span>
                      <span className="action-arrow animated-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollFade>

            <ScrollFade delay={400}>
              <ContactForm />
            </ScrollFade>
          </div>
          
          {/* Interactive binding effects */}
          <div className="page-binding left-binding interactive-binding"></div>
        </div>
        
        {/* Right Page - Contact Details */}
        <div className="contact-right-page">
          <div className="page-content">
            <ScrollFade delay={600}>
              <ContactInfo />
            </ScrollFade>
            
            <ScrollFade delay={800}>
              <StatusIndicator />
            </ScrollFade>
            
            <ScrollFade delay={1000}>
              <div className="publication-details">
                <div className="pub-line animated-pub-line"></div>
                <div className="pub-info">
                  <span>THE GRYD</span>
                  <span className="pub-separator">•</span>
                  <span>Portfolio & Journal</span>
                  <span className="pub-separator">•</span>
                  <span>2024 Edition</span>
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
              <div className="logo-symbol floating-logo">G</div>
              <div className="publisher-text">
                <span>GRYD DESIGN</span>
                <span>STUDIO</span>
              </div>
            </div>
          </div>
        </ScrollFade>
      </div>
    </div>
  );
};

export default Contact;
