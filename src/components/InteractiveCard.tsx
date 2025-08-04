import { useState, useRef, ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  glowEffect?: boolean;
  tiltEffect?: boolean;
  scaleOnHover?: boolean;
  shadowIntensity?: 'low' | 'medium' | 'high';
  borderGlow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function InteractiveCard({
  children,
  className = '',
  glowEffect = true,
  tiltEffect = true,
  scaleOnHover = true,
  shadowIntensity = 'medium',
  borderGlow = false,
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

  // Calculate glow position
  const getGlowStyle = () => {
    if (!glowEffect || (!isHovered && !isFocused) || disabled) return {};

    return {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(var(--color-primary-rgb), 0.1) 0%, 
        transparent 50%)`,
    };
  };

  // Get shadow intensity class
  const getShadowClass = () => {
    const baseClass = 'interactive-card';
    const intensityClass = `shadow-${shadowIntensity}`;
    const stateClass = isHovered || isFocused ? 'elevated' : '';
    
    return `${baseClass} ${intensityClass} ${stateClass}`;
  };

  const isInteractive = !!onClick;

  return (
    <div
      ref={cardRef}
      className={`${getShadowClass()} ${className} ${disabled ? 'disabled' : ''} ${
        borderGlow && (isHovered || isFocused) ? 'border-glow' : ''
      }`}
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
      {/* Glow overlay */}
      {glowEffect && (
        <div 
          className="card-glow-overlay"
          style={getGlowStyle()}
          aria-hidden="true"
        />
      )}
      
      {/* Content */}
      <div className="card-content">
        {children}
      </div>
      
      {/* Shine effect on hover */}
      {(isHovered || isFocused) && !disabled && (
        <div 
          className="card-shine"
          style={{
            background: `linear-gradient(135deg, 
              transparent 30%, 
              rgba(255, 255, 255, 0.1) 50%, 
              transparent 70%)`,
            transform: `translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default InteractiveCard;
