
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gryd-dark">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
