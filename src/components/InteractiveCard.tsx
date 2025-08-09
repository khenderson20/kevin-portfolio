import { useState, useRef, ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  tiltEffect?: boolean;
  scaleOnHover?: boolean;
  shadowIntensity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
  disabled?: boolean;
}

function InteractiveCard({
  children,
  className = '',
  tiltEffect = true,
  scaleOnHover = true,
  shadowIntensity = 'medium',
  onClick,
  disabled = false
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || disabled) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Calculate tilt based on mouse position
  const getTiltStyle = () => {
    if (!tiltEffect || !isHovered || disabled) return {};

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return {};

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (mousePosition.y - centerY) / centerY * -10; // Max 10 degrees
    const tiltY = (mousePosition.x - centerX) / centerX * 10;

    return {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${
        scaleOnHover ? 'scale(1.02)' : ''
      }`,
    };
  };

  // Get shadow and styling classes using Tailwind
  const getCardClasses = () => {
    const baseClasses = 'relative overflow-hidden rounded-lg';

    // Shadow intensity mapping to Tailwind classes
    const shadowClasses = {
      low: 'shadow-sm hover:shadow-md',
      medium: 'shadow-md hover:shadow-lg',
      high: 'shadow-lg hover:shadow-xl'
    };

    const shadowClass = shadowClasses[shadowIntensity];
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const hoverClass = !disabled && (isHovered || isFocused) ? 'shadow-2xl' : '';

    return `${baseClasses} ${shadowClass} ${disabledClass} ${hoverClass}`;
  };

  const isInteractive = !!onClick;

  return (
    <div
      ref={cardRef}
      className={`${getCardClasses()} ${className}`}
      style={getTiltStyle()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={isInteractive ? handleFocus : undefined}
      onBlur={isInteractive ? handleBlur : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      aria-disabled={disabled}
    >
      {/* Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Subtle shine effect on hover */}
      {(isHovered || isFocused) && !disabled && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(135deg,
              transparent 30%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 70%)`,
            transform: `translateX(${mousePosition.x * 0.05}px) translateY(${mousePosition.y * 0.05}px)`
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default InteractiveCard;

