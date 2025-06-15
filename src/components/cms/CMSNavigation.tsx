
import { Link, useLocation } from 'react-router-dom';
import { FileText, Code, Home } from 'lucide-react';

const CMSNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/cms/work', label: 'Work Portfolio', icon: FileText },
    { path: '/cms/playground', label: 'Playground', icon: Code },
  ];

  return (
    <div className="border-b border-gryd-soft/10 bg-gryd-soft/5">
      <div className="editorial-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gryd-soft hover:text-gryd-text transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="caption">Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-gryd-soft/20"></div>
            <div className="flex space-x-6">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 caption transition-colors ${
                    location.pathname === path 
                      ? 'text-gryd-accent' 
                      : 'text-gryd-soft hover:text-gryd-text'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="caption text-gryd-soft">Content Management System</div>
        </div>
      </div>
    </div>
  );
};

export default CMSNavigation;
