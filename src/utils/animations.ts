import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Base animation configurations
export const animationConfig = {
  // Duration settings
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    slower: 1.8,
  },

  // Easing functions
  ease: {
    power1: 'power1.out',
    power2: 'power2.out',
    power3: 'power3.out',
    back: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    bounce: 'bounce.out',
  },

  // Common delays
  delay: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.4,
  },

  // Stagger settings
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
};

// Base interface for common animation options
interface BaseAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  triggerElement?: Element;
}

// Helper Functions
const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const validateElement = (element: gsap.TweenTarget, functionName: string): boolean => {
  if (!element) {
    console.warn(`GSAP ${functionName}: element is null or undefined`);
    return false;
  }
  return true;
};

const handleReducedMotion = (element: gsap.TweenTarget, fallbackProps: gsap.TweenVars): boolean => {
  if (prefersReducedMotion()) {
    gsap.set(element, fallbackProps);
    return true;
  }
  return false;
};

const createScrollTriggerConfig = (
  trigger: Element | gsap.TweenTarget,
  start: string = 'top 85%',
  toggleActions: string = 'play none none reverse'
): ScrollTrigger.Vars => ({
  trigger: trigger as Element,
  start,
  toggleActions,
  // Never enable markers in production builds.
  markers: false,
  // Prefer one-time entrance animations for performance.
  // NOTE: this overrides reverse behavior when used with toggleActions.
  once: true,
});

const setInitialState = (element: gsap.TweenTarget, props: gsap.TweenVars): void => {
  gsap.set(element, {
    ...props,
    clearProps: 'transition',
    willChange: 'opacity, transform',
    force3D: true,
    transformPerspective: 1000,
  });
};

const createBaseProps = (options: BaseAnimationOptions): gsap.TweenVars => {
  const {
    duration = animationConfig.duration.normal,
    delay = 0,
    ease = animationConfig.ease.power3,
  } = options;

  return { duration, delay, ease, overwrite: 'auto', force3D: true } as gsap.TweenVars;
};


// Helper to normalize tween targets into an array of HTMLElements
const toElementArray = (target: gsap.TweenTarget | gsap.TweenTarget[] | null | undefined): Element[] => {
  if (!target) return [];
  const arr = Array.isArray(target) ? target : [target];
  const elements: Element[] = [];
  arr.forEach(t => {
    if (!t) return;
    if (t instanceof Element) elements.push(t);
    else if (Array.isArray(t)) {
      (t as unknown[]).forEach(inner => {
        if (inner instanceof Element) elements.push(inner);
      });
    } else {
      const record = t as unknown as Record<string, unknown>;
      const length = record.length;
      const nodeType = record.nodeType;

      // Likely a NodeList or HTMLCollection
      if (typeof length === 'number' && typeof nodeType !== 'number') {
        Array.from(t as unknown as ArrayLike<unknown>).forEach((el) => {
          if (el instanceof Element) elements.push(el);
        });
      }
    }
  });
  return elements;
};

// Targeted cleanup: kill ScrollTriggers created for specific elements
export const killScrollTriggersFor = (target: gsap.TweenTarget | gsap.TweenTarget[] | null | undefined) => {
  const elements = toElementArray(target);
  if (elements.length === 0) return;
  ScrollTrigger.getAll().forEach(trigger => {
    const triggerEl = trigger.trigger as Element | null;
    if (!triggerEl) return;
    if (elements.some(el => el === triggerEl || el.contains(triggerEl))) {
      trigger.kill();
    }
  });
};

// Targeted cleanup: kill tweens for specific elements
export const killTweensFor = (target: gsap.TweenTarget | gsap.TweenTarget[] | null | undefined) => {
  const elements = toElementArray(target);
  if (elements.length === 0) return;
  elements.forEach(el => gsap.killTweensOf(el));
};

