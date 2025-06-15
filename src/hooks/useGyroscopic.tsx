
import { useRef, useEffect } from 'react';

interface GyroscopicOptions {
  maxRotation?: number;
  restRotationX?: number;
  restRotationY?: number;
}

export const useGyroscopic = (options: GyroscopicOptions = {}) => {
  const {
    maxRotation = 1.5,
    restRotationX = 0.5,
    restRotationY = -0.25
  } = options;
  
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -maxRotation;
      const rotateY = (x - centerX) / centerX * maxRotation;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = `perspective(1000px) rotateX(${restRotationX}deg) rotateY(${restRotationY}deg) translateZ(0)`;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, restRotationX, restRotationY]);

  return elementRef;
};
