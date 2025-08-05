
import React, { useEffect, useState, Suspense } from 'react';
import { ProgressiveNavigation } from './components/ProgressiveNavigation';
import { useActiveSection } from './hooks/useActiveSection';
import HomeSection from './components/HomeSection';
import MusicSection from './components/MusicSection';
import DevelopmentSection from './components/DevelopmentSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ScrollIndicator from './components/ScrollIndicator';
import './App.css';
import './styles/progressive-navigation.css';

function App() {
  const { navigateToSection } = useActiveSection();
  const [hasScrollableContent, setHasScrollableContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkScrollable = () => {
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      setHasScrollableContent(isScrollable);
    };
    
    // Initialize app
    const initializeApp = () => {
      checkScrollable();
      setIsLoading(false);
    };
    
    // Add small delay to ensure proper rendering
    const timer = setTimeout(initializeApp, 100);
    
    window.addEventListener('resize', checkScrollable);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="App">
      <ProgressiveNavigation />
      
      <main className="main-content">
        <Suspense fallback={<div className="section-loading">Loading...</div>}>
          <section id="home" className="section-container">
            <HomeSection onNavigateToSection={navigateToSection} />
          </section>
          
          <section id="music" className="section-container">
            <MusicSection />
          </section>
          
          <section id="development" className="section-container">
            <DevelopmentSection />
          </section>
          
          <section id="about" className="section-container">
            <AboutSection />
          </section>
          
          <section id="contact" className="section-container">
            <ContactSection />
          </section>
        </Suspense>
      </main>
      
      {hasScrollableContent && <ScrollIndicator />}
    </div>
  );
}

export default App;
