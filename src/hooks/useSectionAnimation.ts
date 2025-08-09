import { useEffect, useRef, RefObject } from 'react';
import { gsap } from 'gsap';
import { animations } from '../utils/animations';

interface SectionAnimationOptions {
  sectionDelay?: number;
  headerDelay?: number;
  contentDelay?: number;
  enableScrollTrigger?: boolean;
  customAnimations?: Array<{
    ref: RefObject<HTMLElement>;
    options: Parameters<typeof animations.fadeIn>[1];
  }>;
}

interface SectionAnimationRefs {
  sectionRef: RefObject<HTMLElement>;
  headerRef: RefObject<HTMLElement>;
  contentRef: RefObject<HTMLElement>;
}

/**
 * Custom hook to handle common section animation patterns
 * Consolidates repeated animation logic across all section components
 */
export function useSectionAnimation(
  options: SectionAnimationOptions = {}
): SectionAnimationRefs {
  const {
    sectionDelay = 0,
    headerDelay = 0.2,
    contentDelay = 0.3,
    enableScrollTrigger = true,
    customAnimations = []
  } = options;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Capture refs at the beginning of the effect to avoid stale closure warnings
    const sectionElement = sectionRef.current;
    const headerElement = headerRef.current;
    const contentElement = contentRef.current;

    // Optimized delay to ensure DOM elements are fully rendered after lazy loading
    const timer = setTimeout(() => {
      // Section entrance animation
      if (sectionElement) {
        animations.fadeIn(sectionElement, {
          duration: 1.2,
          delay: sectionDelay,
          y: 20,
          scrollTrigger: enableScrollTrigger,
        });
      }

      // Header animation
      if (headerElement) {
        animations.fadeIn(headerElement, {
          duration: 1,
          delay: headerDelay,
          y: 30,
          scrollTrigger: enableScrollTrigger,
        });
      }

      // Content animation
      if (contentElement) {
        animations.fadeIn(contentElement, {
          duration: 0.8,
          delay: contentDelay,
          y: 20,
          scrollTrigger: enableScrollTrigger,
        });
      }

      // Custom animations
      customAnimations.forEach(({ ref, options }) => {
        if (ref.current) {
          animations.fadeIn(ref.current, {
            scrollTrigger: enableScrollTrigger,
            ...options,
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      // Cleanup specific animations on unmount to prevent memory leaks
      if (sectionElement) gsap.killTweensOf(sectionElement);
      if (headerElement) gsap.killTweensOf(headerElement);
      if (contentElement) gsap.killTweensOf(contentElement);

      customAnimations.forEach(({ ref }) => {
        const element = ref.current;
        if (element) gsap.killTweensOf(element);
      });
    };
  }, [sectionDelay, headerDelay, contentDelay, enableScrollTrigger, customAnimations]);

  return {
    sectionRef,
    headerRef,
    contentRef,
  };
}

/**
 * Hook for staggered animations (like cards, stats, etc.)
 */
export function useStaggeredAnimation(
  itemCount: number,
  options: {
    stagger?: number;
    delay?: number;
    duration?: number;
    enableScrollTrigger?: boolean;
  } = {}
) {
  const {
    stagger = 0.1,
    delay = 0.4,
    duration = 0.8,
    enableScrollTrigger = true
  } = options;

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, itemCount);
  }, [itemCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const validRefs = itemRefs.current.filter(Boolean);
      if (validRefs.length > 0) {
        animations.staggerFadeIn(validRefs, {
          duration,
          stagger,
          delay,
          scrollTrigger: enableScrollTrigger,
        });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [stagger, delay, duration, enableScrollTrigger]);

  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  return { setItemRef, itemRefs };
}
