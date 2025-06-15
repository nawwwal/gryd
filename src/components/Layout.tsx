
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gryd-bg">
      <Navigation />
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};

export default Layout;
