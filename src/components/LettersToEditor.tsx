import ScrollFade from './ScrollFade';
import { Mail, Clock, ArrowRight, Feather, Star } from 'lucide-react';
const LettersToEditor = () => {
  return <section className="letters-editorial-section">
      <div className="letters-magazine-page">
        {/* Decorative Header */}
        <div className="letters-page-header">
          <div className="decorative-border-top"></div>
          <div className="letters-masthead">
            <div className="ornamental-left">
              <Feather size={24} className="text-orange-600" />
            </div>
            <div className="section-title-group">
              <span className="section-label">Section VII</span>
              <h2 className="section-title">Letters to the Editor</h2>
              <div className="title-flourish"></div>
            </div>
            <div className="ornamental-right">
              <Star size={24} className="text-orange-600" />
            </div>
          </div>
          <div className="decorative-border-bottom"></div>
        </div>

        <ScrollFade>
          <div className="letters-content-area">
            {/* Editorial Introduction */}
            <div className="editorial-introduction">
              <div className="intro-ornament">❖</div>
              <p className="intro-text">
                "The conversation doesn't end here. Every great design begins with dialogue, 
                and every meaningful project starts with understanding."
              </p>
              <div className="intro-attribution">— The Editorial Board</div>
            </div>

            {/* Main Contact Card */}
            <div className="magazine-contact-spread">
              <div className="contact-column-left">
                <div className="contact-story-header">
                  <div className="story-category">CORRESPONDENCE</div>
                  <h3 className="story-headline">Ready to Create Something Extraordinary?</h3>
                  <div className="story-dateline">Available for select projects • Winter 2024</div>
                </div>

                <div className="contact-story-body">
                  <p className="story-paragraph">
                    Whether you're building the next breakthrough product or fixing something that's broken, 
                    let's explore how thoughtful design can transform your vision into reality.
                  </p>
                  
                  <div className="story-highlight">
                    <strong>Currently accepting:</strong> Product design projects, design system work, 
                    and strategic design consultations for forward-thinking teams.
                  </div>
                </div>
              </div>

              <div className="contact-column-right">
                <div className="contact-details-box">
                  <div className="contact-box-header">
                    <h4>Get in Touch</h4>
                    <div className="header-underline"></div>
                  </div>

                  <div className="contact-methods-list">
                    <div className="contact-method-item">
                      <div className="method-icon">
                        <Mail size={18} />
                      </div>
                      <div className="method-content">
                        <span className="method-label">Project Inquiries</span>
                        <a href="mailto:work@thegryd.com" className="method-link">
                          work@thegryd.com
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon">
                        <Mail size={18} />
                      </div>
                      <div className="method-content">
                        <span className="method-label">General Correspondence</span>
                        <a href="mailto:hello@thegryd.com" className="method-link">
                          hello@thegryd.com
                        </a>
                      </div>
                    </div>

                    <div className="contact-method-item">
                      <div className="method-icon">
                        <Clock size={18} />
                      </div>
                      <div className="method-content">
                        <span className="method-label">Response Time</span>
                        <span className="method-value">Within 24 hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-cta-section">
                    <a href="mailto:work@thegryd.com?subject=Project Inquiry" className="magazine-cta-button">
                      <span className="cta-text text-gryd-bg">Start a Conversation</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="letters-footer-note">
              <div className="note-ornament">◆ ◇ ◆</div>
              <p className="note-text">
                All correspondence is personally reviewed and responded to. 
                Please allow 24-48 hours for detailed project discussions.
              </p>
            </div>
          </div>
        </ScrollFade>
      </div>
    </section>;
};
export default LettersToEditor;