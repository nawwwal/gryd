import { ReactNode, useState, TouchEvent, MouseEvent } from 'react';
import { useMobileNavigationState } from '../hooks/useMobileNavigationState';
import { useIsMobile } from '../hooks/use-mobile';

interface EditorialTouchTargetProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
  hapticIntensity?: 'light' | 'medium' | 'heavy';
  variant?: 'default' | 'card' | 'link' | 'button';
  disabled?: boolean;
}

const EditorialTouchTarget = ({
  children,
  className = '',
  onTap,
  hapticIntensity = 'light',
  variant = 'default',
  disabled = false
}: EditorialTouchTargetProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const { triggerHaptic } = useMobileNavigationState();
  const isMobile = useIsMobile();

  const getVariantClasses = () => {
    const baseClasses = 'editorial-touch-target transition-all duration-200 ease-out';

    switch (variant) {
      case 'card':
        return `${baseClasses} bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md active:shadow-lg`;
      case 'link':
        return `${baseClasses} editorial-link-touch text-gray-900 hover:text-orange-600`;
      case 'button':
        return `${baseClasses} bg-orange-600 text-white rounded-lg font-mono font-medium uppercase tracking-wider hover:bg-orange-700 active:bg-orange-800`;
      default:
        return baseClasses;
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled) return;

    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsPressed(true);

    // Immediate light haptic feedback on touch start
    if (isMobile) {
      triggerHaptic({ intensity: 'light' });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (disabled || !isPressed) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - touchStart.y);

    // Cancel touch if moved too far (threshold for better UX)
    if (deltaX > 10 || deltaY > 10) {
      setIsPressed(false);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (disabled) return;

    e.preventDefault();

    if (isPressed) {
      // Trigger configured haptic intensity on successful tap
      if (isMobile) {
        triggerHaptic({ intensity: hapticIntensity });
      }
      onTap?.();
    }

    setIsPressed(false);
  };

  const handleTouchCancel = () => {
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    if (disabled || isMobile) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled || isMobile) return;
    if (isPressed) {
      onTap?.();
    }
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (disabled || isMobile) return;
    setIsPressed(false);
  };

  return (
    <div
      className={`
        ${getVariantClasses()}
        ${isPressed ? 'scale-[0.98] shadow-inner' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation'
      }}
    >
      {children}

      {/* Active state overlay for editorial effect */}
      {isPressed && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit"
          style={{
            background: variant === 'button'
              ? 'rgba(0, 0, 0, 0.1)'
              : 'radial-gradient(circle, rgba(251, 146, 60, 0.08) 0%, transparent 70%)',
            borderRadius: 'inherit'
          }}
        />
      )}
    </div>
  );
};

export default EditorialTouchTarget;
