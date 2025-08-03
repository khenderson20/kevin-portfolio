import ThemeToggle from './ThemeToggle';
import { useMobileNavigation } from '../hooks/useMobileNavigation';

interface Section {
  id: string;
  label: string;
}

interface NavbarProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

function Navbar({ sections, activeSection, setActiveSection }: NavbarProps) {
  const {
    isMobile,
    isMenuOpen: isMobileMenuOpen,
    toggleMenu: toggleMobileMenu,
    closeMenu: closeMobileMenu,
    menuRef: mobileMenuRef,
    triggerRef: hamburgerRef,
  } = useMobileNavigation({
    breakpoint: 768,
    closeOnNavigate: true,
    closeOnResize: true,
    trapFocus: true,
  });

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Menu will close automatically due to closeOnNavigate option
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(sectionId);
    }
  };

  const getSectionIcon = (sectionId: string): string => {
    const icons: Record<string, string> = {
      home: '🏠',
      music: '🎵',
      development: '💻',
      about: '👤',
      contact: '📧',
    };
    return icons[sectionId] || '📄';
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-brand">
        <span className="brand-text">Kevin Henderson</span>
      </div>

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          ref={hamburgerRef}
          className={`hamburger-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          type="button"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="nav-content desktop-nav">
          <div className="nav-links">
            {sections.map(section => (
              <button
                key={section.id}
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                {section.label}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          aria-hidden="true"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          role="menu"
          aria-labelledby="hamburger-button"
        >
          <div className="mobile-menu-content">
            <div className="mobile-nav-links">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`mobile-nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, section.id)}
                  role="menuitem"
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  style={{ '--animation-delay': `${index * 0.1}s` } as React.CSSProperties}
                >
                  <span className="mobile-nav-icon">
                    {getSectionIcon(section.id)}
                  </span>
                  <span className="mobile-nav-text">{section.label}</span>
                </button>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
