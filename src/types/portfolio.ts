export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'audio';

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