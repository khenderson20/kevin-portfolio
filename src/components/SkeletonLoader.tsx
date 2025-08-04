import { ReactNode } from 'react';

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
  children?: ReactNode;
  loading?: boolean;
}

function SkeletonLoader({
  width = '100%',
  height = '1em',
  borderRadius,
  className = '',
  variant = 'text',
  animation = 'pulse',
  lines = 1,
  children,
  loading = true
}: SkeletonLoaderProps) {
  
  if (!loading && children) {
    return <>{children}</>;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'text':
        return {
          height: '1em',
          borderRadius: '4px',
        };
      case 'rectangular':
        return {
          borderRadius: '4px',
        };
      case 'circular':
        return {
          borderRadius: '50%',
          width: height,
        };
      case 'rounded':
        return {
          borderRadius: '8px',
        };
      default:
        return {};
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'pulse':
        return 'skeleton-pulse';
      case 'wave':
        return 'skeleton-wave';
      case 'none':
        return '';
      default:
        return 'skeleton-pulse';
    }
  };

  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: borderRadius || getVariantStyles().borderRadius,
    ...getVariantStyles(),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`skeleton-text-container ${className}`}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={`skeleton ${getAnimationClass()}`}
            style={{
              ...skeletonStyle,
              width: index === lines - 1 ? '75%' : '100%',
              marginBottom: index < lines - 1 ? '0.5em' : 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`skeleton ${getAnimationClass()} ${className}`}
      style={skeletonStyle}
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard({ loading = true, children }: { loading?: boolean; children?: ReactNode }) {
  if (!loading && children) return <>{children}</>;
  
  return (
    <div className="skeleton-card">
      <SkeletonLoader variant="rectangular" height={200} className="skeleton-card-image" />
      <div className="skeleton-card-content">
        <SkeletonLoader variant="text" height="1.5em" width="80%" />
        <SkeletonLoader variant="text" lines={3} />
        <div className="skeleton-card-actions">
          <SkeletonLoader variant="rounded" height={36} width={100} />
          <SkeletonLoader variant="rounded" height={36} width={100} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 40, loading = true, children }: { 
  size?: number; 
  loading?: boolean; 
  children?: ReactNode;
}) {
  if (!loading && children) return <>{children}</>;
  
  return (
    <SkeletonLoader 
      variant="circular" 
      width={size} 
      height={size} 
    />
  );
}

export function SkeletonButton({ loading = true, children }: { loading?: boolean; children?: ReactNode }) {
  if (!loading && children) return <>{children}</>;
  
  return (
    <SkeletonLoader 
      variant="rounded" 
      height={40} 
      width={120} 
    />
  );
}

export function SkeletonProgressBar({ loading = true, children }: { loading?: boolean; children?: ReactNode }) {
  if (!loading && children) return <>{children}</>;
  
  return (
    <div className="skeleton-progress-container">
      <div className="skeleton-progress-header">
        <SkeletonLoader variant="text" width="60%" height="1.2em" />
        <SkeletonLoader variant="text" width="30%" height="1em" />
      </div>
      <SkeletonLoader variant="rounded" height={8} width="100%" />
    </div>
  );
}

export default SkeletonLoader;
