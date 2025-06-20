
import { ReactNode } from 'react';
import MobileTouchFeedback from './MobileTouchFeedback';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onTap?: () => void;
  interactive?: boolean;
  variant?: 'default' | 'elevated' | 'flat';
}

const MobileCard = ({ 
  children, 
  className = '', 
  onTap,
  interactive = false,
  variant = 'default'
}: MobileCardProps) => {
  const { isTouch } = useMobileOptimization();

  const baseClasses = 'mobile-card';
  const variantClasses = {
    default: 'mobile-card-default',
    elevated: 'mobile-card-elevated',
    flat: 'mobile-card-flat'
  };

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (interactive && isTouch) {
    return (
      <MobileTouchFeedback onTap={onTap} hapticFeedback>
        <div className={cardClasses}>
          {children}
        </div>
      </MobileTouchFeedback>
    );
  }

  return (
    <div className={cardClasses} onClick={onTap}>
      {children}
    </div>
  );
};

export default MobileCard;
