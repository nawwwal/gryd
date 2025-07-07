import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MorphingText } from './MorphingText';

const MagazineFooter = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const footer = footerRef.current;
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove);
      return () => footer.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`magazine-footer-lab ${isVisible ? 'footer-animate-in' : ''}`}
    >
      {/* Lab Terminal Header */}
      <div className="lab-terminal-header">
        <div className="terminal-window">
          <div className="terminal-controls">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
          </div>
          <div className="terminal-title">GRYD_LAB_TERMINAL_v2.4.7</div>
        </div>

        <div className="lab-status-bar">
          <div className="status-item">
            <div className="status-dot pulsing"></div>
            <span>SYSTEM ACTIVE</span>
          </div>
          <div className="status-item">
            <span>LAB #47</span>
          </div>
          <div className="status-item">
            <span>EXPERIMENTS: 12</span>
          </div>
          <div className="status-item">
            <span>UPTIME: 247 DAYS</span>
          </div>
        </div>
      </div>

      {/* Morphing Lab Title */}
      <div className="lab-title-section">
        <MorphingText
          texts={['END OF TRANSMISSION', 'LAB SESSION COMPLETE', 'EXPERIMENT CONCLUDED', 'RESEARCH ARCHIVED']}
          className="lab-footer-title"
        />
        <div className="lab-subtitle">
          THE GRYD • Research Laboratory • Permanent Issue 01
        </div>
      </div>

      {/* Interactive Grid */}
      <div className="footer-lab-grid">
        {/* Navigation Column */}
        <div className="lab-column">
          <div className="column-header">
            <div className="header-icon">📂</div>
            <h3>NAVIGATION.DIR</h3>
            <div className="file-count">5 files</div>
          </div>
          <div className="lab-links">
            <Link to="/" className="lab-link">
              <span className="link-prefix">~/</span>
              <span className="link-text">home</span>
              <span className="link-extension">.index</span>
            </Link>
            <Link to="/work" className="lab-link">
              <span className="link-prefix">~/</span>
              <span className="link-text">work</span>
              <span className="link-extension">.portfolio</span>
            </Link>
            <Link to="/playground" className="lab-link">
              <span className="link-prefix">~/</span>
              <span className="link-text">playground</span>
              <span className="link-extension">.experiments</span>
            </Link>
            <Link to="/about" className="lab-link">
              <span className="link-prefix">~/</span>
              <span className="link-text">about</span>
              <span className="link-extension">.readme</span>
            </Link>
            <Link to="/contact" className="lab-link">
              <span className="link-prefix">~/</span>
              <span className="link-text">contact</span>
              <span className="link-extension">.connect</span>
            </Link>
          </div>
        </div>

        {/* Lab Status Column */}
        <div className="lab-column">
          <div className="column-header">
            <div className="header-icon">⚡</div>
            <h3>SYSTEM.STATUS</h3>
            <div className="file-count">live data</div>
          </div>
          <div className="system-metrics">
            <div className="metric-item">
              <span className="metric-label">CURRENT_TIME:</span>
              <span className="metric-value">{new Date().toLocaleTimeString()}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">LOCATION:</span>
              <span className="metric-value">MUMBAI, IN</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">STATUS:</span>
              <span className="metric-value status-active">DESIGNING</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">MOOD:</span>
              <span className="metric-value">EXPERIMENTAL</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">COFFEE_LEVEL:</span>
              <span className="metric-value">████████░░ 80%</span>
            </div>
          </div>
        </div>

        {/* Contact Column */}
        <div className="lab-column">
          <div className="column-header">
            <div className="header-icon">📡</div>
            <h3>CONNECTIONS.NET</h3>
            <div className="file-count">3 channels</div>
          </div>
          <div className="connection-links">
            <a href="mailto:hello@gryd.org" className="connection-link">
              <span className="connection-protocol">SMTP://</span>
              <span className="connection-address">hello@gryd.org</span>
            </a>
            <a href="https://linkedin.com/in/adityanawal" className="connection-link">
              <span className="connection-protocol">HTTPS://</span>
              <span className="connection-address">linkedin.com/in/adityanawal</span>
            </a>
            <a href="https://twitter.com/adityanawal" className="connection-link">
              <span className="connection-protocol">HTTPS://</span>
              <span className="connection-address">twitter.com/adityanawal</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lab Footer */}
      <div className="lab-footer-bar">
        <div className="footer-left">
          <span className="lab-signature">GRYD_LAB © 2024</span>
          <span className="lab-version">v2.4.7-experimental</span>
        </div>
        <div className="footer-center">
          <span className="lab-motto">MAKING COMPLEX THINGS FEEL INEVITABLE</span>
        </div>
        <div className="footer-right">
          <span className="lab-coordinates">19.0760°N 72.8777°E</span>
          <div className="power-indicator">
            <div className="power-dot"></div>
            <span>PWR</span>
          </div>
        </div>
      </div>

      {/* Interactive Background Particles */}
      <div className="footer-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default MagazineFooter;
