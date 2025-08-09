import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { Project } from '../types/portfolio';

// Type for project categories
type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'audio';

// Type for nullable values from Amplify
type Nullable<T> = T | null;

// Type for Amplify project data (matches actual Amplify response)
type AmplifyProject = {
  readonly id: string;
  title: string;
  tech: Nullable<string>[];
  description: string;
  metrics: Nullable<string>;
  github: Nullable<string>;
  demo: Nullable<string>;
  image: Nullable<string>;
  featured: Nullable<boolean>;
  category: Nullable<ProjectCategory>;
  createdAt: Nullable<string>;
  updatedAt: Nullable<string>;
};

// Generate the Amplify GraphQL client
const client = generateClient<Schema>();

export class PortfolioService {
  private static cache = new Map<string, { data: Project[]; timestamp: number }>();
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private static isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  private static transformAmplifyProject(amplifyProject: AmplifyProject): Project {
    return {
      id: amplifyProject.id,
      title: amplifyProject.title,
      tech: Array.isArray(amplifyProject.tech)
        ? amplifyProject.tech.filter((item): item is string => item !== null)
        : [],
      description: amplifyProject.description,
      metrics: amplifyProject.metrics || undefined,
      github: amplifyProject.github || undefined,
      demo: amplifyProject.demo || undefined,
      image: amplifyProject.image || undefined,
      featured: amplifyProject.featured ?? false,
      category: amplifyProject.category || undefined,
      createdAt: amplifyProject.createdAt || undefined,
      updatedAt: amplifyProject.updatedAt || undefined,
    };
  }

  static async getFeaturedProjects(): Promise<Project[]> {
    const cacheKey = 'featured-projects';

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const { data: projects, errors } = await client.models.Project.list({
        filter: { featured: { eq: true } }
      });

      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        throw new Error('Failed to fetch featured projects');
      }

      const transformedProjects = projects.map(this.transformAmplifyProject);
      this.cache.set(cacheKey, { data: transformedProjects, timestamp: Date.now() });

      return transformedProjects;
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  }

  static async getAllProjects(): Promise<Project[]> {
    const cacheKey = 'all-projects';

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const { data: projects, errors } = await client.models.Project.list();

      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        throw new Error('Failed to fetch all projects');
      }

      const transformedProjects = projects.map(this.transformAmplifyProject);
      this.cache.set(cacheKey, { data: transformedProjects, timestamp: Date.now() });

      return transformedProjects;
    } catch (error) {
      console.error('Failed to fetch all projects:', error);
      return [];
    }
  }

  static async getProjectsByCategory(category: string): Promise<Project[]> {
    const cacheKey = `projects-${category}`;

    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data;
    }

    try {
      const { data: projects, errors } = await client.models.Project.list({
        filter: { category: { eq: category as ProjectCategory } }
      });

      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        throw new Error(`Failed to fetch projects for category ${category}`);
      }

      const transformedProjects = projects.map(this.transformAmplifyProject);
      this.cache.set(cacheKey, { data: transformedProjects, timestamp: Date.now() });

      return transformedProjects;
    } catch (error) {
      console.error(`Failed to fetch projects for category ${category}:`, error);
      return [];
    }
  }

  static async createProject(projectData: Omit<Project, 'id'>): Promise<Project | null> {
    try {
      const { data: project, errors } = await client.models.Project.create({
        title: projectData.title,
        tech: projectData.tech,
        description: projectData.description,
        metrics: projectData.metrics,
        github: projectData.github,
        demo: projectData.demo,
        image: projectData.image,
        featured: projectData.featured,
        category: projectData.category as ProjectCategory,
        createdAt: projectData.createdAt,
        updatedAt: projectData.updatedAt,
      });

      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        throw new Error('Failed to create project');
      }

      if (!project) {
        throw new Error('No project data returned');
      }

      // Clear relevant caches
      this.clearCache();

      return this.transformAmplifyProject(project);
    } catch (error) {
      console.error('Failed to create project:', error);
      return null;
    }
  }

  static clearCache(): void {
    this.cache.clear();
  }
}

