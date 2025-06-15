
import { useState, useRef, useEffect } from 'react';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  priority?: boolean;
}

const MobileOptimizedImage = ({ 
  src, 
  alt, 
  className = '',
  lowQualitySrc,
  priority = false 
}: MobileOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src, isLoaded]);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-75'} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default MobileOptimizedImage;
