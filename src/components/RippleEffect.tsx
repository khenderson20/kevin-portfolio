import { useState, useEffect } from 'react';

interface RippleProps {
  x: number;
  y: number;
  size: number;
  color?: string;
  duration?: number;
}

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  disabled?: boolean;
  className?: string;
}

function Ripple({ x, y, size, color = 'rgba(255, 255, 255, 0.3)', duration = 600 }: RippleProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <span
      className="ripple"
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        transform: 'scale(0)',
        animation: `ripple-animation ${duration}ms ease-out`,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

function RippleEffect({ 
  children, 
  color = 'rgba(255, 255, 255, 0.3)', 
  duration = 600,
  disabled = false,
  className = ''
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<RippleProps[]>([]);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: RippleProps = {
      x,
      y,
      size,
      color,
      duration,
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, duration);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    addRipple(event);
  };

  return (
    <div
      className={`ripple-container ${className}`}
      onMouseDown={handleMouseDown}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        width: '100%',
      }}
    >
      {children}
      {ripples.map((ripple, index) => (
        <Ripple key={index} {...ripple} />
      ))}
    </div>
  );
}

export default RippleEffect;
