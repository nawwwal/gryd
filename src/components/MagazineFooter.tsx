import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const MagazineFooter = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  // Ticker messages that will cycle through
  const tickerMessages = [
    "Design thinking meets editorial excellence in THE GRYD magazine",
    "New experiments in digital storytelling now live in the playground",
    "Portfolio projects showcase innovative product design solutions",
    "Editorial approach to user experience design continues to evolve",
    "The intersection of journalism and design creates compelling narratives",
    "Magazine-style layouts influence modern web design patterns",
    "How editorial design principles enhance digital product experiences",
    "Design systems that prioritize reading and comprehension",
    "Experimental interfaces that challenge conventional web patterns",
    "Bridging the gap between print journalism and digital interaction"
  ];

  return (
    <footer className="newspaper-footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Center Heading */}
        <div className="footer-masthead">
          <div className="masthead-divider-top"></div>
          <h2 className="footer-title">THE GRYD</h2>
          <p className="footer-subtitle">permanent issue 01 • design journalism</p>
          <div className="masthead-divider-bottom"></div>
        </div>

        {/* Grid Layout */}
        <div className="footer-grid">
          {/* Navigation Column */}
          <div className="footer-column">
            <h3 className="column-title">Navigation</h3>
            <div className="column-content">
              <Link to="/" className="footer-link">home</Link>
              <Link to="/work" className="footer-link">work</Link>
              <Link to="/playground" className="footer-link">playground</Link>
              <Link to="/about" className="footer-link">about</Link>
              <Link to="/contact" className="footer-link">contact</Link>
            </div>
          </div>

          {/* Editorial Column */}
          <div className="footer-column">
            <h3 className="column-title">Editorial</h3>
            <div className="column-content">
              <div className="editorial-item">
                <span className="item-label">Editor:</span>
                <span className="item-value">Aditya Nawal</span>
              </div>
              <div className="editorial-item">
                <span className="item-label">Design:</span>
                <span className="item-value">Product & Editorial</span>
              </div>
              <div className="editorial-item">
                <span className="item-label">Published:</span>
                <span className="item-value">2024</span>
              </div>
              <div className="editorial-item">
                <span className="item-label">Location:</span>
                <span className="item-value">Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Connect Column */}
          <div className="footer-column">
            <h3 className="column-title">Connect</h3>
            <div className="column-content">
              <a href="mailto:hello@gryd.dev" className="footer-link">hello@gryd.dev</a>
              <a href="https://linkedin.com/in/adityanawal" className="footer-link">LinkedIn</a>
              <a href="https://twitter.com/adityanawal" className="footer-link">Twitter</a>
              <a href="https://github.com/adityanawal" className="footer-link">GitHub</a>
            </div>
          </div>

          {/* Status Column */}
          <div className="footer-column">
            <h3 className="column-title">Status</h3>
            <div className="column-content">
              <div className="status-item">
                <span className="status-dot active"></span>
                <span className="status-text">Available for projects</span>
              </div>
              <div className="status-item">
                <span className="status-dot active"></span>
                <span className="status-text">Designing & writing</span>
              </div>
              <div className="status-item">
                <span className="status-dot active"></span>
                <span className="status-text">Experimental mode</span>
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
            {tickerMessages.map((message, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-label">
                  {index === 0 ? 'BREAKING:' :
                   index === 1 ? 'LATEST:' :
                   index === 2 ? 'UPDATE:' :
                   index === 3 ? 'FEATURE:' :
                   index === 4 ? 'INSIGHT:' :
                   index === 5 ? 'TRENDING:' :
                   index === 6 ? 'ANALYSIS:' :
                   index === 7 ? 'REPORT:' :
                   index === 8 ? 'DEVELOPMENT:' : 'INNOVATION:'}
                </span>
                <span className="ticker-message">{message}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {tickerMessages.map((message, index) => (
              <div key={`duplicate-${index}`} className="ticker-item">
                <span className="ticker-label">
                  {index === 0 ? 'BREAKING:' :
                   index === 1 ? 'LATEST:' :
                   index === 2 ? 'UPDATE:' :
                   index === 3 ? 'FEATURE:' :
                   index === 4 ? 'INSIGHT:' :
                   index === 5 ? 'TRENDING:' :
                   index === 6 ? 'ANALYSIS:' :
                   index === 7 ? 'REPORT:' :
                   index === 8 ? 'DEVELOPMENT:' : 'INNOVATION:'}
                </span>
                <span className="ticker-message">{message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MagazineFooter;
