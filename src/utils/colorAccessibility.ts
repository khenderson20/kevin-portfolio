/**
 * Color Accessibility Utilities
 * Provides functions to test and validate color contrast ratios
 * according to WCAG 2.1 guidelines
 */

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h * 6) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0;
  } else if (1/6 <= h && h < 1/3) {
    r = x; g = c; b = 0;
  } else if (1/3 <= h && h < 1/2) {
    r = 0; g = c; b = x;
  } else if (1/2 <= h && h < 2/3) {
    r = 0; g = x; b = c;
  } else if (2/3 <= h && h < 5/6) {
    r = x; g = 0; b = c;
  } else if (5/6 <= h && h < 1) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Parse HSL colors (assuming format: hsl(h, s%, l%))
  const parseHSL = (hsl: string): [number, number, number] => {
    const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) throw new Error(`Invalid HSL format: ${hsl}`);
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
  };

  const [h1, s1, l1] = parseHSL(color1);
  const [h2, s2, l2] = parseHSL(color2);

  const [r1, g1, b1] = hslToRgb(h1, s1, l1);
  const [r2, g2, b2] = hslToRgb(h2, s2, l2);

  const lum1 = getRelativeLuminance(r1, g1, b1);
  const lum2 = getRelativeLuminance(r2, g2, b2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function meetsWCAGStandard(
  contrastRatio: number,
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean {
  const thresholds = {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 }
  };

  return contrastRatio >= thresholds[level][size];
}

/**
 * Test color combinations for accessibility
 */
export function testColorCombination(
  foreground: string,
  background: string
): {
  contrastRatio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  meetsAALarge: boolean;
  meetsAAALarge: boolean;
  grade: 'AAA' | 'AA' | 'AA Large' | 'Fail';
} {
  const ratio = getContrastRatio(foreground, background);
  
  const meetsAA = meetsWCAGStandard(ratio, 'AA', 'normal');
  const meetsAAA = meetsWCAGStandard(ratio, 'AAA', 'normal');
  const meetsAALarge = meetsWCAGStandard(ratio, 'AA', 'large');
  const meetsAAALarge = meetsWCAGStandard(ratio, 'AAA', 'large');

  let grade: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  if (meetsAAA) {
    grade = 'AAA';
  } else if (meetsAA) {
    grade = 'AA';
  } else if (meetsAALarge) {
    grade = 'AA Large';
  } else {
    grade = 'Fail';
  }

  return {
    contrastRatio: Math.round(ratio * 100) / 100,
    meetsAA,
    meetsAAA,
    meetsAALarge,
    meetsAAALarge,
    grade
  };
}

/**
 * Design system color combinations to test
 */
export const colorCombinations = [
  // Dark mode combinations
  { name: 'Dark: Text on Surface', fg: 'hsl(210, 20%, 96%)', bg: 'hsl(210, 24%, 7%)' },
  { name: 'Dark: Text Variant on Surface', fg: 'hsl(210, 14%, 78%)', bg: 'hsl(210, 24%, 7%)' },
  { name: 'Dark: Primary on Surface', fg: 'hsl(186, 85%, 65%)', bg: 'hsl(210, 24%, 7%)' },
  { name: 'Dark: Secondary on Surface', fg: 'hsl(310, 75%, 65%)', bg: 'hsl(210, 24%, 7%)' },
  { name: 'Dark: Text on Primary', fg: 'hsl(210, 22%, 9%)', bg: 'hsl(186, 85%, 65%)' },
  { name: 'Dark: Text on Secondary', fg: 'hsl(210, 22%, 9%)', bg: 'hsl(310, 75%, 65%)' },
  
  // Light mode combinations
  { name: 'Light: Text on Surface', fg: 'hsl(210, 22%, 9%)', bg: 'hsl(0, 0%, 100%)' },
  { name: 'Light: Text Variant on Surface', fg: 'hsl(210, 12%, 32%)', bg: 'hsl(0, 0%, 100%)' },
  { name: 'Light: Primary on Surface', fg: 'hsl(186, 85%, 43%)', bg: 'hsl(0, 0%, 100%)' },
  { name: 'Light: Secondary on Surface', fg: 'hsl(310, 75%, 43%)', bg: 'hsl(0, 0%, 100%)' },
  { name: 'Light: Text on Primary', fg: 'hsl(0, 0%, 100%)', bg: 'hsl(186, 85%, 43%)' },
  { name: 'Light: Text on Secondary', fg: 'hsl(0, 0%, 100%)', bg: 'hsl(310, 75%, 43%)' },
  
  // State colors
  { name: 'Success on Container', fg: 'hsl(138, 76%, 7%)', bg: 'hsl(138, 76%, 94%)' },
  { name: 'Warning on Container', fg: 'hsl(48, 96%, 13%)', bg: 'hsl(48, 96%, 94%)' },
  { name: 'Error on Container', fg: 'hsl(0, 86%, 19%)', bg: 'hsl(0, 86%, 94%)' },
  { name: 'Info on Container', fg: 'hsl(214, 100%, 19%)', bg: 'hsl(214, 100%, 94%)' },
];

/**
 * Run accessibility tests on all color combinations
 */
export function runAccessibilityTests(): void {
  // console.group('🎨 Color Accessibility Test Results');
  // colorCombinations.forEach(({ name, fg, bg }) => {
  //   const result = testColorCombination(fg, bg);
  //   const status = result.grade === 'Fail' ? '❌' : '✅';
  //   // console.log removed
  //     `${status} ${name}: ${result.contrastRatio}:1 (${result.grade})}`;
  // });
  // console.groupEnd();
}

/**
 * Generate color palette documentation
 */
export function generateColorDocs(): string {
  return `
# Color Accessibility Report

## WCAG 2.1 Compliance Summary

${colorCombinations.map(({ name, fg, bg }) => {
  const result = testColorCombination(fg, bg);
  return `- **${name}**: ${result.contrastRatio}:1 (${result.grade})`;
}).join('\n')}

## Standards Reference

- **WCAG AA**: 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA**: 7:1 for normal text, 4.5:1 for large text
- **Large text**: 18pt+ or 14pt+ bold

## Color Usage Guidelines

1. Always test color combinations before implementation
2. Provide alternative indicators beyond color alone
3. Ensure sufficient contrast for all interactive elements
4. Test with color blindness simulators
5. Validate with actual users when possible
`;
}
