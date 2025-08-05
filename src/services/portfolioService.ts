import { Project } from '../types/portfolio';

export class PortfolioService {
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      // Add your actual API call here
      const response = await fetch('/api/projects');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      // Return fallback data or empty array
      return [];
    }
  }
}

