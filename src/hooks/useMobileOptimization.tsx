
import { useState, useEffect } from 'react';

interface MobileOptimization {
  isMobile: boolean;
  isTablet: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
  orientation: 'portrait' | 'landscape';
  connectionType: 'slow' | 'fast' | 'unknown';
}

export const useMobileOptimization = (): MobileOptimization => {
  const [optimization, setOptimization] = useState<MobileOptimization>({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    reducedMotion: false,
    orientation: 'portrait',
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateOptimization = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isTouch = 'ontouchstart' in window;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      // Simple connection detection
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection?.effectiveType === '4g' || connection?.effectiveType === 'wifi' ? 'fast' : 
                           connection?.effectiveType === '3g' || connection?.effectiveType === '2g' ? 'slow' : 'unknown';

      setOptimization({
        isMobile,
        isTablet,
        isTouch,
        reducedMotion,
        orientation,
        connectionType
      });
    };

    updateOptimization();

    const handleResize = () => updateOptimization();
    const handleOrientationChange = () => setTimeout(updateOptimization, 100);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return optimization;
};
