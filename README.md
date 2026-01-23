# Kevin Henderson's Portfolio
[![Netlify Status](https://api.netlify.com/api/v1/badges/2dcdc009-2001-4bb6-b5be-01629252c0c6/deploy-status)](https://app.netlify.com/projects/shiny-cocada-025f63/deploys)

A modern portfolio website built with React, TypeScript, and Vite, showcasing professional projects, technical expertise, and creative work.

## 🌟 Overview

This portfolio is a production-ready web application demonstrating enterprise-grade development practices, modern design patterns, and AWS cloud integration. It features a comprehensive design system, GraphQL API integration, and interactive user experiences with advanced animations.

## ✨ Key Features

| Feature Category | Technologies | Description | Documentation |
|-----------------|--------------|-------------|---------------|
| Frontend Framework | React 18, TypeScript, Vite | Modern React application with full type safety | [React Docs](https://react.dev) · [TypeScript](https://www.typescriptlang.org/docs/) · [Vite](https://vitejs.dev) |
| Deployment | Netlify | Static hosting + CI/CD | [Netlify Docs](https://docs.netlify.com/) |
| Styling System | CSS3, Tailwind CSS, Material Tailwind | Comprehensive design tokens and component library | [Design System](src/styles/README.md) · [Tailwind](https://tailwindcss.com/docs) |
| Animations | GSAP 3, ScrollTrigger | Smooth, performant animations and scroll effects | [GSAP Docs](https://greensock.com/docs/) |
| Data Integration | GitHub API, Custom Services | Live GitHub statistics and project fetching | [GitHub API](https://docs.github.com/en/rest) |
| UI Components | React Icons, Custom Components | 30+ reusable, accessible components | [React Icons](https://react-icons.github.io/react-icons/) |

## 📁 Project Structure

```bash
kevin-portfolio/
├── src/
│   ├── components/       # React components
│   ├── styles/          # Design system and styling
│   │   ├── design-system.css
│   │   └── README.md    # Design system documentation
│   ├── utils/           # Utility functions
│   └── main.tsx         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Installation Guide |
|------------|---------|-------------------|
| Node.js | 18+ | [Download Node.js](https://nodejs.org/) |
| npm | Latest | Included with Node.js |
| Git | Latest | [Install Git](https://git-scm.com/downloads) |

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kevin-portfolio.git
cd kevin-portfolio

# Install dependencies
npm install
```

### Local Development Commands

| Command | Description | Documentation |
|---------|-------------|---------------|
| `npm run dev` | Start development server | [Vite Dev Server](https://vitejs.dev/guide/) |
| `npm run build` | Build for production & run TypeScript checks | [Vite Build](https://vitejs.dev/guide/build.html) |
| `npm run lint` | Run ESLint code quality checks | [ESLint](https://eslint.org/docs/latest/) |
| `npm run preview` | Preview production build locally | [Vite Preview](https://vitejs.dev/guide/cli.html#vite-preview) |

## 🚀 Deployment (Netlify)

Build settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`

## 🎨 Design System

| Component | Features | Documentation |
|-----------|----------|---------------|
| Color System | Primary, secondary, tertiary scales (50-950) | [Design System](src/styles/README.md) |
| Typography | Fluid system with 9 font sizes | [Typography Guide](src/styles/README.md) |
| Spacing | 4px-based system for layouts | [Spacing](src/styles/README.md) |
| Components | Apple HIG compliant sizing | [Component Standards](src/styles/README.md) |
| Themes | Dark mode, light mode, high contrast | [Theming](src/styles/README.md) |
| Accessibility | WCAG 2.1 AA compliant | [A11y Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) |

See [Design System Documentation](src/styles/README.md) for complete details.

## 📱 Component Standards

### Sizing Reference

| Component Type | Sizes Available | Min Touch Target | Documentation |
|---------------|-----------------|------------------|---------------|
| Buttons | xs (28px) → xl (56px) | 44px | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Input Fields | sm (36px) → lg (48px) | 44px | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| Typography | xs → 4xl (fluid) | N/A | [Design System](src/styles/README.md) |
| Containers | sm, md, lg, xl, 2xl | N/A | [Design System](src/styles/README.md) |

### Responsive Breakpoints

| Breakpoint | Width | Side Margins | Container Classes |
|-----------|-------|--------------|-------------------|
| Mobile | < 640px | 16px | `.container-sm` |
| Tablet | 640px - 1024px | 32px | `.container-md` |
| Desktop | > 1024px | 48px+ | `.container`, `.container-lg` |

## 🚀 Deployment

### Quick Deploy Steps

| Step | Action | Guide |
|------|--------|-------|
| 1 | Create a new Netlify site from Git | [Netlify: Create a site](https://docs.netlify.com/site-deploys/create-deploys/) |
| 2 | Set build command and publish directory | [Build settings](https://docs.netlify.com/configure-builds/overview/) |
| 3 | Deploy on push to `main` | [Continuous deployment](https://docs.netlify.com/site-deploys/overview/#definitions) |

### Build Optimizations

| Optimization | Implementation | Impact |
|-------------|----------------|--------|
| Code Splitting | Vendor and AWS libraries separated | Faster initial load |
| Bundle Optimization | Manual chunks for optimal loading | Reduced bundle size |
| Caching | Aggressive dependency caching | Faster rebuilds |
| Tree Shaking | Unused code elimination | Smaller bundles |
| Modern Build | ES2015+ target | Better performance |

## ⚡ Performance Features

| Feature | Technology | Benefit | Documentation |
|---------|-----------|---------|---------------|
| Code Splitting | Vite | Faster page loads | [Vite Code Splitting](https://vitejs.dev/guide/features.html#code-splitting) |
| Lazy Loading | React.lazy | Reduced initial bundle | [React Lazy](https://react.dev/reference/react/lazy) |
| Image Optimization | Modern formats | Faster media loading | [Web.dev Guide](https://web.dev/fast/#optimize-your-images) |
| Caching Strategy | Service Workers | Offline support | [PWA Guide](https://web.dev/progressive-web-apps/) |

## ♿ Accessibility

| Feature | Standard | Implementation | Testing |
|---------|----------|----------------|---------|
| Color Contrast | WCAG 2.1 AA | All color combinations tested | [Contrast Checker](https://webaim.org/resources/contrastchecker/) |
| Keyboard Navigation | Full support | Focus management & tab order | [Keyboard Testing](https://webaim.org/articles/keyboard/) |
| Screen Readers | ARIA labels | Semantic HTML & landmarks | [ARIA Guide](https://www.w3.org/WAI/ARIA/apg/) |
| Reduced Motion | Prefers-reduced-motion | Animation controls | [Motion Preferences](https://web.dev/prefers-reduced-motion/) |
| High Contrast | Custom themes | Enhanced visibility modes | [Design System](src/styles/README.md) |

## 🌐 Browser Support

| Browser | Minimum Version | Features |
|---------|----------------|----------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |

**Requirements**: CSS custom properties, ES2015+, Flexbox, Grid

## 🛠️ Development Tools

| Tool | Purpose | Configuration | Documentation |
|------|---------|---------------|---------------|
| TypeScript | Type safety | `tsconfig.json` | [TS Docs](https://www.typescriptlang.org/docs/) |
| ESLint | Code quality | `.eslintrc` | [ESLint](https://eslint.org/docs/latest/) |
| Vite | Build tool | `vite.config.ts` | [Vite](https://vitejs.dev/config/) |
| React Icons | Icon library | Import as needed | [React Icons](https://react-icons.github.io/react-icons/) |
| GSAP | Animations | `gsap.config()` | [GSAP](https://greensock.com/docs/) |

## 📚 Additional Resources

| Resource | Description | Link |
|----------|-------------|------|
| Design System | Internal design tokens & guidelines | [Design System](src/styles/README.md) |
| React Best Practices | Official React documentation | [React Docs](https://react.dev) |
| TypeScript Handbook | TypeScript language guide | [TS Handbook](https://www.typescriptlang.org/docs/handbook/) |
| Accessibility Guidelines | WCAG 2.1 quick reference | [WCAG](https://www.w3.org/WAI/WCAG21/quickref/) |

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Built with** ❤️ **by Kevin Henderson**
