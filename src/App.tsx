import { useEffect, useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import { useActiveSection } from './hooks/useActiveSection';
import ScrollIndicator from './components/ScrollIndicator';
import SectionLoader from './components/SectionLoader';
import './App.css';

// Lazy load sections for better code splitting
const HomeSection = lazy(() => import('./components/HomeSection').catch(err => {
  console.error('Failed to load HomeSection:', err);
  return { default: () => <div>Error loading Home section</div> };
}));
const MusicSection = lazy(() => import('./components/MusicSection').catch(err => {
  console.error('Failed to load MusicSection:', err);
  return { default: () => <div>Error loading Music section</div> };
}));
const DevelopmentSection = lazy(() => import('./components/DevelopmentSection').catch(err => {
  console.error('Failed to load DevelopmentSection:', err);
  return { default: () => <div>Error loading Development section</div> };
}));
const AboutSection = lazy(() => import('./components/AboutSection').catch(err => {
  console.error('Failed to load AboutSection:', err);
  return { default: () => <div>Error loading About section</div> };
}));
const ContactSection = lazy(() => import('./components/ContactSection').catch(err => {
  console.error('Failed to load ContactSection:', err);
  return { default: () => <div>Error loading Contact section</div> };
}));

const Footer = lazy(() => import('./components/Footer').catch(err => {
  console.error('Failed to load Footer:', err);
  return { default: () => <div>Error loading footer</div> };
}));


function App() {
  const { activeSection, navigateToSection } = useActiveSection();
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

  // Define sections for Navbar in the order: home, about, development, music, contact
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'development', label: 'Development' },
    { id: 'music', label: 'Music' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="App w-full max-w-[100vw] overflow-x-hidden">
      <div className="w-full max-w-[100vw] overflow-hidden">
        {/* Accessible skip link for keyboard users */}
        <a href="#music-heading" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded">
          Skip to Music content
        </a>
        <Navbar
          orderedSections={sections}
          activeSection={activeSection}
          setActiveSection={navigateToSection}
        />
        <main className="main-content w-full max-w-[100vw] overflow-hidden">
          <Suspense fallback={<SectionLoader />}>
          <section id="home" className="section-container relative">
            <HomeSection onNavigateToSection={navigateToSection} />
          </section>
          
          <section id="about" className="section-container relative min-h-[110vh] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
            <AboutSection />
          </section>

          <section id="development" className="section-container relative min-h-[110vh] bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
            <DevelopmentSection />
          </section>

          <section id="music" className="section-container relative min-h-[110vh] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <MusicSection />
          </section>

          <section id="contact" className="section-container relative min-h-[110vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <ContactSection />
          </section>
          </Suspense>
        </main>
      </div>

      <Suspense fallback={<SectionLoader sectionName="footer" />}>
        <Footer />
      </Suspense>

      {hasScrollableContent && <ScrollIndicator />}

    </div>
  );
}

export default App;
