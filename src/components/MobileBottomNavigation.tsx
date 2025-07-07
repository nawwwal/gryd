import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderOpen, User, FlaskConical } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMobileNavigationState } from '../hooks/useMobileNavigationState';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<any>;
  shortLabel: string;
}

const MobileBottomNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isVisible, handleNavInteraction, triggerHaptic } = useMobileNavigationState();

  const navItems: NavItem[] = [
    {
      path: '/',
      label: 'THE GRYD',
      icon: Home,
      shortLabel: 'Home'
    },
    {
      path: '/work',
      label: 'Portfolio',
      icon: FolderOpen,
      shortLabel: 'Work'
    },
    {
      path: '/about',
      label: 'Editor',
      icon: User,
      shortLabel: 'Editor'
    },
    {
      path: '/playground',
      label: 'Experiments',
      icon: FlaskConical,
      shortLabel: 'Lab'
    },
  ];

  // Update active index based on current route
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]);

  const handleNavClick = (index: number, path: string) => {
    setActiveIndex(index);
    handleNavInteraction(path);
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Bottom Navigation */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Background with magazine paper effect */}
        <div className="relative mx-4 mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Subtle paper texture pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 2px 2px, rgba(139,69,19,0.3) 1px, transparent 1px),
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,69,19,0.1) 2px, rgba(139,69,19,0.1) 3px)
              `,
              backgroundSize: '12px 12px, 100% 100%'
            }}
          />

          {/* Orange accent line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500" />

          {/* Navigation items */}
          <div className="relative flex items-center justify-around px-2 py-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex-1 group"
                  onClick={() => handleNavClick(index, item.path)}
                >
                  <div
                    className={`
                      relative flex flex-col items-center justify-center py-2 px-3 rounded-xl
                      transition-all duration-300 ease-out
                      ${isActive
                        ? 'bg-orange-50 scale-105'
                        : 'active:scale-95 active:bg-gray-50'
                      }
                    `}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {/* Active indicator background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl opacity-80" />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 mb-1">
                      <Icon
                        size={20}
                        className={`
                          transition-colors duration-300
                          ${isActive
                            ? 'text-orange-600'
                            : 'text-gray-500 group-active:text-orange-500'
                          }
                        `}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`
                        relative z-10 text-xs font-mono font-medium uppercase tracking-wider
                        transition-colors duration-300
                        ${isActive
                          ? 'text-orange-700'
                          : 'text-gray-600 group-active:text-orange-600'
                        }
                      `}
                    >
                      {item.shortLabel}
                    </span>

                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-orange-600 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom safe area */}
          <div className="safe-area-bottom" />
        </div>
      </nav>

      {/* Bottom padding to prevent content from hiding behind nav */}
      <div className="h-24 safe-area-bottom" />
    </>
  );
};

export default MobileBottomNavigation;
