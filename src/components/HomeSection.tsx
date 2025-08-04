import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';

interface HomeSectionProps {
  onNavigateToSection?: (section: string) => void;
}

function HomeSection({ onNavigateToSection }: HomeSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMusicClick = () => {
    if (onNavigateToSection) {
      onNavigateToSection('music');
    } else {
      // Fallback for direct navigation
      window.location.hash = 'music';
    }
  };

  const handleCodeClick = () => {
    if (onNavigateToSection) {
      onNavigateToSection('development');
    } else {
      // Fallback for direct navigation
      window.location.hash = 'development';
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <ParticleBackground
        particleCount={150}
        particleColor="hsla(186, 85%, 54%, 0.8)" // Primary color with alpha
        speed={0.3}
        interactive={true}
      />
        <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
          <div className="hero-badge">
            <span className="badge-icon">🎵</span>
            <span className="badge-text">Available for Projects</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line title-line-1">Musician &</span>
            <span className="title-line title-line-2">Creative Developer</span>
          </h1>

          <p className="hero-subtitle">
            Crafting digital experiences through code and sound,
            bridging the gap between technical innovation and creative expression
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>

        <div className={`hero-actions ${isVisible ? 'animate-in' : ''}`}>
          <div className="hero-buttons">
            <button
              className="btn-primary hero-cta"
              onClick={handleMusicClick}
              aria-label="Listen to my music projects"
            >
              <span className="btn-icon">🎧</span>
              <span className="btn-text">Listen to My Music</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              className="btn-secondary hero-cta"
              onClick={handleCodeClick}
              aria-label="View my development projects"
            >
              <span className="btn-icon">💻</span>
              <span className="btn-text">View My Code</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>

          <div className="hero-social-proof">
            <p className="social-proof-text">Trusted by startups and enterprises</p>
            <div className="social-proof-logos">
              <span className="company-logo">IBM</span>
              <span className="company-logo">University Research</span>
              <span className="company-logo">Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;