
import { ReactNode, useState, TouchEvent } from 'react';

interface MobileTouchFeedbackProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
  hapticFeedback?: boolean;
}

const MobileTouchFeedback = ({ 
  children, 
  className = '', 
  onTap,
  hapticFeedback = false 
}: MobileTouchFeedbackProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    setIsPressed(true);
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    onTap?.();
  };

  const handleTouchCancel = () => {
    setIsPressed(false);
  };

  return (
    <div
      className={`touch-feedback ${isPressed ? 'pressed' : ''} ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.1s ease',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  );
};

export default MobileTouchFeedback;
