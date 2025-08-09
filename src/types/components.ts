import { ReactNode } from 'react';
import { IconType } from 'react-icons';

// ===== COMMON COMPONENT TYPES =====

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  onClick?: () => void;
}

// ===== NAVIGATION TYPES =====

export interface NavigationSection {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface NavbarProps {
  sections: NavigationSection[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// ===== CARD COMPONENT TYPES =====

export interface Card3DProps extends BaseComponentProps {
  intensity?: number;
  disabled?: boolean;
  enableMouseTracking?: boolean;
}

export interface InteractiveCardProps extends BaseComponentProps {
  tiltEffect?: boolean;
  scaleOnHover?: boolean;
  shadowIntensity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  disabled?: boolean;
}

// ===== PROJECT COMPONENT TYPES =====

export interface ProjectCardProps {
  project: import('../types/portfolio').Project;
}

export interface GitHubProjectsProps {
  projects: import('../types/portfolio').Project[];
  loading: boolean;
  error: string | null;
  hasMore?: boolean;
}

export interface PerformanceMetricsProps {
  metrics: string;
}

// ===== MUSIC COMPONENT TYPES =====

export interface Track {
  title: string;
  duration: string;
  genre: string;
  description?: string;
}

export interface TrackCardProps {
  track: Track;
}

// ===== SKILL COMPONENT TYPES =====

export interface SkillProgressBarProps {
  skill: string;
  level: number; // 0-100
  category?: string;
  delay?: number;
  showPercentage?: boolean;
  color?: string;
  className?: string;
  icon?: IconType;
}

// ===== ANIMATION COMPONENT TYPES =====

export interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}

export interface RippleProps {
  x: number;
  y: number;
  size: number;
  color?: string;
  duration?: number;
}

export interface RippleEffectProps extends BaseComponentProps {
  color?: string;
  duration?: number;
  disabled?: boolean;
}

// ===== PARTICLE SYSTEM TYPES =====

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  connectionChance: number;
  maxConnections: number;
  connectionDistance: number;
}

export interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ===== LOADING COMPONENT TYPES =====

export interface SkeletonLoaderProps extends BaseComponentProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
  loading?: boolean;
}

// ===== SCROLL COMPONENT TYPES =====

export interface ScrollIndicatorProps {
  className?: string;
  showPercentage?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  thickness?: number;
  color?: string;
}

// ===== ERROR BOUNDARY TYPES =====

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName: string;
}

export interface SectionErrorBoundaryState {
  hasError: boolean;
}

// ===== THEME COMPONENT TYPES =====

export type Theme = 'light' | 'dark' | 'high-contrast' | 'dark-high-contrast';

export interface ThemeOption {
  value: Theme;
  label: string;
  icon: string;
}

// ===== HOME SECTION TYPES =====

export interface HomeSectionProps {
  onNavigateToSection?: (section: string) => void;
}

// ===== DATABASE SEEDER TYPES =====

export interface DatabaseSeederProps {
  onSeedComplete?: () => void;
}

export type SeedStatus = 'idle' | 'success' | 'error';

// ===== TYPOGRAPHY COMPONENT TYPES =====

export interface TypographyShowcaseProps {
  className?: string;
}

// ===== CONTACT SECTION TYPES =====

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface ProfessionalLink {
  href: string;
  icon: string;
  label: string;
  description: string;
  primary: boolean;
}

// ===== DEVELOPMENT SECTION TYPES =====

export type TabType = 'featured' | 'github';
export type SortType = 'recent' | 'stars' | 'name';

export interface DevelopmentSectionState {
  projects: import('../types/portfolio').Project[];
  loading: boolean;
  error: string | null;
  activeTab: TabType;
  searchTerm: string;
  selectedTech: string;
  sortBy: SortType;
  selectedCategory: string;
  githubProjects: import('../types/portfolio').Project[];
  githubLoading: boolean;
  githubError: string | null;
  hasMoreGithubProjects: boolean;
}

// ===== ABOUT SECTION TYPES =====

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: 'enterprise' | 'research' | 'government' | 'development' | 'freelance';
  achievements: string[];
  technologies?: string[];
  current?: boolean;
  featured?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
  gpa?: string;
  honors?: string[];
}

// ===== FORM COMPONENT TYPES =====

export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
}

export interface InputProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface TextareaProps extends FormFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface ButtonProps extends InteractiveComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// ===== MODAL COMPONENT TYPES =====

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
}

export interface DialogProps extends ModalProps {
  actions?: ReactNode;
  description?: string;
}

// ===== TOOLTIP COMPONENT TYPES =====

export interface TooltipProps extends BaseComponentProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  offset?: number;
  arrow?: boolean;
}

// ===== DROPDOWN COMPONENT TYPES =====

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps extends BaseComponentProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
}

// ===== UTILITY TYPES =====

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type ComponentState = 'idle' | 'loading' | 'success' | 'error';

// ===== EVENT HANDLER TYPES =====

export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type KeyboardHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
export type FocusHandler = (event: React.FocusEvent<HTMLElement>) => void;
export type ChangeHandler<T = string> = (value: T) => void;
