import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  // Added connection properties
  connectionChance: number; // Probability of forming connections
  maxConnections: number;   // Maximum connections this particle can have
  connectionDistance: number; // Distance at which connections can form
}

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function ParticleBackground({
  particleCount = 50,
  particleColor = 'rgba(255, 255, 255, 0.1)',
  particleSize = 2,
  speed = 0.5,
  interactive = true,
  className = '',
  style = {}
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * particleSize + 1,
        opacity: Math.random() * 0.5 + 0.1,
        life: Math.random() * 300,
        maxLife: 500 + Math.random() * 1000, // Longer life
        
        // Connection properties
        connectionChance: Math.random() * 0.6 + 0.3, // Increase from 0.1-0.4 to 0.3-0.9
        maxConnections: Math.floor(Math.random() * 3) + 1, // 1-3 connections
        connectionDistance: 80 + Math.random() * 40 // 80-120px connection range
      });
    }
    
    particlesRef.current = particles;
  };

  // Update particle positions
  const updateParticles = (width: number, height: number) => {
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Update life
      particle.life++;
      
      // Fade out as particle ages
      particle.opacity = Math.max(0, 1 - (particle.life / particle.maxLife));
      
      // Interactive mouse effect
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }
      }
      
      // Boundary wrapping
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
      
      // Reset particle if it's too old
      if (particle.life >= particle.maxLife) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = (Math.random() - 0.5) * speed;
        particle.vy = (Math.random() - 0.5) * speed;
        particle.life = 0;
        particle.opacity = Math.random() * 0.5 + 0.1;
      }
    });
  };

  // Draw particles
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw particles
    particlesRef.current.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    // Draw random connections
    if (interactive) {
      particlesRef.current.forEach((particle, i) => {
        let connectionCount = 0;
        
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          if (connectionCount >= particle.maxConnections) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Random connection logic
          const shouldConnect = distance < particle.connectionDistance && 
                               Math.random() < particle.connectionChance &&
                               Math.random() < otherParticle.connectionChance;
          
          if (shouldConnect) {
            ctx.save();
            // Vary connection opacity based on distance and particle life
            const lifeOpacity = (1 - particle.life / particle.maxLife) * 
                               (1 - otherParticle.life / otherParticle.maxLife);
            ctx.globalAlpha = (particle.connectionDistance - distance) / 
                             particle.connectionDistance * 0.6 * lifeOpacity; // Increase from 0.3 to 0.6
            // Create a gradient for the connection line
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, 
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, 'rgba(64, 224, 208, 0.8)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(1, 'rgba(64, 224, 208, 0.8)');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5 + Math.random() * 1; // Increase from 0.5 to 1.5
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
            
            connectionCount++;
          }
        });
      });
    }
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    updateParticles(canvas.width, canvas.height);
    drawParticles(ctx);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;
    
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    
    initParticles(canvas.width, canvas.height);
  };

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    // Initial setup
    handleResize();

    // Event listeners
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency array for setup only

  // Restart animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isVisible, particleColor, particleCount, speed, interactive]); // Only depend on isVisible

  return (
    <canvas
      ref={canvasRef}
      className={`particle-background ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: interactive ? 'auto' : 'none',
        zIndex: 0,
        ...style
      }}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    />
  );
}

export default ParticleBackground;







