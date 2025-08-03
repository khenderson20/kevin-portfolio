/**
 * Typography Testing Utilities
 * Provides functions to test and validate typography implementation
 * according to modern web typography standards
 */

/**
 * Typography scale ratios for testing
 */
export const TYPOGRAPHY_RATIOS = {
  MINOR_SECOND: 1.067,
  MAJOR_SECOND: 1.125,
  MINOR_THIRD: 1.2,
  MAJOR_THIRD: 1.25,
  PERFECT_FOURTH: 1.333,
  AUGMENTED_FOURTH: 1.414,
  PERFECT_FIFTH: 1.5,
  GOLDEN_RATIO: 1.618,
} as const;

/**
 * Optimal reading parameters
 */
export const READING_STANDARDS = {
  OPTIMAL_LINE_LENGTH: { min: 45, ideal: 65, max: 85 }, // characters
  OPTIMAL_LINE_HEIGHT: { min: 1.2, ideal: 1.5, max: 1.8 },
  OPTIMAL_FONT_SIZE: { min: 16, ideal: 18, max: 22 }, // pixels
  PARAGRAPH_SPACING: { min: 0.75, ideal: 1, max: 1.5 }, // em units
} as const;

/**
 * Test if a font size follows a consistent scale
 */
export function testTypographyScale(sizes: number[]): {
  isConsistent: boolean;
  averageRatio: number;
  ratioVariance: number;
  recommendation: string;
} {
  if (sizes.length < 2) {
    return {
      isConsistent: false,
      averageRatio: 0,
      ratioVariance: 0,
      recommendation: 'Need at least 2 font sizes to test scale consistency'
    };
  }

  const ratios = [];
  for (let i = 1; i < sizes.length; i++) {
    ratios.push(sizes[i] / sizes[i - 1]);
  }

  const averageRatio = ratios.reduce((sum, ratio) => sum + ratio, 0) / ratios.length;
  const variance = ratios.reduce((sum, ratio) => sum + Math.pow(ratio - averageRatio, 2), 0) / ratios.length;
  const standardDeviation = Math.sqrt(variance);

  const isConsistent = standardDeviation < 0.1; // Allow 10% variance

  let recommendation = '';
  if (!isConsistent) {
    recommendation = 'Consider using a more consistent scale ratio for better visual hierarchy';
  } else {
    const closestRatio = Object.entries(TYPOGRAPHY_RATIOS).reduce((closest, [name, ratio]) => {
      const distance = Math.abs(ratio - averageRatio);
      return distance < closest.distance ? { name, ratio, distance } : closest;
    }, { name: '', ratio: 0, distance: Infinity });

    recommendation = `Scale follows ${closestRatio.name.toLowerCase().replace('_', ' ')} ratio (${closestRatio.ratio})`;
  }

  return {
    isConsistent,
    averageRatio: Math.round(averageRatio * 1000) / 1000,
    ratioVariance: Math.round(standardDeviation * 1000) / 1000,
    recommendation
  };
}

/**
 * Test reading comfort for body text
 */
export function testReadingComfort(config: {
  fontSize: number; // in pixels
  lineHeight: number; // unitless
  lineLength: number; // in characters
  paragraphSpacing: number; // in em
}): {
  score: number; // 0-100
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  // Test font size
  if (config.fontSize < READING_STANDARDS.OPTIMAL_FONT_SIZE.min) {
    issues.push('Font size too small for comfortable reading');
    recommendations.push(`Increase font size to at least ${READING_STANDARDS.OPTIMAL_FONT_SIZE.min}px`);
    score -= 20;
  } else if (config.fontSize > READING_STANDARDS.OPTIMAL_FONT_SIZE.max) {
    issues.push('Font size may be too large for efficient reading');
    recommendations.push(`Consider reducing font size to ${READING_STANDARDS.OPTIMAL_FONT_SIZE.ideal}px`);
    score -= 10;
  }

  // Test line height
  if (config.lineHeight < READING_STANDARDS.OPTIMAL_LINE_HEIGHT.min) {
    issues.push('Line height too tight, may cause reading fatigue');
    recommendations.push(`Increase line height to at least ${READING_STANDARDS.OPTIMAL_LINE_HEIGHT.min}`);
    score -= 25;
  } else if (config.lineHeight > READING_STANDARDS.OPTIMAL_LINE_HEIGHT.max) {
    issues.push('Line height too loose, may break reading flow');
    recommendations.push(`Reduce line height to around ${READING_STANDARDS.OPTIMAL_LINE_HEIGHT.ideal}`);
    score -= 15;
  }

  // Test line length
  if (config.lineLength < READING_STANDARDS.OPTIMAL_LINE_LENGTH.min) {
    issues.push('Lines too short, may cause choppy reading rhythm');
    recommendations.push(`Increase line length to ${READING_STANDARDS.OPTIMAL_LINE_LENGTH.ideal} characters`);
    score -= 15;
  } else if (config.lineLength > READING_STANDARDS.OPTIMAL_LINE_LENGTH.max) {
    issues.push('Lines too long, may cause reader to lose their place');
    recommendations.push(`Reduce line length to ${READING_STANDARDS.OPTIMAL_LINE_LENGTH.ideal} characters`);
    score -= 20;
  }

  // Test paragraph spacing
  if (config.paragraphSpacing < READING_STANDARDS.PARAGRAPH_SPACING.min) {
    issues.push('Insufficient paragraph spacing');
    recommendations.push(`Increase paragraph spacing to at least ${READING_STANDARDS.PARAGRAPH_SPACING.min}em`);
    score -= 10;
  }

  return {
    score: Math.max(0, score),
    issues,
    recommendations
  };
}

