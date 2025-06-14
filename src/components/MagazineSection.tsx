
import { ReactNode } from 'react';

interface MagazineSectionProps {
  children: ReactNode;
  className?: string;
}

const MagazineSection = ({ children, className = '' }: MagazineSectionProps) => {
  return (
    <section className={`magazine-section ${className}`}>
      <div className="magazine-paper-effect">
        <div className="editorial-container">
          {children}
        </div>
      </div>
    </section>
  );
};

export default MagazineSection;
