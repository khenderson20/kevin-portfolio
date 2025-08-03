/**
 * Advanced Smooth Scrolling Utilities
 * Provides enhanced scrolling functionality with custom easing, performance optimization,
 * and accessibility features
 */

/**
 * Easing functions for smooth animations
 */
export const easingFunctions = {
  // Linear
  linear: (t: number) => t,
  
  // Ease In
  easeInQuad: (t: number) => t * t,
  easeInCubic: (t: number) => t * t * t,
  easeInQuart: (t: number) => t * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeInSine: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeInCirc: (t: number) => 1 - Math.sqrt(1 - t * t),
  
  // Ease Out
  easeOutQuad: (t: number) => t * (2 - t),
  easeOutCubic: (t: number) => --t * t * t + 1,
  easeOutQuart: (t: number) => 1 - --t * t * t * t,
  easeOutQuint: (t: number) => 1 + --t * t * t * t * t,
  easeOutSine: (t: number) => Math.sin((t * Math.PI) / 2),
  easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeOutCirc: (t: number) => Math.sqrt(1 - --t * t),
  
  // Ease In Out
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeInOutExpo: (t: number) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  easeInOutCirc: (t: number) => t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - (-2 * t + 2) * (-2 * t + 2)) + 1) / 2,
  
  // Bounce
  easeOutBounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  
  // Elastic
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
} as const;

export type EasingFunction = keyof typeof easingFunctions;

export interface SmoothScrollOptions {
  duration?: number;
  easing?: EasingFunction | ((t: number) => number);
  offset?: number;
  callback?: () => void;
  onProgress?: (progress: number) => void;
}

export interface ScrollToElementOptions extends SmoothScrollOptions {
  block?: 'start' | 'center' | 'end';
  inline?: 'start' | 'center' | 'end';
}

/**
 * Enhanced smooth scroll to position with custom easing
 */
export function smoothScrollTo(
  targetPosition: number,
  options: SmoothScrollOptions = {}
): Promise<void> {
  const {
    duration = 800,
    easing = 'easeInOutCubic',
    offset = 0,
    callback,
    onProgress
  } = options;

  return new Promise((resolve) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - offset;
    const startTime = performance.now();

    // Get easing function
    const easingFn = typeof easing === 'string' ? easingFunctions[easing] : easing;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const actualDuration = prefersReducedMotion ? 0 : duration;

    if (actualDuration === 0) {
      // Instant scroll for reduced motion
      window.scrollTo(0, targetPosition - offset);
      callback?.();
      resolve();
      return;
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / actualDuration, 1);
      const easedProgress = easingFn(progress);
      
      const currentPosition = startPosition + distance * easedProgress;
      window.scrollTo(0, currentPosition);
      
      onProgress?.(progress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        callback?.();
        resolve();
      }
    };

    requestAnimationFrame(animateScroll);
  });
}

/**
 * Smooth scroll to element with enhanced options
 */
export function smoothScrollToElement(
  element: HTMLElement | string,
  options: ScrollToElementOptions = {}
): Promise<void> {
  const targetElement = typeof element === 'string' 
    ? document.getElementById(element) || document.querySelector(element)
    : element;

  if (!targetElement) {
    return Promise.reject(new Error('Target element not found'));
  }

  const {
    block = 'start',
    inline = 'start',
    offset = 0,
    ...scrollOptions
  } = options;

  const rect = targetElement.getBoundingClientRect();
  const currentScrollY = window.pageYOffset;
  
  let targetY: number;
  
  switch (block) {
    case 'center':
      targetY = currentScrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
      break;
    case 'end':
      targetY = currentScrollY + rect.bottom - window.innerHeight;
      break;
    case 'start':
    default:
      targetY = currentScrollY + rect.top;
      break;
  }

  return smoothScrollTo(targetY, { ...scrollOptions, offset });
}

/**
 * Get optimal scroll offset based on fixed elements
 */
export function getScrollOffset(): number {
  const navbar = document.querySelector('.navbar');
  const fixedElements = document.querySelectorAll('[style*="position: fixed"], .fixed');
  
  let totalOffset = 0;
  
  if (navbar) {
    totalOffset += navbar.getBoundingClientRect().height;
  }
  
  fixedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top === 0) { // Element is at the top
      totalOffset += rect.height;
    }
  });
  
  return totalOffset + 20; // Add some padding
}

/**
 * Scroll spy functionality for navigation highlighting
 */
export class ScrollSpy {
  private sections: HTMLElement[] = [];
  private callback: (activeSection: string) => void;
  private observer: IntersectionObserver | null = null;
  private options: IntersectionObserverInit;

  constructor(
    sectionIds: string[],
    callback: (activeSection: string) => void,
    options: IntersectionObserverInit = {}
  ) {
    this.callback = callback;
    this.options = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0.1,
      ...options
    };

    this.sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    this.init();
  }

  private init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.initScrollListener();
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let activeSection = '';

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeSection = entry.target.id;
        }
      });

      if (activeSection) {
        this.callback(activeSection);
      }
    }, this.options);

    this.sections.forEach(section => {
      if (this.observer) {
        this.observer.observe(section);
      }
    });
  }

  private initScrollListener() {
    // Fallback scroll listener for older browsers
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.pageYOffset;
      const offset = getScrollOffset();

      for (let i = this.sections.length - 1; i >= 0; i--) {
        const section = this.sections[i];
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top - offset;

        if (scrollY >= sectionTop) {
          this.callback(section.id);
          break;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  public refresh() {
    this.destroy();
    this.init();
  }
}

/**
 * Utility to check if smooth scrolling is supported
 */
export function isSmoothScrollSupported(): boolean {
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Polyfill for smooth scrolling in older browsers
 */
export function polyfillSmoothScroll() {
  if (!isSmoothScrollSupported()) {
    // Override native scrollTo with smooth implementation
    const originalScrollTo = window.scrollTo;

    (window as any).scrollTo = function(x: number | ScrollToOptions, y?: number) {
      if (typeof x === 'object' && x && x.behavior === 'smooth') {
        smoothScrollTo(x.top || 0, {
          duration: 600,
          easing: 'easeInOutQuad'
        });
      } else if (typeof x === 'number') {
        originalScrollTo.call(window, x, y || 0);
      }
    };
  }
}

/**
 * Debounced scroll event handler
 */
export function createScrollHandler(
  callback: () => void,
  delay: number = 100
): () => void {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

/**
 * Get scroll progress as percentage
 */
export function getScrollProgress(): number {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(Math.max(scrollTop / docHeight, 0), 1);
}
