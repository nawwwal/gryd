
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: '/work', label: 'work' },
    { path: '/about', label: 'about' },
    { path: '/playground', label: 'playground' },
  ];

  return (
    <nav className="nav-minimal border-b border-gryd-soft/10">
      <div className="editorial-container py-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="font-headline text-2xl font-bold lowercase text-gryd-text"
          >
            gryd
          </Link>
          
          <div className="flex space-x-8">
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link ${
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
