
import React, { useRef, useEffect, useState } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  size: number;
  opacity: number;
  layer: number;
}

interface InteractiveBackgroundProps {
  mousePos: { x: number; y: number };
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ mousePos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const animationRef = useRef<number>();

  // Initialize dots
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newDots: Dot[] = [];
    
    // Create dots in a grid pattern with some randomness
    const spacing = 60;
    const cols = Math.ceil(rect.width / spacing);
    const rows = Math.ceil(rect.height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + Math.random() * 15 - 7.5;
        const y = j * spacing + Math.random() * 15 - 7.5;
        
        newDots.push({
          id: i * rows + j,
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.2 + 0.05,
          layer: Math.floor(Math.random() * 3)
        });
      }
    }

    setDots(newDots);
  }, []);

  // Animate dots based on mouse position
  useEffect(() => {
    if (!containerRef.current) return;

    const animateDots = () => {
      setDots(prevDots => 
        prevDots.map(dot => {
          const dx = mousePos.x - dot.x;
          const dy = mousePos.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Repulsion effect - dots move away from mouse
          const repulsionRadius = 120;
          const repulsionStrength = 0.4;
          
          let newX = dot.x;
          let newY = dot.y;
          
          if (distance < repulsionRadius && distance > 0) {
            const force = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            
            // Move away from mouse
            newX = dot.x - Math.cos(angle) * force * 25;
            newY = dot.y - Math.sin(angle) * force * 25;
          } else {
            // Gradually return to original position
            const returnSpeed = 0.08;
            newX = dot.x + (dot.originalX - dot.x) * returnSpeed;
            newY = dot.y + (dot.originalY - dot.y) * returnSpeed;
          }

          // Calculate new opacity based on distance from mouse
          const proximityOpacity = distance < 80 ? 
            Math.max(0.02, dot.opacity - (80 - distance) / 80 * 0.15) : 
            Math.min(0.3, dot.opacity + 0.02);

          return {
            ...dot,
            x: newX,
            y: newY,
            opacity: proximityOpacity
          };
        })
      );

      animationRef.current = requestAnimationFrame(animateDots);
    };

    animateDots();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-black transition-all duration-75 ease-out"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transform: `translateZ(${dot.layer * 5}px)`,
            filter: `blur(${dot.layer * 0.3}px)`
          }}
        />
      ))}
      
      {/* Additional texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 1px,
              rgba(0,0,0,0.01) 1px,
              rgba(0,0,0,0.01) 2px
            )
          `,
          backgroundSize: '12px 12px'
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
