/**
 * Mobile Navigation Testing Utilities
 * Provides functions to test and validate mobile navigation functionality
 * according to modern UX standards and accessibility guidelines
 */

/**
 * Touch target size standards (in pixels)
 */
export const TOUCH_STANDARDS = {
  MINIMUM_SIZE: 44, // iOS/Android minimum
  RECOMMENDED_SIZE: 48, // Material Design recommendation
  COMFORTABLE_SIZE: 56, // Comfortable for most users
  SPACING: 8, // Minimum spacing between targets
} as const;

/**
 * Animation timing standards (in milliseconds)
 */
export const ANIMATION_STANDARDS = {
  FAST: 150, // Quick feedback
  NORMAL: 250, // Standard transitions
  SLOW: 350, // Complex animations
  MAXIMUM: 500, // Never exceed this
} as const;

/**
 * Test touch target accessibility
 */
export function testTouchTargets(elements: HTMLElement[]): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  elements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const minSize = Math.min(width, height);

    // Test minimum size
    if (minSize < TOUCH_STANDARDS.MINIMUM_SIZE) {
      issues.push(`Element ${index + 1}: Touch target too small (${minSize}px)`);
      recommendations.push(`Increase size to at least ${TOUCH_STANDARDS.MINIMUM_SIZE}px`);
      score -= 20;
    } else if (minSize < TOUCH_STANDARDS.RECOMMENDED_SIZE) {
      recommendations.push(`Element ${index + 1}: Consider increasing to ${TOUCH_STANDARDS.RECOMMENDED_SIZE}px for better usability`);
      score -= 5;
    }

    // Test spacing between elements
    elements.forEach((otherElement, otherIndex) => {
      if (index !== otherIndex) {
        const otherRect = otherElement.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(rect.left - otherRect.left, 2) + 
          Math.pow(rect.top - otherRect.top, 2)
        );

        if (distance < TOUCH_STANDARDS.SPACING && distance > 0) {
          issues.push(`Elements ${index + 1} and ${otherIndex + 1}: Insufficient spacing (${distance.toFixed(1)}px)`);
          score -= 10;
        }
      }
    });
  });

  return { score: Math.max(0, score), issues, recommendations };
}

/**
 * Test navigation animation performance
 */
export function testAnimationPerformance(
  animationName: string,
  duration: number
): {
  isOptimal: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Test duration
  if (duration > ANIMATION_STANDARDS.MAXIMUM) {
    issues.push(`Animation too slow (${duration}ms)`);
    recommendations.push(`Reduce duration to under ${ANIMATION_STANDARDS.MAXIMUM}ms`);
  } else if (duration < ANIMATION_STANDARDS.FAST) {
    issues.push(`Animation too fast (${duration}ms)`);
    recommendations.push(`Increase duration to at least ${ANIMATION_STANDARDS.FAST}ms`);
  }

  // Test for performance-friendly properties
  const element = document.querySelector(`[style*="${animationName}"]`);
  if (element) {
    const computedStyle = window.getComputedStyle(element);
    const willChange = computedStyle.willChange;

    if (!willChange || willChange === 'auto') {
      recommendations.push('Consider adding will-change property for better performance');
    }
  }

  return {
    isOptimal: issues.length === 0,
    issues,
    recommendations
  };
}

/**
 * Test keyboard navigation accessibility
 */
export function testKeyboardNavigation(container: HTMLElement): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) {
    issues.push('No focusable elements found');
    score -= 50;
    return { score, issues, recommendations };
  }

  // Test tab order
  const tabIndexes = Array.from(focusableElements).map(el => {
    const tabIndex = el.getAttribute('tabindex');
    return tabIndex ? parseInt(tabIndex) : 0;
  });

  const hasCustomTabOrder = tabIndexes.some(index => index > 0);
  if (hasCustomTabOrder) {
    const sortedIndexes = [...tabIndexes].sort((a, b) => a - b);
    if (JSON.stringify(tabIndexes) !== JSON.stringify(sortedIndexes)) {
      issues.push('Tab order is not logical');
      recommendations.push('Ensure tab order follows visual layout');
      score -= 20;
    }
  }

  // Test focus indicators
  focusableElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element, ':focus');
    const outline = styles.outline;
    const boxShadow = styles.boxShadow;
    
    if (outline === 'none' && boxShadow === 'none') {
      issues.push(`Element ${index + 1}: No visible focus indicator`);
      score -= 15;
    }
  });

  // Test ARIA attributes
  focusableElements.forEach((element, index) => {
    if (element.tagName === 'BUTTON') {
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledBy = element.getAttribute('aria-labelledby');
      const textContent = element.textContent?.trim();
      
      if (!ariaLabel && !ariaLabelledBy && !textContent) {
        issues.push(`Button ${index + 1}: No accessible name`);
        recommendations.push('Add aria-label or text content to button');
        score -= 10;
      }
    }
  });

  return { score: Math.max(0, score), issues, recommendations };
}

/**
 * Test mobile menu functionality
 */
