import ScrollFade from './ScrollFade';
import { ArrowRight, Feather, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LettersToEditor = () => {
  return (
    <section className="letters-editorial-section">
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

            {/* Centered Single Column Contact Card */}
            <div className="magazine-contact-centered">
              <div className="contact-story-section">
                <div className="contact-story-header">
                  <div className="story-category">CORRESPONDENCE</div>
                  <h3 className="story-headline">Ready to Create Something Extraordinary?</h3>
                </div>
              </div>

              <div className="contact-details-box">
                <div className="contact-box-header">
                  <h4>Get in Touch</h4>
                  <div className="header-underline"></div>
                </div>

                <div className="contact-methods-list">
                  <div className="contact-method-item">
                    <div className="method-icon">
                      <MessageCircle size={18} />
                    </div>
                    <div className="method-content">
                      <span className="method-label">Let's Talk</span>
                      <span className="method-value">See the epilogue on the editor's page for all the ways to reach out</span>
                    </div>
                  </div>
                </div>

                <div className="contact-cta-section">
                  <Link to="/about#epilogue" className="magazine-cta-button">
                    <span className="cta-text text-gryd-bg">Meet the Editor</span>
                    <ArrowRight size={16} />
                  </Link>
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
    </section>
  );
};

export default LettersToEditor;
