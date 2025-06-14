
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="magazine-container">
      {/* Magazine Header */}
      <div className="magazine-hero">
        <div className="hero-paper">
          <div className="paper-binding"></div>
          
          <div className="hero-content">
            <ScrollFade>
              <div className="masthead">
                <div className="issue-details">
                  <span className="issue-number">Connect</span>
                  <span className="issue-date">Contact</span>
                  <span className="price">Open</span>
                </div>
                
                <h1 className="magazine-logo">
                  CONTACT
                  <span className="subtitle">Let's Talk About Your Project</span>
                </h1>
                
                <div className="feature-banner">
                  <span>Open for Business: Projects That Matter</span>
                </div>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={300}>
              <div className="hero-story">
                <div className="story-category">CONSULTATION</div>
                <h2 className="story-headline">
                  Let's Talk<br/>
                  <span className="story-subhead">Got a project keeping you up at night?</span>
                </h2>
                
                <div className="story-lead">
                  <p className="lead-text">
                    Something your team says is impossible?
                    A problem that needs thinking sideways?
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
          
          <div className="paper-corner"></div>
          <div className="paper-shadow"></div>
        </div>
      </div>

      {/* Contact Article */}
      <div className="magazine-spread">
        <article className="featured-article">
          <ScrollFade>
            <div className="article-header">
              <div className="article-category">CONSULTATION</div>
              <h3 className="article-headline">Book 30 Minutes</h3>
              <p className="article-deck">We'll figure out if I can help. No sales pitch, just straight talk.</p>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={200}>
            <div className="article-excerpt">
              <p>Usually respond within a few hours. If it's urgent, mention that in the booking. If it's not urgent, still mention that. I like clarity.</p>
              
              <div className="cta-contact">
                <a 
                  href="https://calendly.com/your-handle" 
                  className="editorial-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Call
                </a>
                
                <div className="contact-note">
                  <span>Or reach out directly:</span>
                  <a href="mailto:hello@gryd.dev">hello@gryd.dev</a>
                </div>
              </div>
            </div>
          </ScrollFade>
        </article>
      </div>

      {/* Response Time */}
      <div className="table-of-contents">
        <ScrollFade>
          <div className="toc-header">
            <h3>Response Times</h3>
            <div className="toc-line"></div>
          </div>
          
          <div className="toc-entries">
            <div className="toc-entry">
              <span className="toc-page">~2h</span>
              <span className="toc-title">Email responses (weekdays)</span>
            </div>
            <div className="toc-entry">
              <span className="toc-page">~1d</span>
              <span className="toc-title">Calendar booking confirmations</span>
            </div>
            <div className="toc-entry">
              <span className="toc-page">∞</span>
              <span className="toc-title">Spam and cold pitches</span>
            </div>
          </div>
        </ScrollFade>
      </div>

      <div className="magazine-footer">
        <div className="footer-content">
          <div className="footer-logo">THE GRYD</div>
          <div className="footer-info">
            <span>Contact • Open for Projects</span>
            <span>Available for Work That Matters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
