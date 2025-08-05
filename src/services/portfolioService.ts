import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { GitHubService } from './githubService';

const client = generateClient<Schema>();

export class PortfolioService {
  // Enhanced method to get projects from both GitHub and database
  static async getFeaturedProjects() {
    try {
      // Get projects from database
      const { data: dbProjects } = await client.models.Project.list({
        filter: { featured: { eq: true } }
      });

      // Get featured GitHub repos
      const githubRepos = await GitHubService.getFeaturedRepos();
      
      // Transform GitHub repos to project format
      const githubProjects = await Promise.all(
        githubRepos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );

      // Combine and deduplicate (prioritize database entries)
      const allProjects = [...dbProjects, ...githubProjects];
      const uniqueProjects = allProjects.filter((project, index, self) => 
        index === self.findIndex(p => p.title === project.title)
      );

      return uniqueProjects.slice(0, 6); // Limit to 6 featured projects
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  }

  static async getAllGitHubProjects() {
    try {
      const repos = await GitHubService.getUserRepos();
      return Promise.all(
        repos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      return [];
    }
  }

  // Sync GitHub projects to database (optional)
  static async syncGitHubProjects() {
    try {
      const githubRepos = await GitHubService.getFeaturedRepos();
      
      for (const repo of githubRepos) {
        const languages = await GitHubService.getRepoLanguages(repo.name);
        const projectData = GitHubService.transformToPortfolioProject(repo, languages);
        
        // Check if project already exists
        const { data: existing } = await client.models.Project.list({
          filter: { title: { eq: projectData.title } }
        });

        if (existing.length === 0) {
          // Create new project
          await client.models.Project.create({
            title: projectData.title,
            tech: projectData.tech,
            description: projectData.description,
            github: projectData.github,
            demo: projectData.demo,
            featured: projectData.featured,
            category: projectData.category,
            metrics: projectData.metrics
          });
        }
      }
    } catch (error) {
      console.error('Error syncing GitHub projects:', error);
    }
  }

  // Skills
  static async getSkillsByCategory(category: string) {
    try {
      const { data } = await client.models.Skill.list({
        filter: { category: { eq: category } }
      });
      return data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  }

  static async getFeaturedSkills() {
    try {
      const { data } = await client.models.Skill.list({
        filter: { featured: { eq: true } }
      });
      return data;
    } catch (error) {
      console.error('Error fetching featured skills:', error);
      return [];
    }
  }

  // Experience
  static async getFeaturedExperience() {
    try {
      const { data } = await client.models.Experience.list({
        filter: { featured: { eq: true } }
      });
      return data;
    } catch (error) {
      console.error('Error fetching experience:', error);
      return [];
    }
  }

  static async getCurrentExperience() {
    try {
      const { data } = await client.models.Experience.list({
        filter: { current: { eq: true } }
      });
      return data;
    } catch (error) {
      console.error('Error fetching current experience:', error);
      return [];
    }
  }
}
