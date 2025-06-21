import { ReactNode, useEffect, useState, useRef, TouchEvent } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { useMobileNavigationState } from '../hooks/useMobileNavigationState';
import MobileBottomNavigation from './MobileBottomNavigation';

interface MobileLayoutWrapperProps {
  children: ReactNode;
  enablePullToRefresh?: boolean;
  onRefresh?: () => Promise<void>;
  className?: string;
}

const MobileLayoutWrapper = ({
  children,
  enablePullToRefresh = false,
  onRefresh,
  className = ''
}: MobileLayoutWrapperProps) => {
  const isMobile = useIsMobile();
  const { triggerHaptic } = useMobileNavigationState();

  // Pull to refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  // Touch tracking
  const touchStartY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // PWA viewport setup for mobile
  useEffect(() => {
    if (isMobile) {
      // Set viewport meta for mobile
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content',
          'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no'
        );
      }

      // Prevent overscroll on iOS
      document.body.style.overscrollBehavior = 'none';
      document.body.style.overflow = 'hidden';

      // Add mobile-specific classes
      document.documentElement.classList.add('mobile-native');

      return () => {
        document.body.style.overscrollBehavior = 'auto';
        document.body.style.overflow = 'auto';
        document.documentElement.classList.remove('mobile-native');
      };
    }
  }, [isMobile]);

  // Pull to refresh handlers
  const handleTouchStart = (e: TouchEvent) => {
    if (!enablePullToRefresh || !scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;
    if (scrollTop === 0) {
      touchStartY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!enablePullToRefresh || !isPulling || !scrollRef.current) return;

    const currentY = e.touches[0].clientY;
    const distance = Math.max(0, currentY - touchStartY.current);

    if (distance > 0 && scrollRef.current.scrollTop === 0) {
      setPullDistance(Math.min(distance, 80)); // Max pull distance

      // Light haptic feedback when reaching refresh threshold
      if (distance > 60 && pullDistance <= 60) {
        triggerHaptic({ intensity: 'light' });
      }
    }
  };

  const handleTouchEnd = async () => {
    if (!enablePullToRefresh || !isPulling) return;

    setIsPulling(false);

    if (pullDistance > 60 && onRefresh) {
      setIsRefreshing(true);
      triggerHaptic({ intensity: 'medium' });

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-native-container fixed inset-0 bg-gray-50">
      {/* Status bar safe area */}
      <div className="safe-area-top bg-white" />

      {/* Main content area */}
      <div
        ref={scrollRef}
        className={`
          mobile-scroll-container flex-1 overflow-y-auto overflow-x-hidden
          ${className}
        `}
        style={{
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
          paddingBottom: '100px', // Space for bottom navigation
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to refresh indicator */}
        {enablePullToRefresh && (isPulling || isRefreshing) && (
          <div
            className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center bg-white border-b border-gray-200"
            style={{
              height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
              transform: `translateY(${isRefreshing ? 0 : -60 + pullDistance}px)`,
              transition: isRefreshing ? 'all 0.3s ease' : 'none'
            }}
          >
            <div className="flex items-center space-x-2 text-gray-600">
              {isRefreshing ? (
                <>
                  <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-mono uppercase tracking-wider">Refreshing...</span>
                </>
              ) : (
                <span className="text-sm font-mono uppercase tracking-wider">
                  {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content with magazine background */}
        <div className="min-h-full bg-white relative">
          {/* Subtle paper texture for editorial feel */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(139,69,19,0.3) 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, rgba(139,69,19,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px, 15px 15px'
            }}
          />

          {children}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNavigation />
    </div>
  );
};

export default MobileLayoutWrapper;
