
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollFadeProps {
  children: ReactNode;
  delay?: number;
}

const ScrollFade = ({ children, delay = 0 }: ScrollFadeProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={elementRef} className="scroll-fade">
      {children}
    </div>
  );
};

export default ScrollFade;
