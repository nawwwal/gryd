
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'home' },
    { path: '/work', label: 'work' },
    { path: '/about', label: 'about' },
    { path: '/playground', label: 'playground' },
    { path: '/contact', label: 'contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gryd-dark/90 backdrop-blur-sm border-b border-gryd-soft/10">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gryd-accent lowercase tracking-tight"
            style={{ fontVariationSettings: '"wght" 700' }}
          >
            gryd
          </Link>
          
          <div className="flex space-x-8">
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`gryd-link lowercase tracking-wide ${
                  location.pathname === path ? 'text-gryd-accent' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
