import React, { useRef, useEffect } from 'react';

// ThemeToggle removed to lock app to dark theme
import { useMobileNavigation, useNavbarScroll } from '../hooks';
import {
  LuHouse,
  LuMusic,
  LuCode,
  LuUser,
  LuMail,
  LuMenu,
  LuX
} from 'react-icons/lu';
import { animations } from '../utils';

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
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLButtonElement>(null);
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

  const { isScrolled } = useNavbarScroll({ threshold: 50 });

  // Animation setup
  useEffect(() => {
    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      // Navbar entrance animation
      animations.fadeIn(navRef.current, {
        duration: 0.8,
        y: -20,
        scrollTrigger: false
      });

      // Brand hover animation
      if (brandRef.current) {
        const brandElement = brandRef.current;

        const handleMouseEnter = () => {
          animations.scaleIn(brandElement, {
            duration: 0.3,
            scale: 1.05,
            scrollTrigger: false
          });
        };

        const handleMouseLeave = () => {
          animations.scaleIn(brandElement, {
            duration: 0.3,
            scale: 1,
            scrollTrigger: false
          });
        };

        brandElement.addEventListener('mouseenter', handleMouseEnter);
        brandElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          brandElement.removeEventListener('mouseenter', handleMouseEnter);
          brandElement.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, 50); // Smaller delay for navbar since it's not lazy-loaded

    return () => {
      clearTimeout(timer);
      animations.cleanup();
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, sectionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(sectionId);
    }
  };

  const getSectionIcon = (sectionId: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      home: LuHouse,
      music: LuMusic,
      development: LuCode,
      about: LuUser,
      contact: LuMail,
    };
    return icons[sectionId] || LuHouse;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 ${
          isScrolled
            ? 'glass-effect backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent backdrop-blur-sm'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="flex-1 flex items-center min-w-0">
        <button
          ref={brandRef}
          className="font-mono text-xl font-bold tracking-wide uppercase text-white hover:text-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg px-2 py-1 flex-shrink-0"
          onClick={() => setActiveSection('home')}
          aria-label="Navigate to home section"
        >
          <span className="gradient-text">KEVIN</span>
          <br />
          <span className="text-gray-300">HENDERSON</span>
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          ref={hamburgerRef}
          className={`relative flex flex-col justify-center items-center w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
            isMobileMenuOpen
              ? 'glass-effect bg-white/20 shadow-lg'
              : 'hover:bg-white/10 hover:backdrop-blur-sm'
          }`}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          type="button"
        >
          {isMobileMenuOpen ? (
            <LuX className="w-6 h-6 text-white rotate-0" />
          ) : (
            <LuMenu className="w-6 h-6 text-white" />
          )}
        </button>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="flex flex-row items-center gap-3 flex-shrink-0">
          <div className="flex flex-row gap-2">
            {sections.map(section => (
              <button
                key={section.id}
                className={`group flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-xl font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'glass-effect bg-indigo-600/80 text-white shadow-lg backdrop-blur-sm border border-indigo-400/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm'
                }`}
                onClick={() => setActiveSection(section.id)}
                aria-current={activeSection === section.id ? 'page' : undefined}
                tabIndex={0}
              >
                {React.createElement(getSectionIcon(section.id), {
                  className: `w-4 h-4 ${
                    activeSection === section.id ? 'text-white' : ''
                  }`
                })}
                <span className="uppercase tracking-wide font-semibold text-sm">{section.label}</span>
              </button>
            ))}
          </div>
          {/* Theme toggle removed; app is locked to dark theme */}
        </div>
      )}

    </nav>

    {/* Mobile Menu Overlay */}
    {isMobile && (
      <div
        className={`mobile-menu-overlay fixed inset-0 bg-black/80 backdrop-blur-md z-40 ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />
    )}

    {/* Mobile Menu */}
    {isMobile && (
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''} fixed top-0 right-0 h-screen w-[min(320px,85vw)] glass-effect border-l border-white/20 shadow-2xl z-50 overflow-y-auto backdrop-blur-2xl`}
        role="menu"
        aria-labelledby="hamburger-button"
      >
        <div className="mobile-menu-content flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="font-mono text-lg font-bold tracking-wide uppercase text-white">
              <span className="gradient-text">Menu</span>
            </div>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
            >
              <LuX className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="mobile-nav-links flex-1 py-4">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`mobile-nav-link flex items-center gap-4 w-full px-6 py-4 font-medium text-left cursor-pointer border-l-4 border-transparent min-h-[3.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 text-white ${
                  activeSection === section.id
                    ? 'bg-indigo-600/20 text-indigo-300 border-l-indigo-400 font-semibold backdrop-blur-sm'
                    : 'hover:bg-white/10 hover:text-indigo-300 hover:border-l-white/30 hover:backdrop-blur-sm'
                }`}
                onClick={() => handleNavClick(section.id)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
                role="menuitem"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={activeSection === section.id ? 'page' : undefined}
                style={{ '--animation-delay': `${index * 0.12}s` } as React.CSSProperties}
              >
                {React.createElement(getSectionIcon(section.id), { className: "w-6 h-6 mobile-nav-icon" })}
                <span className="flex-1 uppercase tracking-wide text-base">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          {/* Theme toggle removed from mobile menu; app is locked to dark theme */}
        </div>
      </div>
    )}
    </>
  );
}

export default Navbar;




