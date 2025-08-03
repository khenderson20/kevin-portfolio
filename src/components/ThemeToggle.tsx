import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'dark-high-contrast';

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const themes: { value: Theme; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'high-contrast', label: 'High Contrast', icon: '⚫' },
    { value: 'dark-high-contrast', label: 'Dark High Contrast', icon: '⚪' },
  ];

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    let initialTheme: Theme = 'dark';
    if (savedTheme) {
      initialTheme = savedTheme;
    } else if (prefersHighContrast) {
      initialTheme = prefersDark ? 'dark-high-contrast' : 'high-contrast';
    } else {
      initialTheme = prefersDark ? 'dark' : 'light';
    }

    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDropdownOpen(false);
  };

  const currentTheme = themes.find(t => t.value === theme) || themes[1];

  return (
    <div className="theme-toggle-container">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="theme-toggle"
        aria-label={`Current theme: ${currentTheme.label}. Click to change theme`}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
      >
        <span className="theme-toggle-icon">
          {currentTheme.icon}
        </span>
        <span className="theme-toggle-text">
          {currentTheme.label}
        </span>
        <span className="theme-toggle-arrow">
          {isDropdownOpen ? '▲' : '▼'}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="theme-dropdown" role="listbox">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => handleThemeChange(themeOption.value)}
              className={`theme-option ${theme === themeOption.value ? 'active' : ''}`}
              role="option"
              aria-selected={theme === themeOption.value}
            >
              <span className="theme-option-icon">{themeOption.icon}</span>
              <span className="theme-option-label">{themeOption.label}</span>
              {theme === themeOption.value && (
                <span className="theme-option-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
