
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  size?: 'full' | 'wide' | 'content' | 'narrow';
  className?: string;
}

const Container = ({ children, size = 'content', className = '' }: ContainerProps) => {
  const sizes = {
    full: 'container-full',
    wide: 'container-wide',
    content: 'container-content',
    narrow: 'container-narrow'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
