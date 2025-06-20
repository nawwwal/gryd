
import { ReactNode } from 'react';
import UnifiedNavigation from './UnifiedNavigation';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isMobile } = useMobileOptimization();

  return (
    <div className="min-h-screen bg-gryd-bg w-full">
      <UnifiedNavigation />
      <main className={`${isMobile ? 'pt-16 pb-20' : 'pt-16'} w-full`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
