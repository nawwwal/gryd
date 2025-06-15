
import { Link, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: '/work', label: 'portfolio' },
    { path: '/about', label: 'editor' },
    { path: '/playground', label: 'experiments' },
  ];

  return (
    <nav className="magazine-masthead-nav">
      <div className="masthead-paper">
        <div className="paper-binding"></div>
        
        <div className="masthead-container">
          {/* Compact Publication Header */}
          <div className="publication-header">
            <div className="issue-details">
              <span>Issue No. 01 • Winter 2024 • Digital Edition</span>
            </div>
            <div className="publication-date">
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>

          {/* Compact Main Masthead */}
          <div className="masthead-main">
            <div className="masthead-left">
              <div className="publication-mark">EST. 2024</div>
            </div>
            
            <div className="masthead-center">
              <Link to="/" className="magazine-title">
                <span className="title-the">THE</span>
                <span className="title-main">GRYD</span>
                <span className="title-subtitle">Design & Strategy Quarterly</span>
              </Link>
            </div>
            
            <div className="masthead-right">
              <button className="download-issue-btn">
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Compact Navigation */}
          <div className="masthead-sections">
            <div className="sections-nav">
              {links.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`section-link ${
                    location.pathname === path ? 'active' : ''
                  }`}
                >
                  <span className="section-number">
                    {path === '/work' ? '01' : path === '/about' ? '02' : '03'}
                  </span>
                  <span className="section-label">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
