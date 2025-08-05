import { useRef, useEffect, ReactNode } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  disabled?: boolean;
  enableMouseTracking?: boolean;
}

/**
 * Card3D Component - Adds mouse-tracking 3D effects to project cards
 * 
 * Features:
 * - Mouse-tracking tilt effects
 * - Dynamic CSS custom properties for 3D transforms
 * - Respects prefers-reduced-motion
 * - Smooth transitions and cleanup
 */
function Card3D({ 
  children, 
  className = '', 
  intensity = 1, 
  disabled = false,
  enableMouseTracking = true 
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disabled || !enableMouseTracking) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      // Cancel previous animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse position relative to card center
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation angles (max 15 degrees * intensity)
        const maxRotation = 15 * intensity;
        const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
        const rotateX = -(mouseY / (rect.height / 2)) * maxRotation;

        // Apply transforms via CSS custom properties
        card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
        card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
      });
    };

    const handleMouseEnter = () => {
      if (!card) return;
      card.style.setProperty('--card-translate-z', '20px');
    };

    const handleMouseLeave = () => {
      if (!card) return;
      
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Reset transforms smoothly
      card.style.setProperty('--card-rotate-x', '0deg');
      card.style.setProperty('--card-rotate-y', '0deg');
      card.style.setProperty('--card-translate-z', '0px');
    };

    // Add event listeners
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        
        // Reset CSS properties
        card.style.removeProperty('--card-rotate-x');
        card.style.removeProperty('--card-rotate-y');
        card.style.removeProperty('--card-translate-z');
      }
    };
  }, [intensity, disabled, enableMouseTracking]);

  return (
    <div
      ref={cardRef}
      className={`${className} card-3d-container`}
      style={{
        // Enable 3D transforms and perspective
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'transform 0.1s ease-out',
        transform: `
          perspective(1000px)
          rotateX(var(--card-rotate-x, 0deg))
          rotateY(var(--card-rotate-y, 0deg))
          translateZ(var(--card-translate-z, 0px))
        `.replace(/\s+/g, ' ').trim()
      }}
    >
      {children}
    </div>
  );
}

export default Card3D;
