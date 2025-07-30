
import { ReactNode, useState, TouchEvent } from 'react';
import { triggerHapticFeedback, HapticFeedbackType } from '../utils/haptics';

interface MobileTouchFeedbackProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
  haptic?: HapticFeedbackType;
}

const MobileTouchFeedback = ({
  children,
  className = '',
  onTap,
  haptic
}: MobileTouchFeedbackProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = (e: TouchEvent) => {
    setIsPressed(true);
    if (haptic) {
      triggerHapticFeedback(haptic);
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
