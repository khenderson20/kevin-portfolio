import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setActiveSection(hash);
  }, []);

  const setActiveSection = (section: string) => {    
    setActiveSection(section);
    window.history.pushState(null, '', `#${section}`);
  };

  return { activeSection, setActiveSection };
}