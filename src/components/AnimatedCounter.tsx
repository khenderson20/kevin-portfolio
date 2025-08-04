import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  onComplete?: () => void;
}

function AnimatedCounter({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  className = '',
  onComplete
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number | null>(null);

  // Set up intersection observer for animation trigger
  useEffect(() => {
    const currentRef = counterRef.current;
    
    if (!currentRef) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observerRef.current.observe(currentRef);

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [delay, isVisible]);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (totalChange * easedProgress);
      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, start, end, duration, onComplete]);

  // Format number with separators
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return parts.join('.');
  };

  return (
    <span 
      ref={counterRef}
      className={`animated-counter ${className}`}
      aria-live="polite"
      aria-label={`${prefix}${formatNumber(count)}${suffix}`}
    >
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

export default AnimatedCounter;
