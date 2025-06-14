
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="magazine-container">
      {/* Contact Consultation Header */}
      <div className="contact-consultation-header">
        <div className="consultation-card">
          <div className="card-corner-clips">
            <div className="clip top-left"></div>
            <div className="clip top-right"></div>
            <div className="clip bottom-left"></div>
            <div className="clip bottom-right"></div>
          </div>
          
          <div className="consultation-content">
            <div className="consultation-badge">
              <span>OPEN FOR BUSINESS</span>
            </div>
            
            <div className="consultation-title-section">
              <h1 className="consultation-title">
                {'LET\'S TALK'.split('').map((letter, index) => (
                  <span key={index} className="hover-letter contact-letter" style={{ animationDelay: `${index * 60}ms` }}>
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </h1>
              <div className="consultation-subtitle">Got a project keeping you up at night?</div>
            </div>
            
            <div className="consultation-cta">
              <div className="cta-text">Book 30 minutes. We'll figure out if I can help.</div>
              <div className="response-time">Usually respond within a few hours</div>
            </div>
          </div>
          
          <div class="paper-clips">
            <div class="paper-clip clip-1"></div>
            <div class="paper-clip clip-2"></div>
          </div>
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
