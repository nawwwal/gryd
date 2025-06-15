
import { Link, useLocation } from 'react-router-dom';
import { Download, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: '/work', label: 'portfolio' },
    { path: '/about', label: 'editor' },
    { path: '/playground', label: 'experiments' },
  ];

  return (
    <nav className="magazine-masthead-nav">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="masthead-paper">
          <div className="paper-binding"></div>
          
          {/* Minimal Header - Always Visible */}
          <div className="minimal-header">
            <div className="minimal-container">
              <div className="minimal-left">
                <Link to="/" className="minimal-logo">
                  <span className="minimal-title">THE GRYD</span>
                </Link>
              </div>
              
              <div className="minimal-nav">
                {links.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`minimal-nav-link ${
                      location.pathname === path ? 'active' : ''
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <CollapsibleTrigger className="expand-trigger">
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`} />
              </CollapsibleTrigger>
            </div>
          </div>

          {/* Expandable Full Masthead */}
          <CollapsibleContent className="masthead-expandable">
            <div className="masthead-container">
              {/* Full Publication Header */}
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

              {/* Full Main Masthead */}
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

              {/* Full Navigation Sections */}
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
          </CollapsibleContent>
        </div>
      </Collapsible>
    </nav>
  );
};

export default Navigation;
