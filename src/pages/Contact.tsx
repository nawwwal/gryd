
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="magazine-container">
      {/* Contact Consultation Header */}
      <div className="consultation-header">
        <div className="consultation-layout">
          <ScrollFade>
            <div className="consultation-meta">
              <span className="meta-badge">Open for Business</span>
              <span className="consultation-status">
                <div className="status-dot"></div>
                Available for Projects
              </span>
            </div>
            
            <h1 className="consultation-title">
              Let's Talk About<br />
              <span className="consultation-subtitle">Your Next Project</span>
            </h1>
            
            <div className="consultation-intro">
              <p className="intro-text">
                Got a project keeping you up at night? Something your team says is impossible? 
                A problem that needs thinking sideways?
              </p>
              <p className="intro-subtext">
                Book 30 minutes. We'll figure out if I can help.
              </p>
            </div>
          </ScrollFade>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="magazine-spread">
        <div className="contact-methods">
          <ScrollFade>
            <div className="method-primary">
              <h3 className="method-title">Book a Call</h3>
              <p className="method-description">
                No sales pitch, just straight talk. Usually respond within a few hours.
              </p>
              <a 
                href="https://calendly.com/your-handle" 
                className="editorial-button primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule 30min
              </a>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={200}>
            <div className="method-secondary">
              <h3 className="method-title">Send an Email</h3>
              <p className="method-description">
                Prefer to write? Drop me a line with your project details.
              </p>
              <a 
                href="mailto:hello@gryd.dev"
                className="editorial-button secondary"
              >
                hello@gryd.dev
              </a>
            </div>
          </ScrollFade>
        </div>
      </div>

      {/* Response Times Table */}
      <div className="response-times">
        <ScrollFade>
          <div className="times-header">
            <h3>Response Times</h3>
            <div className="times-line"></div>
          </div>
          
          <div className="times-table">
            <div className="time-row">
              <span className="time-duration">~2 hours</span>
              <span className="time-description">Email responses (weekdays)</span>
            </div>
            <div className="time-row">
              <span className="time-duration">~1 day</span>
              <span className="time-description">Calendar booking confirmations</span>
            </div>
            <div className="time-row">
              <span className="time-duration">∞</span>
              <span className="time-description">Spam and cold pitches</span>
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
