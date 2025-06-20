
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Briefcase, User, FlaskConical } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import MobileTouchFeedback from './MobileTouchFeedback';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const UnifiedNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  const { isMobile, isTouch } = useMobileOptimization();

  const links = [
    { path: '/', label: 'home', icon: Home, mobileLabel: 'Home' },
    { path: '/work', label: 'portfolio', icon: Briefcase, mobileLabel: 'Work' },
    { path: '/about', label: 'editor', icon: User, mobileLabel: 'About' },
    { path: '/playground', label: 'experiments', icon: FlaskConical, mobileLabel: 'Lab' },
  ];

  const toggleMenu = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(5);
    }
    closeMenu();
  };

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  if (isMobile) {
    return (
      <>
        {/* Mobile Top Header */}
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-transform duration-300 safe-area-top ${
          scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
        }`}>
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-baseline space-x-1" onClick={handleLinkClick}>
              <span className="text-xs font-mono font-medium text-gray-600 tracking-widest">THE</span>
              <span className="text-xl font-serif font-black tracking-tight text-gray-900">GRYD</span>
            </Link>
            
            <MobileTouchFeedback onTap={toggleMenu} hapticFeedback>
              <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors mobile-touch-target">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </MobileTouchFeedback>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Menu Slide-out */}
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full safe-area-top">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-serif text-lg font-bold text-gray-900">Navigation</span>
              <MobileTouchFeedback onTap={closeMenu} hapticFeedback>
                <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors mobile-touch-target">
                  <X size={20} />
                </button>
              </MobileTouchFeedback>
            </div>
            
            <nav className="flex-1 py-6">
              <div className="space-y-1">
                {links.map(({ path, label, mobileLabel, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={handleLinkClick}
                    className={`block px-6 py-4 text-lg font-mono font-medium uppercase tracking-wider transition-colors mobile-touch-target ${
                      location.pathname === path 
                        ? 'text-orange-600 bg-orange-50 border-r-2 border-orange-600' 
                        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} />
                      <span>{mobileLabel}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </nav>
            
            <div className="p-4 border-t border-gray-200 safe-area-bottom">
              <div className="text-xs font-mono font-medium uppercase tracking-widest text-gray-500">
                <div>Design Portfolio</div>
                <div>Est. 2024 • Issue 01</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-bottom transition-transform duration-300 ${
          scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
        }`}>
          <nav className="flex justify-around items-center py-2">
            {links.map(({ path, mobileLabel, icon: Icon }) => (
              <MobileTouchFeedback key={path} onTap={handleLinkClick} hapticFeedback>
                <Link
                  to={path}
                  className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 mobile-touch-target ${
                    location.pathname === path ? 'text-orange-600' : 'text-gray-600'
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-xs font-mono font-medium truncate">{mobileLabel}</span>
                </Link>
              </MobileTouchFeedback>
            ))}
          </nav>
        </div>
      </>
    );
  }

  // Desktop Navigation
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-transform duration-300 ${
      scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline space-x-2">
            <span className="text-sm font-mono font-medium text-gray-600 tracking-widest">THE</span>
            <span className="text-2xl font-serif font-black tracking-tight text-gray-900">GRYD</span>
          </Link>
          
          <nav className="flex space-x-8">
            {links.slice(1).map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-mono font-medium text-sm uppercase tracking-wider transition-colors ${
                  location.pathname === path 
                    ? 'text-orange-600' 
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default UnifiedNavigation;