// Animation utility functions
export const animations = {

  /**
   * Fade in animation with optional slide
   */
  fadeIn: (
    element: gsap.TweenTarget,
    options: BaseAnimationOptions & {
      y?: number;
      x?: number;
    } = {}
  ) => {
    if (!validateElement(element, 'fadeIn')) return;

    const { y = 30, x = 0 } = options;
    if (handleReducedMotion(element, { opacity: 1, x: 0, y: 0 })) return;

    const { scrollTrigger = true, triggerElement } = options;
    const baseProps = createBaseProps(options);

    const animationProps: gsap.TweenVars = {
      ...baseProps,
      opacity: 1,
      y: 0,
      x: 0,
    };

    if (scrollTrigger) {
      animationProps.scrollTrigger = createScrollTriggerConfig(triggerElement || element);
    }

    setInitialState(element, { opacity: 0, y, x });
    return gsap.to(element, animationProps);
  },

  /**
   * Staggered fade in for multiple elements
   */
  staggerFadeIn: (
    elements: gsap.TweenTarget,
    options: BaseAnimationOptions & {
      stagger?: number;
      y?: number;
    } = {}
  ) => {
    if (!validateElement(elements, 'staggerFadeIn')) return;

    const {
      stagger = animationConfig.stagger.normal,
      y = 30,
      scrollTrigger = true,
      triggerElement,
    } = options as BaseAnimationOptions & { stagger?: number; y?: number };

    if (handleReducedMotion(elements, { opacity: 1, y: 0 })) return;

    const baseProps = createBaseProps(options);
    const animationProps: gsap.TweenVars = {
      ...baseProps,
      opacity: 1,
      y: 0,
      stagger,
    };

    if (scrollTrigger) {
      // Use provided triggerElement or fall back to first element in the collection
      const fallbackTrigger = (triggerElement instanceof Element ? triggerElement : undefined)
        ?? toElementArray(elements)[0];
      if (fallbackTrigger) {
        animationProps.scrollTrigger = createScrollTriggerConfig(fallbackTrigger);
      }
    }

    setInitialState(elements, { opacity: 0, y });
    return gsap.to(elements, animationProps);
  },

  /**
   * Scale in animation
   */
  scaleIn: (
    element: gsap.TweenTarget,
    options: BaseAnimationOptions & {
      scale?: number;
    } = {}
  ) => {
    if (!validateElement(element, 'scaleIn')) return;

    const {
      scale = 0.8,
      scrollTrigger = true,
      ease = animationConfig.ease.back
    } = options;

    if (handleReducedMotion(element, { opacity: 1, scale: 1 })) return;

    const baseProps = createBaseProps({ ...options, ease });
    const animationProps: gsap.TweenVars = {
      ...baseProps,
      opacity: 1,
      scale: 1,
    };

    if (scrollTrigger) {
      animationProps.scrollTrigger = createScrollTriggerConfig(element);
    }

    return gsap.fromTo(element, { opacity: 0, scale }, animationProps);
  },

  /**
   * Slide in from direction
   */
  slideIn: (
    element: gsap.TweenTarget,
    direction: 'left' | 'right' | 'up' | 'down',
    options: BaseAnimationOptions & {
      distance?: number;
    } = {}
  ) => {
    if (!validateElement(element, 'slideIn')) return;

    const { distance = 50, scrollTrigger = true } = options;
    if (handleReducedMotion(element, { opacity: 1, x: 0, y: 0 })) return;

    const baseProps = createBaseProps(options);
    const fromProps: gsap.TweenVars = { opacity: 0 };
    const toProps: gsap.TweenVars = { ...baseProps, opacity: 1 };

    // Set direction-specific properties
    switch (direction) {
      case 'left':
        fromProps.x = -distance;
        toProps.x = 0;
        break;
      case 'right':
        fromProps.x = distance;
        toProps.x = 0;
        break;
      case 'up':
        fromProps.y = distance;
        toProps.y = 0;
        break;
      case 'down':
        fromProps.y = -distance;
        toProps.y = 0;
        break;
    }

    if (scrollTrigger) {
      toProps.scrollTrigger = createScrollTriggerConfig(element);
    }

    return gsap.fromTo(element, fromProps, toProps);
  },

  /**
   * Text reveal animation
   */
  textReveal: (
    element: gsap.TweenTarget,
    options: BaseAnimationOptions & {
      stagger?: number;
    } = {}
  ) => {
    if (!validateElement(element, 'textReveal')) return;

    const {
      duration = animationConfig.duration.slow,
      scrollTrigger = true,
      stagger = 0.1
    } = options;

    if (handleReducedMotion(element, { opacity: 1, y: 0 })) return;

    // Split text into words for animation (collapse any whitespace to single spaces)
    const words = (element as Element).textContent?.trim().split(/\s+/) || [];
    const wordElements = words.map((word) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      return span;
    });

    // Replace original text with spans and explicit space nodes between them
    (element as Element).innerHTML = '';
    wordElements.forEach((span, index) => {
      (element as Element).appendChild(span);
      if (index < wordElements.length - 1) {
        (element as Element).appendChild(document.createTextNode(' '));
      }
    });

    const baseProps = createBaseProps({ ...options, duration });
    const animationProps: gsap.TweenVars = {
      ...baseProps,
      opacity: 1,
      y: 0,
      duration: duration / 2,
      stagger,
    };

    if (scrollTrigger) {
      animationProps.scrollTrigger = createScrollTriggerConfig(element);
    }

    return gsap.to(wordElements, animationProps);
  },

  /**
   * Card hover animation
   */
  cardHover: (element: gsap.TweenTarget) => {
    if (!validateElement(element, 'cardHover')) return;
    if (prefersReducedMotion()) return;

    return gsap.to(element, {
      y: -8,
      scale: 1.02,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.power2,
      paused: true,
    });
  },

  /**
   * Button press animation
   */
  buttonPress: (element: gsap.TweenTarget) => {
    if (!validateElement(element, 'buttonPress')) return;
    if (prefersReducedMotion()) return;

    return gsap.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: animationConfig.ease.power2,
      yoyo: true,
      repeat: 1,
    });
  },

  /**
   * Loading pulse animation
   */
  pulse: (element: gsap.TweenTarget) => {
    if (!validateElement(element, 'pulse')) return;
    if (prefersReducedMotion()) return;

    return gsap.to(element, {
      opacity: 0.5,
      duration: 1,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });
  },

  /**
   * Parallax animation for elements
   */
  parallax: (
    element: gsap.TweenTarget,
    options: {
      yPercent?: number;
      xPercent?: number;
      ease?: string;
      scrollTrigger?: object;
    } = {}
  ) => {
    if (!validateElement(element, 'parallax')) return;
    if (prefersReducedMotion()) return;

    const {
      yPercent = -50,
      xPercent = 0,
      ease = 'none',
      scrollTrigger,
    } = options;

    return gsap.to(element, {
      yPercent,
      xPercent,
      ease,
      scrollTrigger,
    });
  },

  /**
   * Cleanup all ScrollTrigger instances
   */
  cleanup: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },

  /**
   * Refresh ScrollTrigger (useful after DOM changes)
   */
  refresh: () => {
    ScrollTrigger.refresh();
  },
};

// Export individual animation functions for convenience
export const {
  fadeIn,
  staggerFadeIn,
  scaleIn,
  slideIn,
  textReveal,
  cardHover,
  buttonPress,
  pulse,
  parallax,
  cleanup,
  refresh,
} = animations;
