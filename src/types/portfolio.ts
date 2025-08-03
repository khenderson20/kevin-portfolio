export interface Project {
  id: string;
  title: string;
  tech: string[];
  description: string;
  metrics?: string;
  github?: string;
  demo?: string;
  image?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export enum SectionId {
  HOME = 'home',
  MUSIC = 'music',
  DEVELOPMENT = 'development',
  ABOUT = 'about',
  CONTACT = 'contact'
}