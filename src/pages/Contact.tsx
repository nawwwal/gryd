
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="magazine-container">
      {/* Editorial Contact Spread */}
      <div className="contact-editorial-spread">
        {/* Left Page - Main Content */}
        <div className="contact-left-page">
          <div className="page-content">
            <ScrollFade>
              <div className="editorial-header">
                <div className="section-marker">
                  <span className="marker-line"></span>
                  <span className="marker-text">EPILOGUE</span>
                  <span className="marker-line"></span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={200}>
              <div className="main-editorial">
                <h1 className="editorial-title">let's talk.</h1>
                
                <div className="editorial-body">
                  <p className="drop-cap-paragraph">
                    <span className="drop-cap">I</span> work with teams who care deeply about what they're building. These are the collaborators who understand that great products aren't just functional—they're thoughtful, intentional, and crafted with genuine care for the people who'll use them.
                  </p>
                  
                  <p className="body-text">
                    If that sounds like you and your team, I'd love to hear about what you're working on.
                  </p>
                  
                  <div className="call-to-action">
                    <a 
                      href="https://calendly.com/your-handle" 
                      className="primary-action"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="action-text">book a call</span>
                      <span className="action-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          {/* Left page binding shadow */}
          <div className="page-binding left-binding"></div>
        </div>
        
        {/* Right Page - Author Details */}
        <div className="contact-right-page">
          <div className="page-content">
            <ScrollFade delay={400}>
              <div className="author-colophon">
                <div className="author-section">
                  <h3 className="section-title">Direct Contact</h3>
                  <div className="contact-details">
                    <div className="contact-item">
                      <span className="contact-label">Email</span>
                      <a href="mailto:hello@gryd.dev" className="contact-value">hello@gryd.dev</a>
                    </div>
                    <div className="response-time">
                      <span>Usually respond within a few hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="availability-section">
                  <h3 className="section-title">Current Status</h3>
                  <div className="status-indicator">
                    <div className="status-dot available"></div>
                    <span className="status-text">Available for new projects</span>
                  </div>
                  <p className="availability-note">
                    Currently taking on select projects for Q1 2025. 
                    Best fit for teams looking for strategic design partnership 
                    rather than just execution.
                  </p>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={600}>
              <div className="publication-details">
                <div className="pub-line"></div>
                <div className="pub-info">
                  <span>THE GRYD</span>
                  <span className="pub-separator">•</span>
                  <span>Portfolio & Journal</span>
                  <span className="pub-separator">•</span>
                  <span>2024 Edition</span>
                </div>
                <div className="pub-line"></div>
              </div>
            </ScrollFade>
          </div>
          
          {/* Right page binding shadow */}
          <div className="page-binding right-binding"></div>
        </div>
        
        {/* Center binding */}
        <div className="center-binding"></div>
        
        {/* Page numbers */}
        <div className="page-numbers">
          <span className="page-number left-page-num">46</span>
          <span className="page-number right-page-num">47</span>
        </div>
      </div>
      
      {/* Back Cover */}
      <div className="back-cover">
        <ScrollFade delay={800}>
          <div className="back-cover-content">
            <div className="publisher-mark">
              <div className="logo-symbol">G</div>
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
