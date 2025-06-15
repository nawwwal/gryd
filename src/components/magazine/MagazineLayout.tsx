
import { ReactNode } from 'react';
import Container from '../layout/Container';

interface MagazineLayoutProps {
  children: ReactNode;
  className?: string;
}

const MagazineLayout = ({ children, className = '' }: MagazineLayoutProps) => {
  return (
    <div className={`magazine-container ${className}`}>
      <Container size="content">
        {children}
      </Container>
    </div>
  );
};

export default MagazineLayout;
