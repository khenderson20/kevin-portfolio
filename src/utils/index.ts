// Barrel exports for utilities
// Provides clean import interface for all utility functions

export { animations, animationConfig } from './animations';
export {
  TYPOGRAPHY_RATIOS,
  READING_STANDARDS,
  testTypographyScale,
  testReadingComfort,
  analyzeTypographyHierarchy,
  generateTypographyReport,
  runTypographyTests
} from './typographyTesting';

// Note: Type exports removed due to interface/type visibility issues
// Import types directly from typographyTesting.ts when needed
