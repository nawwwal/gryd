
import ScrollFade from '../components/ScrollFade';

const Contact = () => {
  return (
    <div className="magazine-container">
      {/* Book Closing Page */}
      <div className="book-closing-page">
        <div className="closing-content">
          <ScrollFade>
            <div className="closing-text">
              <h1 className="closing-title">let's talk.</h1>
              
              <div className="closing-body">
                <p>i work with teams who care deeply about what they're building.</p>
                <p>if that's you, say hi.</p>
              </div>
              
              <div className="closing-action">
                <a 
                  href="https://calendly.com/your-handle" 
                  className="book-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  book a call →
                </a>
              </div>
            </div>
          </ScrollFade>
          
          <ScrollFade delay={400}>
            <div className="author-details">
              <div className="contact-method">
                <span className="method-label">or write directly</span>
                <a href="mailto:hello@gryd.dev" className="method-link">hello@gryd.dev</a>
              </div>
              
              <div className="response-note">
                <span>usually respond within a few hours</span>
              </div>
            </div>
          </ScrollFade>
        </div>
        
        {/* Subtle page number like in a book */}
        <div className="page-number">47</div>
      </div>

      {/* Minimal colophon/publication info */}
      <div className="book-colophon">
        <ScrollFade delay={600}>
          <div className="colophon-content">
            <div className="publication-info">
              <span>THE GRYD</span>
              <span>•</span>
              <span>Available for Work</span>
              <span>•</span>
              <span>2024</span>
            </div>
          </div>
        </ScrollFade>
      </div>
    </div>
  );
};

export default Contact;
