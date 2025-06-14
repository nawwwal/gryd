
const AuthorInfo = () => {
  return (
    <div className="author-colophon">
      <div className="author-section">
        <h3 className="section-title">About the Author</h3>
        <div className="contact-details">
          <div className="contact-item interactive-contact-item">
            <span className="contact-label">Designer</span>
            <span className="contact-value">Aditya Nawal</span>
          </div>
          <div className="contact-item interactive-contact-item">
            <span className="contact-label">Email</span>
            <a href="mailto:aditya@example.com" className="contact-value interactive-contact-value">
              aditya@example.com
            </a>
          </div>
          <div className="response-time">
            <span>Usually respond within 24 hours</span>
          </div>
        </div>
      </div>
      
      <div className="social-section">
        <h3 className="section-title">Connect</h3>
        <div className="social-links">
          <a href="#" className="social-link interactive-social">
            <span className="social-label">LinkedIn</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link interactive-social">
            <span className="social-label">Twitter</span>
            <span className="social-arrow">↗</span>
          </a>
          <a href="#" className="social-link interactive-social">
            <span className="social-label">Dribbble</span>
            <span className="social-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
