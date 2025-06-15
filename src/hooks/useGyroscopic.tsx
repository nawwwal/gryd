
import { useRef, useEffect } from 'react';

interface GyroscopicOptions {
  maxRotation?: number;
  restRotationX?: number;
  restRotationY?: number;
  intensity?: number;
}

export const useGyroscopic = (options: GyroscopicOptions = {}) => {
  const {
    maxRotation = 2.5,
    restRotationX = 0.5,
    restRotationY = -0.25,
    intensity = 1
  } = options;
  
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -maxRotation * intensity;
        const rotateY = (x - centerX) / centerX * maxRotation * intensity;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
    };

    const handleMouseLeave = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      element.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.transform = `perspective(1000px) rotateX(${restRotationX}deg) rotateY(${restRotationY}deg) translateZ(0)`;
    };

    const handleMouseEnter = () => {
      element.style.transition = 'transform 0.1s ease-out';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseenter', handleMouseEnter);

    // Set initial resting state
    element.style.transform = `perspective(1000px) rotateX(${restRotationX}deg) rotateY(${restRotationY}deg) translateZ(0)`;

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseenter', handleMouseEnter);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [maxRotation, restRotationX, restRotationY, intensity]);

  return elementRef;
};
