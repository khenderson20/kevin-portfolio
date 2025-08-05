import { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavigationSection {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface ProgressiveNavigationProps {
  className?: string;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'home',
    label: 'Overview',
    icon: '👋',
    description: 'Introduction & highlights'
  },
  {
    id: 'music',
    label: 'Music',
    icon: '🎵',
    description: 'Audio production & composition'
  },
  {
    id: 'development',
    label: 'Development',
    icon: '💻',
    description: 'Technical projects & skills'
  },
  {
    id: 'about',
    label: 'About',
    icon: '🚀',
    description: 'Experience & background'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '📧',
    description: 'Get in touch'
  }
];

export function ProgressiveNavigation({ className = '' }: ProgressiveNavigationProps) {
  const { activeSection, navigateToSection, isScrolling } = useActiveSection();
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    navigateToSection(sectionId);
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <nav className={`progressive-nav ${className} ${isMobile ? 'progressive-nav--mobile' : 'progressive-nav--desktop'}`}>
      {isMobile && (
        <button 
          className="nav-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle navigation"
        >
          <span className="nav-toggle-icon">
            {isExpanded ? '✕' : '☰'}
          </span>
        </button>
      )}
      
      <div className={`nav-sections ${isExpanded || !isMobile ? 'nav-sections--visible' : ''}`}>
        {navigationSections.map((section) => (
          <button
            key={section.id}
            className={`nav-section ${activeSection === section.id ? 'nav-section--active' : ''} ${isScrolling ? 'nav-section--scrolling' : ''}`}
            onClick={() => handleSectionClick(section.id)}
            aria-label={`Navigate to ${section.label}`}
            data-section={section.id}
          >
            <span className="nav-section-icon" role="img" aria-hidden="true">
              {section.icon}
            </span>
            <div className="nav-section-content">
              <span className="nav-section-label">{section.label}</span>
              <span className="nav-section-description">{section.description}</span>
            </div>
            <div className="nav-section-indicator" aria-hidden="true"></div>
          </button>
        ))}
      </div>
      
      {isMobile && isExpanded && (
        <div 
          className="nav-overlay"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}