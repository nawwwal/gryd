
import { useState, useEffect } from 'react';

const MagazineFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather] = useState(() => {
    const conditions = ['Partly Cloudy', 'Sunny', 'Overcast', 'Light Rain', 'Clear Skies'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  });

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

  return (
    <div className="magazine-footer-enhanced">
      <div className="footer-paper">
        <div className="footer-binding"></div>
        
        <div className="footer-content-grid">
          {/* Publication Details */}
          <div className="footer-section">
            <div className="footer-section-header">PUBLICATION</div>
            <div className="footer-details">
              <div>GRYD MAGAZINE</div>
              <div>Volume I, Issue 001</div>
              <div>First Published: Dec 2024</div>
              <div>Digital Edition</div>
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
              <div>Typography: Inter + Playfair</div>
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
