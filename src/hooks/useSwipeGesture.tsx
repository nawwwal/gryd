
import { useRef, useEffect, TouchEvent } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeOptions {
  threshold?: number;
  preventDefault?: boolean;
}

export const useSwipeGesture = <T extends HTMLElement>(
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const { threshold = 50, preventDefault = true } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const deltaX = touchEnd.x - touchStart.current.x;
      const deltaY = touchEnd.y - touchStart.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            handlers.onSwipeRight?.();
          } else {
            handlers.onSwipeLeft?.();
          }
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0) {
            handlers.onSwipeDown?.();
          } else {
            handlers.onSwipeUp?.();
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart as unknown as EventListener);
    element.addEventListener('touchend', handleTouchEnd as unknown as EventListener);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      element.removeEventListener('touchend', handleTouchEnd as unknown as EventListener);
    };
  }, [handlers, threshold, preventDefault]);

  return elementRef;
};
