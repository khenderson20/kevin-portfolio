import ThemeToggle from './ThemeToggle';

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
  return (
    <nav className="navbar">
      <div className="nav-brand">Kevin Henderson</div>
      <div className="nav-content">
        <div className="nav-links">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
