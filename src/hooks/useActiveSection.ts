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
  };

  return { activeSection, navigateToSection };
}