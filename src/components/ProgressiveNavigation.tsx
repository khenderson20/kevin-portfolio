import { useState, useEffect } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavigationSection {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface ProgressiveNavigationProps {
  className?: string;
}

const navigationSections: NavigationSection[] = [
  {
    id: 'home',
    label: 'Overview',
    icon: '👋',
    description: 'Introduction & highlights'
  },
  {
    id: 'music',
    label: 'Music',
    icon: '🎵',
    description: 'Audio production & composition'
  },
  {
    id: 'development',
    label: 'Development',
    icon: '💻',
    description: 'Technical projects & skills'
  },
  {
    id: 'about',
    label: 'About',
    icon: '🚀',
    description: 'Experience & background'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '📧',
    description: 'Get in touch'
  }
];

// This component has been removed as part of reverting to the old navbar.