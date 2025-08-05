export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'audio' | 'dsa';

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
  category?: ProjectCategory;
  createdAt?: string;
  updatedAt?: string;
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

export interface CodeSnippet {
  content: string;
  language: string;
  filename: string;
}
