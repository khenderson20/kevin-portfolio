import { ReactNode } from 'react';

interface UnifiedLoaderProps {
  isLoading?: boolean;
  loadingText?: string;
  sectionName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton' | 'dots';
  children?: ReactNode;
  className?: string;
}

/**
 * Unified Loader component that replaces SectionLoader and provides consistent loading states
 * Supports multiple variants and sizes for different use cases
 */
function UnifiedLoader({
  isLoading = true,
  loadingText,
  sectionName = "content",
  size = 'md',
  variant = 'spinner',
  children,
  className = ''
}: UnifiedLoaderProps) {
  
  if (!isLoading && children) {
    return <>{children}</>;
  }

  if (!isLoading) {
    return null;
  }

  const sizeClasses = {
    sm: 'min-h-[100px]',
    md: 'min-h-[200px]',
    lg: 'min-h-screen'
  };

  const spinnerSizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const displayText = loadingText || `Loading ${sectionName}...`;

  const renderSpinner = () => (
    <div className="loading-spinner mb-4">
      <div className={`${spinnerSizes[size]} border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto`}></div>
    </div>
  );

  const renderDots = () => (
    <div className="loading-dots flex justify-center space-x-1 mb-4">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  const renderSkeleton = () => (
    <div className="skeleton-container space-y-4 w-full max-w-md">
      <div className="skeleton-line h-4 bg-gray-300 rounded animate-pulse"></div>
      <div className="skeleton-line h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
      <div className="skeleton-line h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'skeleton':
        return renderSkeleton();
      case 'dots':
        return renderDots();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`section-loading flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <div className="loading-content text-center">
        {renderVariant()}
        
        {/* Loading text */}
        <div className="loading-text">
          <p className={`text-emerald-300 ${textSizes[size]} font-medium mb-2`}>
            {displayText}
          </p>
          {size !== 'sm' && (
            <p className="text-gray-400 text-sm">
              Please wait while we prepare your content
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Preset loader components for common use cases
export function SectionLoader({ sectionName = "section" }: { sectionName?: string }) {
  return <UnifiedLoader size="lg" sectionName={sectionName} />;
}

export function CardLoader({ className = "" }: { className?: string }) {
  return <UnifiedLoader size="md" variant="skeleton" className={className} />;
}

export function ButtonLoader({ className = "" }: { className?: string }) {
  return <UnifiedLoader size="sm" variant="dots" className={className} />;
}

export default UnifiedLoader;
