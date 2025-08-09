
import { useState, useEffect, useCallback, useRef } from 'react';

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

interface UseActiveSectionOptions {
  sections?: string[];
  rootMargin?: string;
  threshold?: number;
  smoothScrollOptions?: SmoothScrollOptions;
}

export function useActiveSection(options: UseActiveSectionOptions = {}) {
  const {
    sections = ['home', 'music', 'development', 'about', 'contact'],
    rootMargin = '-20% 0px -80% 0px',
    threshold = 0.1,
    smoothScrollOptions = {}
  } = options;

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced smooth scroll with custom easing
  const smoothScrollTo = useCallback((targetPosition: number, options: SmoothScrollOptions = {}) => {
    const {
      duration = 450,
      easing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // easeInOutCubic
      offset = 0
    } = { ...smoothScrollOptions, ...options };

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    const startTime = performance.now();

    // Don't set isScrolling here - it's managed by navigateToSection

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
      // Don't set isScrolling to false here - let the timeout handle it
    };

    requestAnimationFrame(animateScroll);
  }, [smoothScrollOptions]);

  // Get navbar height dynamically
  const getNavbarHeight = useCallback(() => {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.getBoundingClientRect().height : 80;
  }, []);

  // Navigate to section with enhanced smooth scrolling
  const navigateToSection = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (!element) return;

    let targetPosition;

    if (section === 'home') {
      targetPosition = 0;
    } else {
      const navbarHeight = getNavbarHeight();
      const elementRect = element.getBoundingClientRect();
      targetPosition = window.pageYOffset + elementRect.top - navbarHeight - 20;
      targetPosition = Math.max(0, targetPosition);
    }

    // Check if we're already at the target position
    if (Math.abs(window.pageYOffset - targetPosition) < 5) {
      // Just update state without scrolling
      setActiveSection(section);
      window.history.pushState(null, '', `#${section}`);
      return;
    }

    // Immediately update state and URL to prevent observer conflicts
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);

    // Set scrolling state with extended timeout to prevent observer interference
    setIsScrolling(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to reset scrolling state after animation completes + buffer
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600); // 450ms animation + 150ms buffer

    // Perform smooth scroll
    smoothScrollTo(targetPosition);
  }, [smoothScrollTo, getNavbarHeight]);

  // Set up intersection observer for automatic section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin,
      threshold
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Only update active section if not currently scrolling programmatically
      if (isScrolling) return;

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeSectionId = '';

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          if (entry.target instanceof HTMLElement) {
            activeSectionId = entry.target.id;
          }
        }
      });

      if (activeSectionId && sections.includes(activeSectionId) && activeSectionId !== activeSection) {
        setActiveSection(activeSectionId);
        // Update URL without triggering scroll
        window.history.replaceState(null, '', `#${activeSectionId}`);
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, rootMargin, threshold, activeSection, isScrolling]);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sections.includes(hash)) {
      // For home section, just set the active state without scrolling
      // since we're already at the top
      if (hash === 'home' && window.pageYOffset === 0) {
        setActiveSection('home');
        return;
      }
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        navigateToSection(hash);
      }, 100);
    }
  }, [sections, navigateToSection]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sections.includes(hash)) {
        navigateToSection(hash);
      } else if (!hash) {
        navigateToSection('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [sections, navigateToSection]);

  // Debounced scroll end detection
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeSection,
    navigateToSection,
    isScrolling,
    smoothScrollTo,
    getNavbarHeight
  };
}