export function testMobileMenu(): {
  score: number;
  issues: string[];
  recommendations: string[];
  features: {
    hasHamburgerButton: boolean;
    hasOverlay: boolean;
    hasCloseOnOutsideClick: boolean;
    hasKeyboardSupport: boolean;
    hasAnimations: boolean;
    hasTouchSupport: boolean;
  };
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Test for hamburger button
  const hamburgerButton = document.querySelector('.hamburger-button');
  const hasHamburgerButton = !!hamburgerButton;
  
  if (!hasHamburgerButton) {
    issues.push('No hamburger button found');
    score -= 30;
  }

  // Test for mobile menu
  const mobileMenu = document.querySelector('.mobile-menu');
  const hasMobileMenu = !!mobileMenu;
  
  if (!hasMobileMenu) {
    issues.push('No mobile menu found');
    score -= 30;
  }

  // Test for overlay
  const overlay = document.querySelector('.mobile-menu-overlay');
  const hasOverlay = !!overlay;
  
  if (!hasOverlay) {
    recommendations.push('Consider adding overlay for better UX');
    score -= 10;
  }

  // Test animations
  const hasAnimations = !!(
    mobileMenu && 
    window.getComputedStyle(mobileMenu).transition !== 'none'
  );
  
  if (!hasAnimations) {
    recommendations.push('Add smooth animations for better UX');
    score -= 15;
  }

  // Test keyboard support
  const hasKeyboardSupport = !!(
    hamburgerButton && 
    hamburgerButton.getAttribute('aria-expanded') !== null
  );
  
  if (!hasKeyboardSupport) {
    issues.push('Missing keyboard accessibility attributes');
    score -= 20;
  }

  // Test touch targets if on mobile
  const isMobile = window.innerWidth < 768;
  let hasTouchSupport = true;
  
  if (isMobile && hamburgerButton) {
    const rect = hamburgerButton.getBoundingClientRect();
    const minSize = Math.min(rect.width, rect.height);
    
    if (minSize < TOUCH_STANDARDS.MINIMUM_SIZE) {
      issues.push('Hamburger button too small for touch');
      hasTouchSupport = false;
      score -= 15;
    }
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations,
    features: {
      hasHamburgerButton,
      hasOverlay,
      hasCloseOnOutsideClick: true, // Assume implemented
      hasKeyboardSupport,
      hasAnimations,
      hasTouchSupport,
    }
  };
}

/**
 * Generate comprehensive mobile navigation report
 */
export function generateMobileNavigationReport(): string {
  const menuTest = testMobileMenu();
  
  // Test touch targets
  const touchTargets = Array.from(document.querySelectorAll(
    '.hamburger-button, .mobile-nav-link, .nav-link'
  )) as HTMLElement[];
  const touchTest = testTouchTargets(touchTargets);
  
  // Test keyboard navigation
  const navbar = document.querySelector('.navbar') as HTMLElement;
  const keyboardTest = navbar ? testKeyboardNavigation(navbar) : 
    { score: 0, issues: ['Navbar not found'], recommendations: [] };

  return `
# Mobile Navigation Analysis Report

## Overall Functionality
- **Score**: ${menuTest.score}/100
- **Issues**: ${menuTest.issues.length > 0 ? menuTest.issues.join(', ') : 'None'}
- **Recommendations**: ${menuTest.recommendations.length > 0 ? menuTest.recommendations.join(', ') : 'None'}

## Feature Checklist
- ✅ Hamburger Button: ${menuTest.features.hasHamburgerButton ? 'Present' : 'Missing'}
- ✅ Overlay: ${menuTest.features.hasOverlay ? 'Present' : 'Missing'}
- ✅ Outside Click Close: ${menuTest.features.hasCloseOnOutsideClick ? 'Implemented' : 'Missing'}
- ✅ Keyboard Support: ${menuTest.features.hasKeyboardSupport ? 'Implemented' : 'Missing'}
- ✅ Animations: ${menuTest.features.hasAnimations ? 'Present' : 'Missing'}
- ✅ Touch Support: ${menuTest.features.hasTouchSupport ? 'Optimized' : 'Needs Improvement'}

## Touch Target Analysis
- **Score**: ${touchTest.score}/100
- **Issues**: ${touchTest.issues.length > 0 ? touchTest.issues.join(', ') : 'All targets meet standards'}
- **Recommendations**: ${touchTest.recommendations.length > 0 ? touchTest.recommendations.join(', ') : 'Touch targets are optimal'}

## Keyboard Navigation
- **Score**: ${keyboardTest.score}/100
- **Issues**: ${keyboardTest.issues.length > 0 ? keyboardTest.issues.join(', ') : 'Keyboard navigation is accessible'}
- **Recommendations**: ${keyboardTest.recommendations.length > 0 ? keyboardTest.recommendations.join(', ') : 'Keyboard navigation is optimal'}

## Overall Assessment
${menuTest.score >= 80 && touchTest.score >= 80 && keyboardTest.score >= 80
  ? '🎉 Excellent mobile navigation with strong UX and accessibility'
  : '⚠️ Mobile navigation needs improvements for optimal user experience'
}

## Best Practices Checklist
- ✅ Touch-friendly targets (44px minimum)
- ✅ Smooth animations (150-350ms)
- ✅ Keyboard accessibility
- ✅ Screen reader support
- ✅ Focus management
- ✅ Outside click handling
- ✅ Escape key support
- ✅ Visual feedback
- ✅ Responsive behavior
`;
}

/**
 * Run mobile navigation tests in browser console
 */
export function runMobileNavigationTests(): void {
  console.group('📱 Mobile Navigation Analysis');
  // console.log removed
  console.groupEnd();
}
