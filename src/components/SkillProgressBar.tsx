import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SkillProgressBarProps {
  skill: string;
  level: number; // 0-100
  category?: string;
  delay?: number;
  showPercentage?: boolean;
  color?: string;
  className?: string;
}

function SkillProgressBar({
  skill,
  level,
  category,
  delay = 0,
  showPercentage = false,
  color = 'var(--color-primary)',
  className = ''
}: SkillProgressBarProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -10% 0px',
    triggerOnce: true
  });

  // Animate progress bar when visible
  useEffect(() => {
    if (!isIntersecting) return;

    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = level / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const animationTimer = setInterval(() => {
        currentStep++;
        const newLevel = Math.min(currentStep * increment, level);
        setAnimatedLevel(newLevel);

        if (currentStep >= steps) {
          clearInterval(animationTimer);
        }
      }, stepDuration);

      return () => clearInterval(animationTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [isIntersecting, level, delay]);

  const getLevelLabel = (level: number): string => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    if (level >= 25) return 'Beginner';
    return 'Learning';
  };

  const getProgressColor = (level: number): string => {
    if (level >= 90) return 'var(--color-success)';
    if (level >= 75) return 'var(--color-primary)';
    if (level >= 50) return 'var(--color-warning)';
    return 'var(--color-info)';
  };

  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`skill-progress-bar ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(animatedLevel)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill} proficiency: ${Math.round(animatedLevel)}%`}
    >
      <div className="skill-header">
        <div className="skill-info">
          <span className="skill-name">{skill}</span>
          {category && <span className="skill-category">{category}</span>}
        </div>
        <div className="skill-level">
          {showPercentage ? (
            <span className="skill-percentage">{Math.round(animatedLevel)}%</span>
          ) : (
            <span className="skill-label">{getLevelLabel(level)}</span>
          )}
        </div>
      </div>
      
      <div className="progress-track">
        <div 
          className="progress-fill"
          style={{
            width: `${animatedLevel}%`,
            backgroundColor: color || getProgressColor(level),
            transition: isIntersecting ? 'width 0.1s ease-out' : 'none'
          }}
        >
          <div className="progress-shine" />
        </div>
      </div>
      
      {/* Skill level indicators */}
      <div className="level-indicators" aria-hidden="true">
        {[25, 50, 75, 90].map((threshold) => (
          <div
            key={threshold}
            className={`level-indicator ${animatedLevel >= threshold ? 'active' : ''}`}
            style={{ left: `${threshold}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillProgressBar;



