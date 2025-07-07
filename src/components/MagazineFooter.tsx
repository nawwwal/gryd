import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const MagazineFooter = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Ticker messages that will cycle through - clever and relevant
  const tickerMessages = [
    "BREAKING: Designer discovers that good typography is just fancy spacing",
    "LATEST: User research reveals people actually read the content (shocking)",
    "UPDATE: CSS Grid finally makes sense after 47 attempts",
    "FEATURE: Why every button needs a hover state and a backstory",
    "INSIGHT: The best designs are the ones you don't notice",
    "TRENDING: Designers everywhere are questioning their life choices",
    "ANALYSIS: How to explain design decisions without crying",
    "REPORT: The correlation between coffee consumption and pixel perfection",
    "DEVELOPMENT: New study shows users prefer interfaces that work",
    "INNOVATION: Revolutionary discovery: white space is not empty space",
    "EXCLUSIVE: The secret to good design? Start with the content",
    "FLASH: Designer successfully explains design thinking to stakeholders",
    "URGENT: Someone finally figured out what 'responsive' actually means",
    "SPECIAL: The untold story of why designers love dark mode",
    "LIVE: Breaking news - good design is invisible, bad design is everywhere"
  ];

  return (
    <footer className="newspaper-footer">
      <div className="footer-content">
        <div className="footer-classified-grid">
          {/* Section 1: Index */}
          <div className="classified-section">
            <h3 className="classified-title">Index</h3>
            <div className="nav-list">
              <Link to="/" className="nav-item">
                <span className="nav-text">Home</span>
                <span className="nav-number">p.01</span>
              </Link>
              <Link to="/work" className="nav-item">
                <span className="nav-text">Work</span>
                <span className="nav-number">p.02</span>
              </Link>
              <Link to="/playground" className="nav-item">
                <span className="nav-text">Playground</span>
                <span className="nav-number">p.03</span>
              </Link>
              <Link to="/about" className="nav-item">
                <span className="nav-text">About</span>
                <span className="nav-number">p.04</span>
              </Link>
            </div>
          </div>

          {/* Section 2: Colophon */}
          <div className="classified-section">
            <h3 className="classified-title">Colophon</h3>
            <div className="classified-list">
              <div className="classified-item">
                <span className="label">Editor:</span>
                <span>Aditya Nawal</span>
              </div>
              <div className="classified-item">
                <span className="label">Published:</span>
                <span>MMXXIV</span>
              </div>
              <div className="classified-item">
                <span className="label">Fonts:</span>
                <span>Platypi, Fraunces, JetBrains Mono</span>
              </div>
              <div className="classified-item">
                <span className="label">Built with:</span>
                <span>React, Sanity, Tailwind</span>
              </div>
            </div>
          </div>

          {/* Section 3: Inquiries */}
          <div className="classified-section">
            <h3 className="classified-title">Inquiries</h3>
            <div className="classified-list">
                <div className="classified-item">
                    <span>For projects, collaborations, or just to say hello:</span>
                </div>
                <div className="classified-item">
                    <a href="mailto:hello@gryd.dev">hello@gryd.dev</a>
                </div>
            </div>
          </div>

          {/* Section 4: Socials */}
          <div className="classified-section">
            <h3 className="classified-title">Socials</h3>
            <div className="classified-list">
                <div className="classified-item">
                    <a href="https://linkedin.com/in/adityanawal" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <div className="classified-item">
                    <a href="https://twitter.com/adityanawal" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
                <div className="classified-item">
                    <a href="https://github.com/adityanawal" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-info">
            <span className="copyright">© 2024 THE GRYD. All rights reserved.</span>
            <span className="motto">"Making complex things feel inevitable"</span>
          </div>
        </div>
      </div>

      {/* Continuous Ticker */}
      <div className="news-ticker" ref={tickerRef}>
        <div className="ticker-container">
          <div className="ticker-track">
            {tickerMessages.map((message, index) => {
              const label = message.split(':')[0];
              const content = message.split(': ').slice(1).join(': ');
              return (
                <div key={index} className="ticker-item">
                  <span className="ticker-label">{label}:</span>
                  <span className="ticker-message">{content}</span>
                </div>
              );
            })}
            {/* Duplicate for seamless loop */}
            {tickerMessages.map((message, index) => {
              const label = message.split(':')[0];
              const content = message.split(': ').slice(1).join(': ');
              return (
                <div key={`duplicate-${index}`} className="ticker-item">
                  <span className="ticker-label">{label}:</span>
                  <span className="ticker-message">{content}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MagazineFooter;
