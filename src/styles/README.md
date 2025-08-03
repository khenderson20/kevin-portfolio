# Design System Documentation

## Overview

This design system provides a comprehensive foundation for the React portfolio website, following modern UI/UX standards inspired by Material Design 3 and Apple's Human Interface Guidelines.

## Architecture

### File Structure
```
src/styles/
├── design-system.css    # Core design tokens and utilities
├── hero.css            # Hero section specific styles
├── contact-form.css    # Contact form specific styles
├── loading.css         # Loading states and animations
└── README.md           # This documentation
```

## Design Tokens

### Color System

#### Color Scales (50-950)
- **Primary**: Modern cyan/teal brand identity (hsl(186, 85%, x%))
- **Secondary**: Modern purple/magenta accent (hsl(310, 75%, x%))
- **Tertiary**: Warm orange/amber highlights (hsl(45, 90%, x%))
- **Neutral**: Cool grayscale with blue undertones (hsl(210, x%, x%))
- **Semantic**: Success, warning, error, info with full scales

#### Surface Colors
- `--color-surface`: Main background color
- `--color-surface-dim`: Dimmed surface variant
- `--color-surface-bright`: Brightened surface variant
- `--color-surface-variant`: Alternative background
- `--color-surface-container`: Card/container backgrounds
- `--color-surface-container-low/high/highest`: Container hierarchy
- `--color-surface-tint`: Surface tinting color

#### Text Colors
- `--color-on-surface`: Primary text color
- `--color-on-surface-variant`: Secondary text color
- `--color-on-surface-muted`: Muted text color
- `--color-on-primary/secondary/tertiary`: Text on colored backgrounds
- `--color-on-*-container`: Text on container backgrounds

#### Interactive Colors
- `--color-primary/secondary/tertiary`: Brand colors
- `--color-*-hover/active`: Interaction states
- `--color-*-container`: Container backgrounds
- `--color-border/outline`: Border and outline colors
- `--color-border-focus`: Focus state border

#### State Colors
- `--color-success/warning/error/info`: State indicators
- `--color-*-container`: State container backgrounds
- `--color-on-*`: Text on state colors
- `--color-on-*-container`: Text on state containers

### Enhanced Typography System

#### Font Families - Extended Stack
- `--font-family-display`: Work Sans + Inter (hero/display text)
- `--font-family-primary`: Work Sans (headings)
- `--font-family-secondary`: Source Sans Pro (body text)
- `--font-family-mono`: IBM Plex Mono + JetBrains Mono (code)
- `--font-family-serif`: Georgia (print/formal content)

#### Font Sizes - Fluid Typography Scale
- `--font-size-2xs` to `--font-size-9xl` (10px to 192px)
- Uses `clamp()` for responsive scaling across all breakpoints
- Optimized scaling ratios for perfect visual hierarchy
- Extended range for display typography and micro-content

#### Font Weights - Complete Range
- `--font-weight-thin`: 100 (minimal presence)
- `--font-weight-extralight`: 200 (delicate emphasis)
- `--font-weight-light`: 300 (subtle text)
- `--font-weight-regular`: 400 (standard text)
- `--font-weight-medium`: 500 (emphasized text)
- `--font-weight-semibold`: 600 (strong emphasis)
- `--font-weight-bold`: 700 (high emphasis)
- `--font-weight-extrabold`: 800 (maximum impact)
- `--font-weight-black`: 900 (strongest weight)

#### Semantic Typography Tokens
- **Display Typography**: `--typography-display-1/2/3-*` for hero content
- **Heading Hierarchy**: `--typography-h1/h2/h3/h4/h5/h6-*` for structured content
- **Body Text**: `--typography-body-large/body/body-small-*` for readable content
- **UI Labels**: `--typography-label-large/label/label-small-*` for interface text
- **Specialized**: `--typography-code/caption/overline-*` for specific use cases

#### Advanced Typography Features
- **Text Rendering**: Optimized for legibility and performance
- **Font Features**: Ligatures, kerning, and OpenType features
- **Reading Widths**: Optimal line lengths (45ch, 65ch, 85ch)
- **Text Shadows**: Multiple levels for depth and emphasis
- **Responsive Utilities**: Mobile and desktop-specific typography

### Spacing System

Based on 4px grid system:
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-4`: 16px
- `--space-8`: 32px
- etc.

### Border Radius
- `--radius-sm`: 2px
- `--radius-base`: 4px
- `--radius-md`: 6px
- `--radius-lg`: 8px
- `--radius-xl`: 12px
- `--radius-full`: 9999px

### Shadows (Elevation System)
- `--shadow-xs` to `--shadow-2xl`
- `--shadow-primary`: Colored shadow for primary elements
- `--shadow-secondary`: Colored shadow for secondary elements

### Animation System
- `--duration-fast`: 150ms
- `--duration-normal`: 250ms
- `--duration-slow`: 350ms
- `--ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1)
- `--ease-bounce`: cubic-bezier(0.68, -0.55, 0.265, 1.55)

