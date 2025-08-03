import { useState } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import MusicSection from './components/MusicSection';
import DevelopmentSection from './components/DevelopmentSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'development', label: 'Development' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="portfolio">
      <Navbar 
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="main-content">
        <div className="section-container">
          <div className="section-wrapper">
            {activeSection === 'home' && (
              <div className="section-fade-in">
                <HomeSection />
              </div>
            )}
            {activeSection === 'music' && (
              <div className="section-fade-in">
                <MusicSection />
              </div>
            )}
            {activeSection === 'development' && (
              <div className="section-fade-in">
                <DevelopmentSection />
              </div>
            )}
            {activeSection === 'about' && (
              <div className="section-fade-in">
                <AboutSection />
              </div>
            )}
            {activeSection === 'contact' && (
              <div className="section-fade-in">
                <ContactSection />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
