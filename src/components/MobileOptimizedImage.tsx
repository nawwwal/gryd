
import { useState, useRef, useEffect } from 'react';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSrc?: string;
  loading?: 'lazy' | 'eager';
}

const MobileOptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  mobileSrc, 
  loading = 'lazy' 
}: MobileOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const imageSrc = isMobile && mobileSrc ? mobileSrc : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default MobileOptimizedImage;
