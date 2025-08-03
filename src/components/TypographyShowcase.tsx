

interface TypographyShowcaseProps {
  className?: string;
}

function TypographyShowcase({ className = '' }: TypographyShowcaseProps) {
  return (
    <div className={`typography-showcase ${className}`}>
      <div className="showcase-section">
        <h2 className="typography-h2">Typography System Showcase</h2>
        <p className="typography-body-large">
          This showcase demonstrates the comprehensive typography system with semantic tokens,
          fluid scaling, and accessibility optimizations.
        </p>
      </div>

      {/* Display Typography */}
      <div className="showcase-section">
        <h3 className="typography-h3">Display Typography</h3>
        <div className="typography-examples">
          <h1 className="typography-display-1">Display 1 - Hero Headlines</h1>
          <h2 className="typography-display-2">Display 2 - Section Headers</h2>
          <h3 className="typography-display-3">Display 3 - Feature Titles</h3>
        </div>
      </div>

      {/* Heading Hierarchy */}
      <div className="showcase-section">
        <h3 className="typography-h3">Heading Hierarchy</h3>
        <div className="typography-examples">
          <h1 className="typography-h1">Heading 1 - Main Page Title</h1>
          <h2 className="typography-h2">Heading 2 - Section Title</h2>
          <h3 className="typography-h3">Heading 3 - Subsection Title</h3>
          <h4 className="typography-h4">Heading 4 - Component Title</h4>
          <h5 className="typography-h5">Heading 5 - Small Section</h5>
          <h6 className="typography-h6">Heading 6 - Minor Heading</h6>
        </div>
      </div>

      {/* Body Text */}
      <div className="showcase-section">
        <h3 className="typography-h3">Body Text</h3>
        <div className="typography-examples">
          <p className="typography-body-large">
            Large body text for introductory paragraphs and important content.
            This text size provides excellent readability for key information.
          </p>
          <p className="typography-body">
            Regular body text for standard content. This is the most commonly used
            text style throughout the application, optimized for comfortable reading
            with proper line height and letter spacing.
          </p>
          <p className="typography-body-small">
            Small body text for secondary information, captions, and supplementary content.
            Still maintains readability while conserving space.
          </p>
        </div>
      </div>

      {/* Labels and UI Text */}
      <div className="showcase-section">
        <h3 className="typography-h3">Labels & UI Text</h3>
        <div className="typography-examples">
          <div className="typography-label-large">Large Label - Form Headers</div>
          <div className="typography-label">Standard Label - Form Fields</div>
          <div className="typography-label-small">Small Label - Helper Text</div>
          <div className="typography-caption">Caption text for images and supplementary information</div>
          <div className="typography-overline">Overline Text - Categories</div>
        </div>
      </div>

      {/* Code and Technical Text */}
      <div className="showcase-section">
        <h3 className="typography-h3">Code & Technical</h3>
        <div className="typography-examples">
          <p className="typography-body">
            Inline code example: <code className="typography-code">const example = 'hello world';</code>
          </p>
          <pre className="typography-code code-block">
{`function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`}
          </pre>
        </div>
      </div>

      {/* Font Weights */}
      <div className="showcase-section">
        <h3 className="typography-h3">Font Weight Scale</h3>
        <div className="typography-examples">
          <p className="typography-body font-thin">Thin (100) - Minimal presence</p>
          <p className="typography-body font-extralight">Extra Light (200) - Delicate emphasis</p>
          <p className="typography-body font-light">Light (300) - Subtle text</p>
          <p className="typography-body font-regular">Regular (400) - Standard text</p>
          <p className="typography-body font-medium">Medium (500) - Emphasized text</p>
          <p className="typography-body font-semibold">Semibold (600) - Strong emphasis</p>
          <p className="typography-body font-bold">Bold (700) - High emphasis</p>
          <p className="typography-body font-extrabold">Extra Bold (800) - Maximum impact</p>
          <p className="typography-body font-black">Black (900) - Strongest weight</p>
        </div>
      </div>

      {/* Text Features */}
      <div className="showcase-section">
        <h3 className="typography-h3">Text Features</h3>
        <div className="typography-examples">
          <p className="typography-body">
            <span className="underline">Underlined text</span> with proper offset and thickness.
          </p>
          <p className="typography-body">
            <span className="line-through">Strikethrough text</span> for deleted content.
          </p>
          <p className="typography-body uppercase tracking-wider">
            Uppercase text with wide letter spacing
          </p>
          <p className="typography-body font-variant-numeric-tabular-nums">
            Tabular numbers: 1234567890
          </p>
          <p className="typography-body text-shadow-lg">
            Text with shadow for emphasis
          </p>
        </div>
      </div>

      {/* Reading Widths */}
      <div className="showcase-section">
        <h3 className="typography-h3">Optimal Reading Widths</h3>
        <div className="typography-examples">
          <div className="max-w-reading-narrow">
            <p className="typography-body">
              Narrow reading width (45ch) - Perfect for short content, captions, and sidebar text.
              This width ensures quick scanning and easy comprehension.
            </p>
          </div>
          <div className="max-w-reading">
            <p className="typography-body">
              Standard reading width (65ch) - Optimal for most body text content. This width
              provides the best balance between reading speed and comprehension, following
              established typography principles for comfortable reading experiences.
            </p>
          </div>
          <div className="max-w-reading-wide">
            <p className="typography-body">
              Wide reading width (85ch) - Suitable for technical documentation, detailed
              explanations, and content where maximum information density is desired while
              still maintaining reasonable readability standards.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Typography */}
      <div className="showcase-section">
        <h3 className="typography-h3">Responsive Behavior</h3>
        <div className="typography-examples">
          <p className="typography-body">
            All typography uses fluid scaling with <code className="typography-code">clamp()</code> functions
            to ensure optimal readability across all device sizes. Text automatically adjusts
            between minimum and maximum sizes based on viewport width.
          </p>
          <div className="mobile:text-center desktop:text-left">
            <p className="typography-body">
              This text is centered on mobile and left-aligned on desktop,
              demonstrating responsive typography utilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypographyShowcase;
