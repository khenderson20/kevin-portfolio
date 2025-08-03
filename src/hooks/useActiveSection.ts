import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveSection(hash);
  }, []);

  const navigateToSection = (section: string) => {
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);

    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return { activeSection, navigateToSection };
}