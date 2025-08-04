import { useState, useEffect, useCallback } from 'react';

interface UseNavbarScrollOptions {
  threshold?: number;
  debounceMs?: number;
}

interface UseNavbarScrollReturn {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
}

/**
 * Custom hook for navbar scroll-based interactions
 * Provides scroll state, direction, and threshold detection
 */
export function useNavbarScroll(
  options: UseNavbarScrollOptions = {}
): UseNavbarScrollReturn {
  const { threshold = 50, debounceMs = 10 } = options;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update scroll position
    setScrollY(currentScrollY);
    
    // Update scrolled state based on threshold
    setIsScrolled(currentScrollY > threshold);
    
    // Update scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > threshold) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection('up');
    }
    
    setLastScrollY(currentScrollY);
  }, [threshold, lastScrollY]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScrollState, debounceMs);
    };

    // Initial check
    updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [updateScrollState, debounceMs]);

  return {
    isScrolled,
    scrollY,
    scrollDirection,
  };
}

/**
 * Hook for navbar visibility based on scroll direction
 */
export function useNavbarVisibility(hideThreshold: number = 100) {
  const { scrollDirection, scrollY } = useNavbarScroll({ threshold: hideThreshold });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (scrollY < hideThreshold) {
      setIsVisible(true);
    } else if (scrollDirection === 'down') {
      setIsVisible(false);
    } else if (scrollDirection === 'up') {
      setIsVisible(true);
    }
  }, [scrollDirection, scrollY, hideThreshold]);

  return isVisible;
}
