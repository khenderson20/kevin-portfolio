# Website Centering System Guide

This document outlines the comprehensive centering system implemented across the React portfolio website to ensure consistent content alignment and proper margins throughout all screen sizes.

## Overview

The centering system uses a combination of CSS Grid, Flexbox, and margin auto techniques to create a responsive, centered layout that works seamlessly across all device sizes while maintaining Apple HIG design principles.

## Core Centering Principles

### 1. **Container-Based Centering**
All content is wrapped in standardized containers that automatically center content and provide consistent margins.

### 2. **Responsive Margin System**
Margins scale appropriately across breakpoints:
- **Mobile (< 768px)**: 16px side margins
- **Tablet (768px - 1024px)**: 32px side margins  
- **Desktop (1024px - 1200px)**: 48px side margins
- **Large Desktop (> 1200px)**: 64px side margins

### 3. **Maximum Width Constraints**
Content is constrained to readable widths while maintaining center alignment.

## Container Classes

### Base Container
```css
.container {
  width: 100%;
  max-width: var(--container-max-width-lg); /* 1024px */
  margin: 0 auto;
  padding: 0 var(--space-4); /* 16px */
  box-sizing: border-box;
}
```

### Container Variants
```css
.container-sm    /* max-width: 640px */
.container-md    /* max-width: 768px */
.container-lg    /* max-width: 1024px */
.container-xl    /* max-width: 1280px */
.container-2xl   /* max-width: 1536px */
.container-fluid /* max-width: 100% */
```

## Layout Structure

### 1. **Portfolio Root**
```css
.portfolio {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  overflow-x: hidden;
}
```

### 2. **Main Content**
```css
.main-content {
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
```

### 3. **Page Sections**
```css
.page-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.page-section > * {
  width: 100%;
  max-width: var(--container-max-width-lg);
  margin: 0 auto;
  padding: 0 var(--space-4);
  box-sizing: border-box;
}
```

## Component-Specific Centering

### Hero Section
```css
.hero {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

.hero-content {
  max-width: var(--container-max-width-xl);
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
  box-sizing: border-box;
}
```

### Navigation
```css
.navbar {
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
```

### Contact Form
```css
.contact-form {
  width: 100%;
  max-width: var(--container-max-width-sm);
  margin: 0 auto;
  box-sizing: border-box;
}
```

## Responsive Behavior

### Mobile (< 768px)
- Content uses full width with 16px side padding
- Single column layouts
- Touch-friendly spacing

### Tablet (768px - 1024px)
- Content centered with 32px side padding
- Two-column layouts where appropriate
- Increased spacing for better readability

### Desktop (1024px - 1200px)
- Content centered with 48px side padding
- Multi-column layouts
- Optimal reading widths maintained

### Large Desktop (> 1200px)
- Content centered with 64px side padding
- Maximum content width constraints
- Generous spacing for premium feel

## Implementation Examples

### Basic Section
```jsx
<section className="page-section">
  <div className="container">
    <h2>Section Title</h2>
    <p>Section content automatically centered</p>
  </div>
</section>
```

### Custom Width Section
```jsx
<section className="page-section">
  <div className="container-md">
    <h2>Narrower Content</h2>
    <p>Content constrained to medium width</p>
  </div>
</section>
```

### Full Width with Centered Content
```jsx
<section className="page-section">
  <div className="container-fluid">
    <div className="container">
      <h2>Full Width Background, Centered Content</h2>
    </div>
  </div>
</section>
```

## Benefits

### 1. **Consistency**
- Uniform margins and spacing across all components
- Predictable layout behavior
- Professional appearance

### 2. **Responsiveness**
- Automatic adaptation to all screen sizes
- Optimal content width at every breakpoint
- Touch-friendly spacing on mobile

### 3. **Accessibility**
- Readable line lengths maintained
- Proper spacing for easy navigation
- Consistent focus areas

### 4. **Maintainability**
- Centralized container system
- Easy to update margins globally
- Consistent implementation patterns

## Usage Guidelines

### Do's
✅ Use container classes for all content sections
✅ Apply margin: 0 auto for custom centering needs
✅ Maintain consistent padding across breakpoints
✅ Use box-sizing: border-box for predictable sizing

### Don'ts
❌ Use fixed widths without max-width constraints
❌ Apply centering inconsistently across components
❌ Ignore responsive margin scaling
❌ Create horizontal overflow on mobile devices

## Testing Checklist

- [ ] Content centers properly on all screen sizes
- [ ] No horizontal scrollbars appear on any device
- [ ] Margins scale appropriately across breakpoints
- [ ] Touch targets remain accessible on mobile
- [ ] Content maintains readable widths on large screens
- [ ] All components follow consistent centering patterns

This centering system ensures a professional, consistent, and accessible layout that works seamlessly across all devices while maintaining the Apple HIG design principles.
