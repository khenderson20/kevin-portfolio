
import { useState, useEffect } from 'react';
import { getScrollProgress } from '../utils/smoothScrolling';

interface ScrollIndicatorProps {
  className?: string;
  showPercentage?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  thickness?: number;
  color?: string;
}

function ScrollIndicator({
  className = '',
  showPercentage = false,
  position = 'bottom',
  thickness = 3,
  color = 'var(--color-secondary)'
}: ScrollIndicatorProps) {
  console.log('ScrollIndicator component mounted with props:', {
    position, thickness, color, showPercentage
  });
  
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('ScrollIndicator useEffect running');
    
    let ticking = false;
    
    const updateProgress = () => {
      const scrollProgress = getScrollProgress();
      
      // Check if getScrollProgress returns valid number
      if (isNaN(scrollProgress)) {
        console.error('scrollProgress is NaN!');
      }
      
      setProgress(scrollProgress);
      setIsVisible(scrollProgress > 0.01);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Initial check
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProgressBarStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      backgroundColor: color,
      zIndex: 1100, // Instead of 'var(--z-index-sticky)'
      transition: 'all 0.3s ease',
      opacity: isVisible ? 1 : 0,
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          height: `${thickness}px`,
          width: `${progress * 100}%`,
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          height: `${thickness}px`,
          width: `${progress * 100}%`,
        };
      case 'left':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          width: `${thickness}px`,
          height: `${progress * 100}%`,
        };
      case 'right':
        return {
          ...baseStyle,
          top: 0,
          right: 0,
          width: `${thickness}px`,
          height: `${progress * 100}%`,
        };
      default:
        return baseStyle;
    }
  };

  const getPercentageStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: 'var(--z-index-modal)',
      backgroundColor: 'var(--color-surface-container)',
      color: 'var(--color-on-surface)',
      padding: 'var(--space-2) var(--space-3)',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
      fontFamily: 'var(--font-family-mono)',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.3s ease',
      opacity: isVisible ? 1 : 0,
      pointerEvents: 'none',
    };

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          top: 'var(--space-4)',
          right: 'var(--space-4)',
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 'var(--space-4)',
          right: 'var(--space-4)',
        };
      case 'left':
        return {
          ...baseStyle,
          top: 'var(--space-4)',
          left: 'var(--space-4)',
        };
      case 'right':
        return {
          ...baseStyle,
          top: 'var(--space-4)',
          right: 'var(--space-4)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <div
        className={`scroll-indicator ${className}`}
        style={getProgressBarStyle()}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Page scroll progress: ${Math.round(progress * 100)}%`}
      />
      
      {showPercentage && (
        <div
          className="scroll-percentage"
          style={getPercentageStyle()}
          aria-hidden="true"
        >
          {Math.round(progress * 100)}%
        </div>
      )}
    </>
  );
}

export default ScrollIndicator;