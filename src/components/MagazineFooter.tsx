import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MagazineFooter = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live time updates
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time in a magazine-style way
  const formatMagazineTime = (date: Date) => {
    const timeString = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const dateString = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return { timeString, dateString, timezone };
  };

  const { timeString, dateString, timezone } = formatMagazineTime(currentTime);

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

          {/* Section 2: Streamlined Colophon */}
          <div className="classified-section colophon-enhanced">
            <h3 className="classified-title">Colophon</h3>
            <div className="classified-list colophon-left-aligned">
              <div className="colophon-masthead">
                <div className="publication-name">THE GRYD</div>
                <div className="publication-subtitle">Vol. I, Issue 001</div>
              </div>

              <div className="colophon-details">
                <div className="classified-item colophon-item">
                  <span className="label">Editor:</span>
                  <span>Aditya Nawal</span>
                </div>
                <div className="classified-item colophon-item">
                  <span className="label">Published:</span>
                  <span>Winter MMXXIV</span>
                </div>
                <div className="classified-item colophon-item">
                  <span className="label">Typography:</span>
                  <span>Platypi SC, Fraunces, JetBrains Mono</span>
                </div>
                <div className="classified-item colophon-item">
                  <span className="label">Technology:</span>
                  <span>React, Sanity CMS, Tailwind CSS</span>
                </div>
                <div className="classified-item colophon-item">
                  <span className="label">Hosting:</span>
                  <span>Vercel Edge Network</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Inquiries - Clean and Focused */}
          <div className="classified-section inquiry-section">
            <h3 className="classified-title">Inquiries</h3>
            <div className="classified-list">
              <div className="inquiry-intro">
                <p className="inquiry-description">
                  For projects, collaborations, creative conversations, or simply to exchange thoughts:
                </p>
              </div>

              <div className="contact-details">
                <div className="contact-item primary-contact">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:hey@naw.al" className="contact-link">hey@naw.al</a>
                </div>

                <div className="contact-item response-time">
                  <span className="contact-label">Response:</span>
                  <span className="contact-value">Usually within 24hrs</span>
                </div>

                <div className="contact-item availability">
                  <span className="contact-label">Status:</span>
                  <span className="contact-value availability-open">Open to new projects</span>
                </div>
              </div>

              <div className="inquiry-note">
                <p>Whether it's a detailed brief or a simple "hello" — all messages welcome.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Socials */}
          <div className="classified-section social-section">
            <h3 className="classified-title">Connect</h3>
            <div className="classified-list">
              <div className="social-links">
                <div className="social-item">
                  <span className="social-label">Professional:</span>
                  <a href="https://www.linkedin.com/in/adityanawal/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                </div>
                <div className="social-item">
                  <span className="social-label">Code:</span>
                  <a href="https://github.com/nawwwal" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                </div>
                <div className="social-item">
                  <span className="social-label">Updates:</span>
                  <a href="https://twitter.com/adityanawal" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
                </div>
              </div>

              <div className="social-note">
                <p>Find me across the digital landscape — always happy to connect.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Live Status - Dedicated Column */}
          <div className="classified-section status-section">
            <h3 className="classified-title">Live Status</h3>
            <div className="classified-list">
              <div className="live-status-section">
                <div className="live-indicator">
                  <span className="live-dot"></span>
                  <span className="live-label">LIVE</span>
                </div>
                <div className="printing-time">
                  <div className="time-label">Current Print Time:</div>
                  <div className="time-display">
                    <span className="time-main">{timeString}</span>
                    <span className="time-meta">{timezone}</span>
                  </div>
                  <div className="date-display">{dateString}</div>
                </div>
                <div className="press-info">
                  <div className="press-run">Press run: ∞ digital copies</div>
                  <div className="binding-style">Binding: Perfect web</div>
                  <div className="edition-info">Edition: Continuous</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-info">
            <span className="copyright">© 2025 THE GRYD. All rights reserved.</span>
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
