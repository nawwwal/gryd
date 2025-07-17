
import MagazineFooter from './MagazineFooter';
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
    <div className="min-h-screen bg-gryd-bg overflow-x-hidden w-full max-w-full">
      <Navigation />
      <main className="pt-[60px] md:pt-[60px] overflow-x-hidden w-full">
        {children}
      </main>
      <MagazineFooter />
    </div>
  );
};

export default Layout;
