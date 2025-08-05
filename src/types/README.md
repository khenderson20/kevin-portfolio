# TypeScript Types Documentation

This directory contains comprehensive TypeScript type definitions for the Kevin Henderson Portfolio application. The types are organized into logical modules for better maintainability and developer experience.

## File Structure

```
src/types/
├── index.ts           # Central export file for all types
├── components.ts      # Component prop interfaces and types
├── hooks.ts          # Custom hook types and interfaces
├── portfolio.ts      # Portfolio-specific data types
├── github.ts         # GitHub API response types
└── README.md         # This documentation file
```

## Usage

### Importing Types

```typescript
// Import all types from the central index
import type { ProjectCardProps, Track, UseIntersectionObserverReturn } from '../types';

// Import specific type modules
import type { NavigationSection } from '../types/components';
import type { UseActiveSectionOptions } from '../types/hooks';
import type { Project } from '../types/portfolio';
```

### Component Types

All component prop interfaces follow a consistent naming pattern: `{ComponentName}Props`

```typescript
// Example: Using component types
import type { ProjectCardProps, InteractiveCardProps } from '../types/components';

function ProjectCard({ project }: ProjectCardProps) {
  // Component implementation
}

function InteractiveCard({ 
  children, 
  glowEffect = false, 
  tiltEffect = true 
}: InteractiveCardProps) {
  // Component implementation
}
```

### Hook Types

Custom hook types include both options and return value interfaces:

```typescript
// Example: Using hook types
import type { 
  UseIntersectionObserverOptions, 
  UseIntersectionObserverReturn 
} from '../types/hooks';

function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  // Hook implementation
}
```

### Base Component Types

Common base interfaces for consistent component APIs:

```typescript
import type { BaseComponentProps, InteractiveComponentProps } from '../types/components';

// For simple components
interface MyComponentProps extends BaseComponentProps {
  title: string;
}

// For interactive components
interface MyButtonProps extends InteractiveComponentProps {
  variant: 'primary' | 'secondary';
}
```

## Type Categories

### 1. Component Types (`components.ts`)

- **Base Types**: `BaseComponentProps`, `InteractiveComponentProps`
- **Navigation**: `NavigationSection`, `NavbarProps`, `ProgressiveNavigationProps`
- **Cards**: `Card3DProps`, `InteractiveCardProps`, `ProjectCardProps`
- **Forms**: `FormFieldProps`, `InputProps`, `ButtonProps`
- **Layout**: `ModalProps`, `TooltipProps`, `DropdownProps`

### 2. Hook Types (`hooks.ts`)

- **Intersection Observer**: `UseIntersectionObserverOptions`, `UseIntersectionObserverReturn`
- **Navigation**: `UseMobileNavigationOptions`, `UseActiveSectionReturn`
- **Performance**: `UsePerformanceMetricsOptions`, `PerformanceMetrics`
- **Storage**: `UseLocalStorageOptions`, `UseLocalStorageReturn`
- **Animation**: `UseAnimationOptions`, `UseAnimationReturn`

### 3. Data Types (`portfolio.ts`, `github.ts`)

- **Portfolio**: `Project`, `SkillGroup`, `ProjectCategory`
- **GitHub**: `GitHubRepo`, `GitHubUser`, `GitHubLanguages`
- **Content**: `CodeSnippet`, `Experience`, `Education`

### 4. Utility Types (`index.ts`)

- **API**: `ApiResponse`, `PaginatedResponse`, `AsyncState`
- **Forms**: `FormField`, `FormState`, `ValidationRule`
- **Theme**: `ThemeColors`, `ThemeSpacing`, `ThemeBreakpoints`
- **Accessibility**: `A11yProps`

## Best Practices

### 1. Type Naming Conventions

```typescript
// Component props: {ComponentName}Props
interface ProjectCardProps { }

// Hook options: Use{HookName}Options
interface UseIntersectionObserverOptions { }

// Hook returns: Use{HookName}Return
interface UseIntersectionObserverReturn { }

// Data models: Descriptive names
interface Project { }
interface GitHubRepo { }
```

### 2. Optional vs Required Properties

```typescript
// Use optional properties for non-essential props
interface ComponentProps {
  title: string;           // Required
  description?: string;    // Optional
  className?: string;      // Optional (common pattern)
  children?: ReactNode;    // Optional (common pattern)
}
```

### 3. Generic Types

```typescript
// Use generics for reusable types
interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
}

// Usage
type ProjectResponse = ApiResponse<Project[]>;
type UserResponse = ApiResponse<User>;
```

### 4. Union Types for Variants

```typescript
// Use union types for component variants
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
```

### 5. Extending Base Types

```typescript
// Extend base types for consistency
interface SpecialButtonProps extends ButtonProps {
  specialFeature: boolean;
}

// Or use intersection types
type EnhancedButtonProps = ButtonProps & {
  enhancement: string;
};
```

## Type Safety Guidelines

### 1. Strict Type Checking

```typescript
// Avoid 'any' - use specific types
interface BadExample {
  data: any; // ❌ Avoid
}

interface GoodExample {
  data: Project[] | null; // ✅ Specific
}
```

### 2. Null Safety

```typescript
// Use utility types for null handling
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

interface ComponentProps {
  data: Nullable<Project[]>;
  error: Optional<string>;
}
```

### 3. Event Handlers

```typescript
// Use specific event handler types
interface ComponentProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onChange?: (value: string) => void;
}
```

## Adding New Types

When adding new types to the system:

1. **Determine the appropriate file** based on the type's purpose
2. **Follow naming conventions** established in this documentation
3. **Add JSDoc comments** for complex types
4. **Export from the index file** if the type will be used across modules
5. **Update this documentation** if adding new categories or patterns

### Example: Adding a New Component Type

```typescript
// In components.ts
/**
 * Props for the new FeatureCard component
 * Used to display feature highlights with icons and descriptions
 */
export interface FeatureCardProps extends BaseComponentProps {
  /** The main feature title */
  title: string;
  /** Optional feature description */
  description?: string;
  /** Icon to display with the feature */
  icon: ReactNode;
  /** Whether the feature is currently available */
  available?: boolean;
  /** Callback when feature is clicked */
  onFeatureClick?: (featureId: string) => void;
}

// In index.ts (if needed across modules)
export type { FeatureCardProps } from './components';
```

## Migration Guide

When updating existing components to use these types:

1. **Import the appropriate types** from `../types`
2. **Replace inline interfaces** with the centralized types
3. **Update component props** to use the new interfaces
4. **Test thoroughly** to ensure type safety is maintained

This type system provides a solid foundation for type-safe development while maintaining flexibility for future enhancements.
