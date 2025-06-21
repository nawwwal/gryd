
import { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileLayoutWrapper from './MobileLayoutWrapper';
import { useIsMobile } from '../hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  enablePullToRefresh?: boolean;
  onRefresh?: () => Promise<void>;
}

const Layout = ({ children, enablePullToRefresh, onRefresh }: LayoutProps) => {
  const isMobile = useIsMobile();

  // Mobile-native layout
  if (isMobile) {
    return (
      <MobileLayoutWrapper
        enablePullToRefresh={enablePullToRefresh}
        onRefresh={onRefresh}
      >
        {children}
      </MobileLayoutWrapper>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="min-h-screen bg-gryd-bg">
      <Navigation />
      <main className="pt-[60px] md:pt-[60px]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
