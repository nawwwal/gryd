
import ScrollFade from './ScrollFade';
import { Mail, Clock, ArrowRight } from 'lucide-react';

const LettersToEditor = () => {
  return (
    <section className="editorial-contact-section">
      <div className="editorial-container">
        <ScrollFade>
          <div className="editorial-contact-card">
            <div className="contact-header">
              <div className="contact-category">Editorial</div>
              <h3 className="contact-title">Get in Touch</h3>
              <p className="contact-subtitle">
                Available for new projects and collaborations
              </p>
            </div>

            <div className="contact-grid">
              <div className="contact-method">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Work Inquiries</span>
                  <a href="mailto:work@thegryd.com" className="contact-value">
                    work@thegryd.com
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Editorial</span>
                  <a href="mailto:editor@thegryd.com" className="contact-value">
                    editor@thegryd.com
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Response Time</span>
                  <span className="contact-value">Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="contact-cta">
              <a href="mailto:work@thegryd.com" className="cta-button">
                Start a Conversation
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>
  );
};

export default LettersToEditor;
