
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MagazineFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState(() => {
    const conditions = ['Partly Cloudy', 'Sunny', 'Overcast', 'Light Rain', 'Clear Skies'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  });
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getPageVariant = () => {
    if (location.pathname.includes('/work')) return 'footer-work-variant';
    if (location.pathname.includes('/about')) return 'footer-about-variant';
    if (location.pathname.includes('/playground')) return 'footer-playground-variant';
    return '';
  };

  const getPageSpecificContent = () => {
    switch (true) {
      case location.pathname.includes('/work'):
        return {
          specialSection: {
            header: 'PORTFOLIO STATS',
            details: [
              'Projects Completed: 12+',
              'Clients Satisfied: 8',
              'Design Systems Built: 3',
              'Lines of Code: 50,000+'
            ]
          }
        };
      case location.pathname.includes('/about'):
        return {
          specialSection: {
            header: 'EDITORIAL TEAM',
            details: [
              'Editor-in-Chief: Aditya Nawal',
              'Design Director: Aditya Nawal',
              'UX Lead: Aditya Nawal',
              'One-Person Army: Active'
            ]
          }
        };
      case location.pathname.includes('/playground'):
        return {
          specialSection: {
            header: 'EXPERIMENTS',
            details: [
              'Active Projects: 5',
              'Prototypes Built: 23',
              'Ideas Brewing: ∞',
              'Last Update: Today'
            ]
          }
        };
      default:
        return {
          specialSection: {
            header: 'PUBLICATION',
            details: [
              'GRYD MAGAZINE',
              'Volume I, Issue 001',
              'First Published: Dec 2024',
              'Digital Edition'
            ]
          }
        };
    }
  };

  const pageContent = getPageSpecificContent();

  return (
    <div className={`magazine-footer-enhanced ${getPageVariant()}`}>
      <div className="footer-paper">
        <div className="footer-binding"></div>
        
        {/* Magazine Footer Title */}
        <div className="footer-magazine-title">
          <div className="footer-title-ornaments">
            <div className="footer-ornament-left">◆</div>
            <div className="footer-title-line"></div>
          </div>
          <h2 className="footer-main-title">APPENDIX</h2>
          <div className="footer-title-ornaments">
            <div className="footer-title-line"></div>
            <div className="footer-ornament-right">◆</div>
          </div>
          <div className="footer-subtitle">Reference Materials & Further Reading</div>
        </div>
        
        {/* Editorial Stamp */}
        <div className="footer-editorial-stamp">
          <div className="stamp-text">
            <div>GRYD</div>
            <div>EST.</div>
            <div>2024</div>
          </div>
        </div>
        
        <div className="footer-content-grid">
          {/* Page-Specific Content */}
          <div className="footer-section">
            <div className="footer-section-header">{pageContent.specialSection.header}</div>
            <div className="footer-details">
              {pageContent.specialSection.details.map((detail, index) => (
                <div key={index}>{detail}</div>
              ))}
            </div>
          </div>

          {/* Editorial Office */}
          <div className="footer-section">
            <div className="footer-section-header">EDITORIAL OFFICE</div>
            <div className="footer-details">
              <div>Aditya Nawal, Editor-in-Chief</div>
              <div>Design & Systems Dept.</div>
              <div>Currently: Gandhinagar, IN</div>
              <div>Previously: Quicko HQ</div>
            </div>
            <div className="footer-social-links">
              <a href="mailto:hello@adityanawal.com" className="footer-social-link">
                <span>✉</span>
                <span>Correspondence</span>
              </a>
              <a href="https://linkedin.com/in/adityanawal" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <span>🔗</span>
                <span>Professional</span>
              </a>
            </div>
          </div>

          {/* Real-time Information */}
          <div className="footer-section">
            <div className="footer-section-header">READER'S DESK</div>
            <div className="footer-details">
              <div>Your Local Time:</div>
              <div className="live-time">{formatTime(currentTime)}</div>
              <div>Weather: {weather}</div>
              <div>Reading Duration: ∞</div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="footer-section">
            <div className="footer-section-header">SPECIFICATIONS</div>
            <div className="footer-details">
              <div>Typography: JetBrains Mono + Fraunces</div>
              <div>Paper Stock: Digital Canvas</div>
              <div>Print Run: Unlimited</div>
              <div>Binding: Perfect Web</div>
            </div>
          </div>

          {/* Fun Statistics */}
          <div className="footer-section">
            <div className="footer-section-header">STATISTICS</div>
            <div className="footer-details">
              <div>Pixels Obsessed Over: 847,291</div>
              <div>Chai Cups Consumed: 2,156</div>
              <div>3AM Design Sessions: 47</div>
              <div>Lines of Code: Still Counting</div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="footer-section">
            <div className="footer-section-header">LEGAL</div>
            <div className="footer-details">
              <div>© 2024 Aditya Nawal</div>
              <div>All Rights Reserved</div>
              <div>No AI Training Data</div>
              <div>Made with ♥ & ☕</div>
            </div>
            
            {/* Subscription Box Mockup */}
            <div className="footer-subscription-box">
              <div className="subscription-title">STAY UPDATED</div>
              <div className="subscription-text">
                Follow the journey of pixels, products & processes
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-imprint">
            <span>GRYD MAGAZINE</span>
            <span>•</span>
            <span>A PUBLICATION OF SYSTEMS, STORIES & SIDEQUESTS</span>
            <span>•</span>
            <span>PRINTED ON THE INTERNET</span>
          </div>
          
          <div className="footer-page-marker">
            <div className="page-corner-fold"></div>
            <span>END OF ISSUE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineFooter;