## Theme Support

### Dark Mode (Default)
The design system defaults to dark mode with:
- Dark surface colors (neutral-925 base)
- Light text colors (neutral-50 primary)
- WCAG AA compliant contrast ratios (4.5:1+)
- Enhanced color depth and hierarchy

### Light Mode
Activated with `data-theme="light"` on the root element:
- Light surface colors (neutral-0 base)
- Dark text colors (neutral-900 primary)
- Maintained WCAG AA compliance
- Optimized for daylight viewing

### High Contrast Modes
- `data-theme="high-contrast"`: Light high contrast
- `data-theme="dark-high-contrast"`: Dark high contrast
- Maximum contrast ratios for accessibility
- Simplified color palette for clarity

### Enhanced Theme Toggle
The `ThemeToggle` component now supports multiple themes:
```tsx
import ThemeToggle from './components/ThemeToggle';
// Supports: light, dark, high-contrast, dark-high-contrast
// Auto-detects system preferences and saves user choice
```

### Automatic Theme Detection
- Respects `prefers-color-scheme` media query
- Detects `prefers-contrast: high` for accessibility
- Persists user selection in localStorage
- Smooth transitions between themes

## Utility Classes

### Typography
- `.text-xs` to `.text-6xl`: Font sizes
- `.font-light` to `.font-bold`: Font weights
- `.leading-tight` to `.leading-loose`: Line heights
- `.tracking-tight` to `.tracking-widest`: Letter spacing

### Colors
- `.text-primary`, `.text-secondary`: Text colors
- `.bg-surface`, `.bg-primary`: Background colors

### Spacing
- `.p-0` to `.p-12`: Padding utilities
- `.m-0` to `.m-12`: Margin utilities

### Border Radius
- `.rounded-none` to `.rounded-full`: Border radius utilities

### Shadows
- `.shadow-xs` to `.shadow-2xl`: Box shadow utilities

## Component Tokens

### Buttons
- `--button-height-sm/md/lg`: Button heights
- `--button-padding-x-sm/md/lg`: Button padding
- `--button-border-radius`: Button border radius

### Inputs
- `--input-height`: Input field height
- `--input-padding-x`: Input padding
- `--input-border-radius`: Input border radius

### Cards
- `--card-padding`: Card internal padding
- `--card-border-radius`: Card border radius

## Usage Examples

### Using Design Tokens
```css
.custom-component {
  background: var(--color-surface-container);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-in-out);
}
```

### Using Utility Classes
```tsx
<div className="bg-surface-container p-4 rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-on-surface">Title</h2>
  <p className="text-base text-on-surface-variant">Description</p>
</div>
```

## Accessibility

### Contrast Ratios & Accessibility
- **WCAG 2.1 AA Compliance**: All text combinations meet 4.5:1 minimum
- **WCAG 2.1 AAA Support**: Many combinations exceed 7:1 for enhanced readability
- **Large Text Optimization**: 3:1 minimum for 18pt+ or 14pt+ bold text
- **High Contrast Modes**: Maximum contrast for users with visual impairments
- **Color Blindness Support**: Tested with deuteranopia, protanopia, and tritanopia
- **Automated Testing**: Built-in accessibility testing utilities

### Reduced Motion
- Respects `prefers-reduced-motion: reduce`
- Provides fallbacks for animations

### Focus Management
- Visible focus indicators
- Keyboard navigation support
- Proper focus trap patterns

## Browser Support

- Modern browsers supporting CSS custom properties
- Fallbacks for older browsers where needed
- Progressive enhancement approach

## Migration Guide

### From Hardcoded Values
1. Replace hardcoded colors with semantic tokens
2. Replace hardcoded spacing with space scale
3. Replace hardcoded font sizes with fluid typography
4. Replace hardcoded shadows with elevation system

### Example Migration
```css
/* Before */
.card {
  background: rgba(45, 48, 55, 0.8);
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* After */
.card {
  background: var(--color-surface-container);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--shadow-md);
}
```

## Performance

- CSS custom properties enable efficient theme switching
- Utility classes reduce CSS bundle size
- Optimized for CSS containment and layer support
- Minimal runtime overhead

## Future Enhancements

- Container queries support
- CSS layers implementation
- Additional color schemes
- Extended component library
- Design token automation tools
