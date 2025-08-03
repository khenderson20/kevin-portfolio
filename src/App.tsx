
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import MusicSection from './components/MusicSection';
import DevelopmentSection from './components/DevelopmentSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ScrollIndicator from './components/ScrollIndicator';
import { useActiveSection } from './hooks/useActiveSection';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const { activeSection, navigateToSection } = useActiveSection();
  
  // Custom logic to determine if content is scrollable
  const [hasScrollableContent, setHasScrollableContent] = useState(false);
  
  useEffect(() => {
    const checkScrollable = () => {
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      setHasScrollableContent(isScrollable);
      
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'development', label: 'Development' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];


  return (
    <ErrorBoundary>
      <div className="portfolio">
        {hasScrollableContent && (
          <ScrollIndicator
            position="bottom"
            thickness={5}
            showPercentage={true}
            color="var(--color-secondary)"
          />
        )}
        <Navbar
          key="navbar"
          sections={sections}
          activeSection={activeSection}
          setActiveSection={navigateToSection}
        />
        <main className="main-content">
          <section id="home" className="page-section">
            <HomeSection onNavigateToSection={navigateToSection} />
          </section>

          <section id="music" className="page-section">
            <MusicSection />
          </section>

          <section id="development" className="page-section">
            <DevelopmentSection />
          </section>

          <section id="about" className="page-section">
            <AboutSection />
          </section>

          <section id="contact" className="page-section">
            <ContactSection />
          </section>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