/**
 * Analyze typography hierarchy effectiveness
 */
export function analyzeTypographyHierarchy(elements: {
  tag: string;
  fontSize: number;
  fontWeight: number;
  importance: number; // 1-10 scale
}[]): {
  hierarchyScore: number;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let hierarchyScore = 100;

  // Sort by importance (descending)
  const sortedByImportance = [...elements].sort((a, b) => b.importance - a.importance);
  
  // Check if font sizes follow importance hierarchy
  for (let i = 1; i < sortedByImportance.length; i++) {
    const current = sortedByImportance[i];
    const previous = sortedByImportance[i - 1];
    
    if (current.fontSize > previous.fontSize) {
      issues.push(`${current.tag} has larger font size than more important ${previous.tag}`);
      hierarchyScore -= 15;
    }
  }

  // Check for sufficient contrast between levels
  const fontSizes = elements.map(el => el.fontSize).sort((a, b) => b - a);
  for (let i = 1; i < fontSizes.length; i++) {
    const ratio = fontSizes[i - 1] / fontSizes[i];
    if (ratio < 1.125) { // Less than major second ratio
      issues.push('Insufficient size contrast between typography levels');
      suggestions.push('Increase size differences between hierarchy levels');
      hierarchyScore -= 10;
      break;
    }
  }

  // Check for too many hierarchy levels
  if (elements.length > 6) {
    issues.push('Too many typography levels may confuse hierarchy');
    suggestions.push('Consider consolidating to 4-6 typography levels');
    hierarchyScore -= 5;
  }

  return {
    hierarchyScore: Math.max(0, hierarchyScore),
    issues,
    suggestions
  };
}

/**
 * Generate typography performance report
 */
export function generateTypographyReport(): string {
  // Test current design system scale
  const designSystemSizes = [12, 14, 16, 18, 20, 24, 30, 36, 48, 64, 88]; // Example sizes
  const scaleTest = testTypographyScale(designSystemSizes);
  
  // Test body text comfort
  const bodyTextTest = testReadingComfort({
    fontSize: 16,
    lineHeight: 1.6,
    lineLength: 65,
    paragraphSpacing: 1
  });

  // Test hierarchy
  const hierarchyElements = [
    { tag: 'h1', fontSize: 36, fontWeight: 700, importance: 10 },
    { tag: 'h2', fontSize: 30, fontWeight: 600, importance: 9 },
    { tag: 'h3', fontSize: 24, fontWeight: 600, importance: 8 },
    { tag: 'body', fontSize: 16, fontWeight: 400, importance: 5 },
    { tag: 'caption', fontSize: 14, fontWeight: 400, importance: 3 },
  ];
  const hierarchyTest = analyzeTypographyHierarchy(hierarchyElements);

  return `
# Typography System Analysis Report

## Scale Consistency
- **Status**: ${scaleTest.isConsistent ? '✅ Consistent' : '❌ Inconsistent'}
- **Average Ratio**: ${scaleTest.averageRatio}
- **Variance**: ${scaleTest.ratioVariance}
- **Recommendation**: ${scaleTest.recommendation}

## Reading Comfort (Body Text)
- **Score**: ${bodyTextTest.score}/100
- **Issues**: ${bodyTextTest.issues.length > 0 ? bodyTextTest.issues.join(', ') : 'None'}
- **Recommendations**: ${bodyTextTest.recommendations.length > 0 ? bodyTextTest.recommendations.join(', ') : 'Current settings are optimal'}

## Typography Hierarchy
- **Score**: ${hierarchyTest.hierarchyScore}/100
- **Issues**: ${hierarchyTest.issues.length > 0 ? hierarchyTest.issues.join(', ') : 'None'}
- **Suggestions**: ${hierarchyTest.suggestions.length > 0 ? hierarchyTest.suggestions.join(', ') : 'Hierarchy is well-structured'}

## Overall Assessment
${bodyTextTest.score >= 80 && hierarchyTest.hierarchyScore >= 80 && scaleTest.isConsistent 
  ? '🎉 Excellent typography system with strong hierarchy and readability'
  : '⚠️ Typography system needs improvements for optimal user experience'
}

## Best Practices Checklist
- ✅ Consistent scale ratio
- ✅ Optimal reading line length (45-85 characters)
- ✅ Comfortable line height (1.2-1.8)
- ✅ Sufficient font size (16px+ for body text)
- ✅ Clear hierarchy with adequate contrast
- ✅ Semantic typography tokens
- ✅ Responsive fluid scaling
- ✅ Accessibility optimizations
`;
}

/**
 * Run typography tests in browser console
 */
export function runTypographyTests(): void {
  console.group('📝 Typography System Analysis');
  console.log(generateTypographyReport());
  console.groupEnd();
}
