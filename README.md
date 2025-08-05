## AWS Amplify React+Vite Portfolio

This repository provides a starter template for creating applications using React+Vite and AWS Amplify, emphasizing easy setup for authentication, API, and database capabilities.

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.
- **Modern Design System**: Comprehensive CSS design tokens following Material Design 3 and Apple HIG principles
- **Typography System**: Fluid, responsive typography with WCAG AA compliance
- **Component Library**: Standardized, accessible React components
- **Performance Optimized**: Vite build system with code splitting and optimized bundles
- **TypeScript**: Full TypeScript support for type safety and better developer experience

## Project Structure

```
src/
├── components/          # React components
│   ├── DevelopmentSection.tsx
│   └── TypographyShowcase.tsx
├── styles/             # Design system and styling
│   ├── design-system.css
│   ├── hero.css
│   ├── contact-form.css
│   ├── loading.css
│   └── README.md       # Design system documentation
├── utils/              # Utility functions
│   └── typographyTesting.ts
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- AWS CLI configured with appropriate permissions
- Git for version control

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd amplify-vite-react-template

# Install dependencies
npm install

# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify CLI
amplify configure
```

### Local Development

```bash
# Start the development server
npm run dev

# Run TypeScript checks
npm run build

# Run linting
npm run lint
```

### Backend Setup

#### Prerequisites for Amplify Gen2
- AWS CLI configured with appropriate permissions
- Node.js 18+ and npm installed
- Amplify project connected to your AWS account

#### Development Environment (Sandbox)
```bash
# Start a local development sandbox
npx ampx sandbox

# The sandbox will:
# - Deploy backend resources to AWS
# - Generate amplify_outputs.json for local development
# - Watch for changes and auto-deploy updates
# - Provide a local development environment
```

#### Production Deployment
```bash
# Connect your repository to Amplify Hosting (one-time setup)
# Visit AWS Amplify Console and connect your Git repository

# Deploy to production branch
npx ampx pipeline-deploy --branch main --app-id YOUR_APP_ID

# For other branches
npx ampx pipeline-deploy --branch staging --app-id YOUR_APP_ID
```

#### Managing Your Backend
```bash
# Generate outputs file (amplify_outputs.json)
npx ampx generate outputs

# Generate GraphQL client code
npx ampx generate graphql-client-code

# Remove sandbox resources (cleanup)
npx ampx sandbox delete

# View backend configuration
npx ampx configure list
```

#### Environment Management
```bash
# List all environments
npx ampx configure list

# Switch between environments
npx ampx configure profile

# Deploy to specific environment
npx ampx pipeline-deploy --branch production --app-id YOUR_APP_ID
```

**Note**: Amplify Gen2 uses TypeScript-based configuration files (`amplify/backend.ts`, `amplify/data/resource.ts`) instead of the legacy CLI approach. Your backend resources are already configured and ready for deployment.

For detailed Gen2 documentation, visit: https://docs.amplify.aws/react/how-amplify-works/concepts/

## Design System

This project includes a comprehensive design system with:

- **Color System**: Primary, secondary, tertiary, and semantic color scales (50-950)
- **Typography**: Fluid typography system with 9 font sizes and complete weight range
- **Spacing**: 4px-based spacing system for consistent layouts
- **Components**: Standardized button, input, and card sizing following Apple HIG
- **Themes**: Dark mode (default), light mode, and high contrast variants
- **Accessibility**: WCAG 2.1 AA compliant with enhanced contrast options

See `src/styles/README.md` for detailed design system documentation.

## Component Standards

### Sizing System
All components follow Apple Human Interface Guidelines:
- **Touch Targets**: Minimum 44px for accessibility
- **Button Heights**: 28px (xs) to 56px (xl)
- **Input Fields**: Consistent heights and padding
- **Typography**: Fluid scaling across all breakpoints

### Centering System
Responsive centering with consistent margins:
- **Mobile**: 16px side margins
- **Tablet**: 32px side margins
- **Desktop**: 48px+ side margins
- **Container Classes**: `.container`, `.container-md`, `.container-sm`

## Deployment

### Deploy to AWS Amplify Hosting

```bash
# Add hosting to your project
amplify add hosting

# Deploy frontend and backend
amplify publish

# For continuous deployment, connect your Git repository
amplify console
```

### Build Configuration

The project includes optimized build settings in `amplify.yml`:
- Efficient caching strategies
- Code splitting for vendor and AWS libraries
- Production-ready security headers
- Optimized bundle sizes

### Environment Variables

Configure environment-specific settings:
```bash
# Add production environment
amplify env add prod

# Configure project settings
amplify configure project
```

## Performance Features

- **Code Splitting**: Vendor and AWS libraries separated
- **Bundle Optimization**: Manual chunks for optimal loading
- **Caching**: Aggressive caching for dependencies
- **Tree Shaking**: Unused code elimination
- **Modern Build Target**: ES2015+ for smaller bundles

## Accessibility

- **WCAG 2.1 AA Compliance**: All color combinations meet contrast requirements
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Reduced Motion**: Respects user motion preferences
- **High Contrast Modes**: Enhanced accessibility options

## Browser Support

- Modern browsers supporting CSS custom properties
- Progressive enhancement for older browsers
- Responsive design for all device sizes
- Touch-friendly interface for mobile devices

## Development Tools

- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Vite**: Fast development and optimized builds
- **React Icons**: Comprehensive icon library
- **Design Tokens**: CSS custom properties for theming

## Testing

Typography and design system testing utilities:
```typescript
import { runTypographyTests } from './src/utils/typographyTesting';

// Run in browser console
runTypographyTests();
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
