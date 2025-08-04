
import { useEffect, useState, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ScrollIndicator from './components/ScrollIndicator';
import { useActiveSection } from './hooks/useActiveSection';
import './App.css';
import SectionErrorBoundary from './components/SectionErrorBoundary';

// Lazy load heavy components
const HomeSection = lazy(() => import('./components/HomeSection'));
const MusicSection = lazy(() => import('./components/MusicSection'));
const DevelopmentSection = lazy(() => import('./components/DevelopmentSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

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
          <Suspense fallback={<div className="loading-skeleton">Loading...</div>}>
            <SectionErrorBoundary sectionName="Home">
              <HomeSection onNavigateToSection={navigateToSection} />
            </SectionErrorBoundary>
            <SectionErrorBoundary sectionName="Music">
              <MusicSection />
            </SectionErrorBoundary>
            <SectionErrorBoundary sectionName="Development">
              <DevelopmentSection />
            </SectionErrorBoundary>
            <SectionErrorBoundary sectionName="About">
              <AboutSection />
            </SectionErrorBoundary>
            <SectionErrorBoundary sectionName="Contact">
              <ContactSection />
            </SectionErrorBoundary>
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
