
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const links = [
    { path: '/work', label: 'portfolio' },
    { path: '/about', label: 'editor' },
    { path: '/playground', label: 'experiments' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 md:hidden bg-white shadow-lg border-b-2 border-orange-600 transition-transform duration-300 ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-baseline space-x-1" onClick={closeMenu}>
            <span className="text-xs font-serif font-medium text-gray-600 tracking-widest">THE</span>
            <span className="text-xl font-serif font-black tracking-tight text-gray-900">GRYD</span>
          </Link>
          
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Slide-out */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-serif text-lg font-bold text-gray-900">Navigation</span>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 py-6">
            <div className="space-y-1">
              {links.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={`block px-6 py-4 text-lg font-mono font-medium uppercase tracking-wider transition-colors ${
                    location.pathname === path 
                      ? 'text-orange-600 bg-orange-50 border-r-2 border-orange-600' 
                      : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs font-mono font-medium uppercase tracking-widest text-gray-500">
              <div>Est. 2024</div>
              <div>No. 01</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
