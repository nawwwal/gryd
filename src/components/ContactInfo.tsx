const ContactInfo = () => {
  return (
    <div className="author-colophon">
      <div className="author-section">
        <h3 className="section-title">Direct Contact</h3>
        <div className="contact-details">
          <div className="contact-item interactive-contact-item">
            <span className="contact-label">Email</span>
            <a href="mailto:hey@naw.al" className="contact-value interactive-contact-value">
              hey@naw.al
            </a>
            <div className="contact-underline"></div>
          </div>
          <div className="response-time">
            <span>Usually respond within a few hours</span>
          </div>
        </div>
      </div>

      <div className="social-section">
        <h3 className="section-title">Connect</h3>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/adityanawal/" target="_blank" rel="noopener noreferrer" className="social-link interactive-social">
            <span className="social-label">LinkedIn</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="https://twitter.com/adityanawal" target="_blank" rel="noopener noreferrer" className="social-link interactive-social">
            <span className="social-label">Twitter</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="https://github.com/nawwwal" target="_blank" rel="noopener noreferrer" className="social-link interactive-social">
            <span className="social-label">GitHub</span>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
