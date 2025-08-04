import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

function AnimatedCounter({ end, suffix = '', duration = 2000, delay = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '0px 0px -10% 0px',
    triggerOnce: true
  });

  // Start animation when element becomes visible
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        // Start counter animation
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setDisplayValue(Math.floor(end * progress));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, end, duration, delay]);

  return (
    <span ref={elementRef} className="animated-counter">
      {displayValue}{suffix}
    </span>
  );
}

export default AnimatedCounter;


