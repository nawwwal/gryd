import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MagazineFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState('Loading...');
  const [location, setLocation] = useState('Your Location');
  const [stats, setStats] = useState({
    pixelsObsessed: 847291,
    chaiCups: 2156,
    designSessions: 47,
    linesOfCode: 150000
  });
  const routeLocation = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // Update stats in real-time with small increments
      setStats(prev => ({
        pixelsObsessed: prev.pixelsObsessed + Math.floor(Math.random() * 10),
        chaiCups: prev.chaiCups + (Math.random() > 0.95 ? 1 : 0), // Chai every ~20 updates
        designSessions: prev.designSessions + (Math.random() > 0.99 ? 1 : 0), // Rare increment
        linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 50)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch weather and location based on IP (simplified approach)
  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        // Simple IP-based location detection
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();

        if (ipData.city && ipData.country) {
          setLocation(`${ipData.city}, ${ipData.country}`);

          // Simple weather estimation based on coordinates and season
          const month = new Date().getMonth();
          const isWinter = month === 11 || month === 0 || month === 1;
          const isSummer = month >= 5 && month <= 8;

          const weatherOptions = isWinter
            ? ['Crisp & Clear', 'Cozy Clouds', 'Winter Vibes', 'Chill Mode']
            : isSummer
            ? ['Sunny Delight', 'Perfect Weather', 'Golden Hour', 'Bright & Beautiful']
            : ['Spring Fresh', 'Mild & Pleasant', 'Nature\'s Best', 'Refreshing'];

          setWeather(weatherOptions[Math.floor(Math.random() * weatherOptions.length)]);
        }
      } catch (error) {
        // Fallback weather
        const fallbackWeather = ['Creative Storms', 'Pixel Perfect', 'Design Weather', 'Inspiration High'];
        setWeather(fallbackWeather[Math.floor(Math.random() * fallbackWeather.length)]);
        setLocation('Somewhere Creative');
      }
    };

    fetchLocationAndWeather();
  }, []);

  const formatTimePlayful = (date: Date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const timezone = date.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2];

    return { day, time, dateStr, timezone };
  };

  const getPageVariant = () => {
    if (routeLocation.pathname.includes('/work')) return 'footer-work-variant';
    if (routeLocation.pathname.includes('/about')) return 'footer-about-variant';
    if (routeLocation.pathname.includes('/playground')) return 'footer-playground-variant';
    return '';
  };

  const getPageSpecificContent = () => {
    switch (true) {
      case routeLocation.pathname.includes('/work'):
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
      case routeLocation.pathname.includes('/about'):
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
      case routeLocation.pathname.includes('/playground'):
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
  const timeData = formatTimePlayful(currentTime);

  const handleSubscriptionClick = () => {
    // Scroll to contact section or page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // You could also navigate to contact page
    // navigate('/contact');
  };

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
              <a href="mailto:hey@naw.al" className="footer-social-link">
                <span>✉</span>
                <span>Correspondence</span>
              </a>
              <a href="https://www.linkedin.com/in/adityanawal/" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <span>🔗</span>
                <span>Professional</span>
              </a>
            </div>
          </div>

          {/* Real-time Information */}
          <div className="footer-section">
            <div className="footer-section-header">READER'S DESK</div>
            <div className="footer-details">
              <div className="time-display-playful">
                <div className="time-component">
                  <span className="time-label">Today is</span>
                  <span className="time-value day-value">{timeData.day}</span>
                </div>
                <div className="time-component">
                  <span className="time-label">The time</span>
                  <span className="time-value time-value-main">{timeData.time}</span>
                </div>
                <div className="time-component">
                  <span className="time-label">Date & Zone</span>
                  <span className="time-value date-zone">{timeData.dateStr} {timeData.timezone}</span>
                </div>
              </div>
              <div>Weather in {location}:</div>
              <div className="weather-display">{weather}</div>
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

          {/* Real-time Statistics */}
          <div className="footer-section">
            <div className="footer-section-header">LIVE STATISTICS</div>
            <div className="footer-details">
              <div>Pixels Obsessed Over: {stats.pixelsObsessed.toLocaleString()}</div>
              <div>Chai Cups Consumed: {stats.chaiCups.toLocaleString()}</div>
              <div>3AM Design Sessions: {stats.designSessions}</div>
              <div>Lines of Code: {stats.linesOfCode.toLocaleString()}</div>
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

            {/* Subscription Box with Action */}
            <div className="footer-subscription-box" onClick={handleSubscriptionClick}>
              <div className="subscription-title">STAY UPDATED</div>
              <div className="subscription-text">
                Follow the journey of pixels, products & processes
              </div>
              <div className="subscription-cta">Click to Connect →</div>
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
