// ===== HOOK TYPES =====
// Comprehensive type definitions for all custom hooks used throughout the application

// Smooth Scrolling Hook Types
export interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

export interface UseActiveSectionOptions {
  sections?: string[];
  rootMargin?: string;
  threshold?: number;
  smoothScrollOptions?: SmoothScrollOptions;
}

// Intersection Observer Hook Types
export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

export interface UseIntersectionObserverReturn {
  elementRef: React.RefObject<Element>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

// Mobile Navigation Hook Types
export interface UseMobileNavigationOptions {
  breakpoint?: number;
  closeOnNavigate?: boolean;
  closeOnResize?: boolean;
  trapFocus?: boolean;
}

export interface UseMobileNavigationReturn {
  isMobile: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

// Navbar Scroll Hook Types
export interface UseNavbarScrollOptions {
  threshold?: number;
  debounceMs?: number;
}

export interface UseNavbarScrollReturn {
  isScrolled: boolean;
  scrollY: number;
}

// Active Section Hook Types
export interface UseActiveSectionReturn {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollToSection: (sectionId: string, options?: SmoothScrollOptions) => void;
  isScrolling: boolean;
}

// Performance Monitoring Hook Types
export interface UsePerformanceMetricsOptions {
  trackRenders?: boolean;
  trackMemory?: boolean;
  trackTiming?: boolean;
  sampleRate?: number;
}

export interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage?: number;
  componentMountTime?: number;
}

export interface UsePerformanceMetricsReturn {
  metrics: PerformanceMetrics;
  resetMetrics: () => void;
  startTiming: (label: string) => void;
  endTiming: (label: string) => number;
}

// Local Storage Hook Types
export interface UseLocalStorageOptions<T> {
  defaultValue: T;
  serializer?: {
    parse: (value: string) => T;
    stringify: (value: T) => string;
  };
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

// Media Query Hook Types
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export interface UseMediaQueryReturn {
  matches: boolean;
  media: string;
}

// Debounce Hook Types
export interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface UseDebounceReturn<T extends (...args: unknown[]) => unknown> {
  debouncedCallback: T;
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
}

// Theme Hook Types
export interface UseThemeOptions {
  defaultTheme?: import('./components').Theme;
  storageKey?: string;
  enableSystemTheme?: boolean;
}

export interface UseThemeReturn {
  theme: import('./components').Theme;
  setTheme: (theme: import('./components').Theme) => void;
  toggleTheme: () => void;
  systemTheme: import('./components').Theme | null;
  resolvedTheme: import('./components').Theme;
}

// Animation Hook Types
export interface UseAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  autoPlay?: boolean;
  loop?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface UseAnimationReturn {
  isPlaying: boolean;
  progress: number;
  play: () => void;
  pause: () => void;
  reset: () => void;
  reverse: () => void;
}

// Keyboard Navigation Hook Types
export interface UseKeyboardNavigationOptions {
  keys?: string[];
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

export interface UseKeyboardNavigationReturn {
  handleKeyDown: (event: KeyboardEvent) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

// Focus Management Hook Types
export interface UseFocusManagementOptions {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
}

export interface UseFocusManagementReturn {
  focusRef: React.RefObject<HTMLElement>;
  setFocus: () => void;
  releaseFocus: () => void;
  isFocused: boolean;
}

// Resize Observer Hook Types
export interface UseResizeObserverOptions {
  debounceMs?: number;
  enabled?: boolean;
}

export interface UseResizeObserverReturn {
  ref: React.RefObject<Element>;
  width: number;
  height: number;
  contentRect: DOMRectReadOnly | null;
}

// Mutation Observer Hook Types
export interface UseMutationObserverOptions {
  childList?: boolean;
  attributes?: boolean;
  characterData?: boolean;
  subtree?: boolean;
  attributeOldValue?: boolean;
  characterDataOldValue?: boolean;
  attributeFilter?: string[];
}

export interface UseMutationObserverReturn {
  ref: React.RefObject<Element>;
  mutations: MutationRecord[];
}
