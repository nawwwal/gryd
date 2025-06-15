
import { ReactNode } from 'react';

interface PaperProps {
  children: ReactNode;
  variant?: 'base' | 'tilted' | 'hover';
  className?: string;
}

const Paper = ({ children, variant = 'base', className = '' }: PaperProps) => {
  const variants = {
    base: 'paper-base',
    tilted: 'paper-base paper-tilted',
    hover: 'paper-base paper-hover'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Paper;
