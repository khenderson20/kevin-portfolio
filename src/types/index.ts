// ===== CENTRALIZED TYPE EXPORTS =====
// This file provides a single entry point for all TypeScript type definitions
// used throughout the portfolio application.

// ===== CORE TYPES =====
export * from './portfolio';
export * from './github';

// ===== COMPONENT TYPES =====
export * from './components';

// ===== HOOK TYPES =====
export * from './hooks';

// ===== RE-EXPORTED COMMON TYPES =====
// Common React types for convenience
export type { 
  ReactNode, 
  ReactElement, 
  ComponentProps, 
  ComponentType,
  CSSProperties,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent,
  FormEvent,
  RefObject,
  MutableRefObject
} from 'react';

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Object utility types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Function utility types
export type VoidFunction = () => void;
export type AsyncVoidFunction = () => Promise<void>;
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

// API Response types
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Form types
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  tertiary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

export interface ErrorBoundaryInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

// Performance types
export interface PerformanceEntry {
  name: string;
  startTime: number;
  duration: number;
  entryType: string;
}

export interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  role?: string;
  tabIndex?: number;
}

// Media query types
export interface MediaQueryBreakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
}

export interface MediaQueryState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  orientation: 'portrait' | 'landscape';
}

// Storage types
export interface StorageItem<T = unknown> {
  value: T;
  timestamp: number;
  expiry?: number;
}

export interface StorageOptions {
  expiry?: number;
  serialize?: boolean;
  compress?: boolean;
}

// Network types
export interface NetworkState {
  online: boolean;
  downlink?: number;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  rtt?: number;
  saveData?: boolean;
}

// Geolocation types
export interface GeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

// Device types
export interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  cookieEnabled: boolean;
  onLine: boolean;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelDepth: number;
}

// SEO types
export interface MetaData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
  timestamp: Date;
}

export interface AnalyticsPageView {
  path: string;
  title: string;
  referrer?: string;
  timestamp: Date;
}

// Feature flag types
export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number;
  conditions?: Record<string, unknown>;
}

export interface FeatureFlagContext {
  userId?: string;
  userType?: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
}
