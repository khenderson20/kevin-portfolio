import { useState, useEffect, useCallback, useRef } from 'react';

interface UseMobileNavigationOptions {
  breakpoint?: number;
  closeOnNavigate?: boolean;
  closeOnResize?: boolean;
  trapFocus?: boolean;
}

interface UseMobileNavigationReturn {
  isMobile: boolean;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

/**
 * Custom hook for managing mobile navigation state and behavior
 * Provides accessibility features, focus management, and responsive behavior
 */
export function useMobileNavigation(
  options: UseMobileNavigationOptions = {}
): UseMobileNavigationReturn {
  const {
    breakpoint = 768,
    closeOnNavigate = true,
    closeOnResize = true,
    trapFocus = true,
  } = options;

  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Check if we're on mobile
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < breakpoint;
    setIsMobile(mobile);
    
    // Close menu if switching to desktop
    if (!mobile && isMenuOpen && closeOnResize) {
      setIsMenuOpen(false);
    }
  }, [breakpoint, isMenuOpen, closeOnResize]);

  // Initialize mobile detection
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Menu control functions
  const openMenu = useCallback(() => {
    if (isMobile) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsMenuOpen(true);
    }
  }, [isMobile]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    
    // Restore focus to trigger button
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuOpen, openMenu, closeMenu]);

  // Handle escape key and outside clicks
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isMenuOpen || !trapFocus || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when menu opens
    if (firstElement) {
      firstElement.focus();
    }

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen, trapFocus]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMenuOpen, isMobile]);

  // Close menu on navigation (if enabled)
  useEffect(() => {
    if (!closeOnNavigate) return;

    const handleNavigation = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    // Listen for hash changes (client-side navigation)
    window.addEventListener('hashchange', handleNavigation);
    
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [isMenuOpen, closeMenu, closeOnNavigate]);

  return {
    isMobile,
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    menuRef,
    triggerRef,
  };
}

/**
 * Hook for managing navigation item focus and keyboard navigation
 */
export function useNavigationKeyboard(
  items: string[],
  onSelect: (item: string) => void,
  isActive: boolean = true
) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => (prev + 1) % items.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(items.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onSelect(items[focusedIndex]);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, focusedIndex, onSelect, isActive]);

  return {
    focusedIndex,
    setFocusedIndex,
  };
}

/**
 * Hook for detecting touch devices and optimizing interactions
 */
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore - for older browsers
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouch();
    
    // Some devices only register touch after first touch
    const handleFirstTouch = () => {
      setIsTouchDevice(true);
      document.removeEventListener('touchstart', handleFirstTouch);
    };

    document.addEventListener('touchstart', handleFirstTouch);
    return () => document.removeEventListener('touchstart', handleFirstTouch);
  }, []);

  return isTouchDevice;
}
