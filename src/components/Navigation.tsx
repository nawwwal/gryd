
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import MobileNavigation from './MobileNavigation';

const Navigation = () => {
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const links = [
    { path: '/work', label: 'work' },
    { path: '/about', label: 'editor' },
    { path: '/playground', label: 'experiments' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Desktop Navigation */}
      <nav className={`hidden md:block newspaper-header ${scrollDirection === 'down' ? 'header-hidden' : 'header-visible'}`}>
        <div className="newspaper-pattern"></div>
        <div className="newspaper-grid"></div>
        
        <div className="newspaper-container">
          <div className="newspaper-left">
            <Link to="/" className="newspaper-logo">
              <span className="logo-the">THE</span>
              <span className="logo-gryd">GRYD</span>
            </Link>
          </div>
          
          <div className="newspaper-right">
            <nav className="newspaper-nav">
              {links.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`newspaper-nav-link ${
                    location.pathname === path ? 'active' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="newspaper-border-bottom"></div>
      </nav>
    </>
  );
};

export default Navigation;
