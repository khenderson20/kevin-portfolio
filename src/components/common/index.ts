// Barrel exports for common components
// This provides a clean import interface for shared components

export { default as UnifiedErrorBoundary } from './UnifiedErrorBoundary';
export { default as UnifiedLoader, SectionLoader, CardLoader, ButtonLoader } from './UnifiedLoader';

// Re-export existing common components for consistency
export { default as Card3D } from '../Card3D';
export { default as InteractiveCard } from '../InteractiveCard';
export { default as SkeletonLoader } from '../SkeletonLoader';
export { default as ScrollIndicator } from '../ScrollIndicator';
// ThemeToggle removed; app locked to dark theme
export { default as RippleEffect } from '../RippleEffect';

// Type exports
export type { 
  BaseComponentProps, 
  InteractiveComponentProps,
  Card3DProps,
  SkeletonLoaderProps,
  ScrollIndicatorProps,
  ErrorBoundaryProps,
  ErrorBoundaryState
} from '../../types/components';
