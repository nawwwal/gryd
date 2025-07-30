import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollDirection } from './useScrollDirection';

interface NavigationState {
  isVisible: boolean;
  activeRoute: string;
  lastInteraction: number;
  isScrolling: boolean;
}

interface HapticOptions {
  intensity: 'light' | 'medium' | 'heavy';
  pattern?: number[];
}

export const useMobileNavigationState = () => {
  const location = useLocation();
  const scrollDirection = useScrollDirection();

  const [navState, setNavState] = useState<NavigationState>({
    isVisible: true,
    activeRoute: location.pathname,
    lastInteraction: Date.now(),
    isScrolling: false
  });

  // Haptic feedback with different intensities
  const triggerHaptic = useCallback((options: HapticOptions = { intensity: 'light' }) => {
    if (!('vibrate' in navigator)) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30, 10, 30]
    };

    const pattern = options.pattern || patterns[options.intensity];
    navigator.vibrate(pattern);
  }, []);

  // Enhanced navigation visibility logic
  useEffect(() => {
    const shouldHide = scrollDirection === 'down' &&
                     Date.now() - navState.lastInteraction > 1000; // Hide after 1s of no interaction

    setNavState(prev => ({
      ...prev,
      isVisible: !shouldHide,
      isScrolling: scrollDirection !== 'idle'
    }));
  }, [scrollDirection, navState.lastInteraction]);

  // Update active route
  useEffect(() => {
    setNavState(prev => ({
      ...prev,
      activeRoute: location.pathname
    }));
  }, [location.pathname]);

  // Handle navigation interaction
  const handleNavInteraction = useCallback((route: string) => {
    setNavState(prev => ({
      ...prev,
      activeRoute: route,
      lastInteraction: Date.now(),
      isVisible: true
    }));

    // Trigger haptic feedback for navigation
    triggerHaptic({ intensity: 'medium' });
  }, [triggerHaptic]);

  // Force show navigation (useful for important actions)
  const showNavigation = useCallback(() => {
    setNavState(prev => ({
      ...prev,
      isVisible: true,
      lastInteraction: Date.now()
    }));
  }, []);

  // Hide navigation (useful for immersive experiences)
  const hideNavigation = useCallback(() => {
    setNavState(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return {
    ...navState,
    triggerHaptic,
    handleNavInteraction,
    showNavigation,
    hideNavigation,
    scrollToTop
  };
};
