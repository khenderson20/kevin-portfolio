import { Project, ProjectCategory } from '../types/portfolio';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
}

interface GitHubLanguages {
  [language: string]: number;
}

export class GitHubService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly USERNAME = 'khenderson20'; // Your GitHub username
  
  static async getUserRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/users/${this.USERNAME}/repos?sort=updated&per_page=100`);
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      const repos: GitHubRepo[] = await response.json();
      
      // Filter out forks and archived repos, focus on your original work
      return repos.filter(repo => !repo.fork && !repo.archived);
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      return [];
    }
  }

  static async getRepoLanguages(repoName: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/repos/${this.USERNAME}/${repoName}/languages`);
      if (!response.ok) return [];
      
      const languages: GitHubLanguages = await response.json();
      return Object.keys(languages);
    } catch (error) {
      console.error('Error fetching repo languages:', error);
      return [];
    }
  }

  static async getFeaturedRepos(): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepos();
    
    // Define criteria for featured projects
    return repos.filter(repo => 
      repo.stargazers_count > 0 || // Has stars
      repo.topics.includes('portfolio') || // Tagged as portfolio
      repo.topics.includes('featured') || // Explicitly marked as featured
      repo.description?.toLowerCase().includes('portfolio') ||
      ['portfolio', 'website', 'app', 'project'].some(keyword => 
        repo.name.toLowerCase().includes(keyword)
      )
    ).slice(0, 6); // Limit to 6 featured projects
  }

  static transformToPortfolioProject(repo: GitHubRepo, languages: string[] = []): Project {
    return {
      id: `github-${repo.id}`,
      title: this.formatRepoName(repo.name),
      tech: languages.length > 0 ? languages : [repo.language].filter((lang): lang is string => Boolean(lang)),
      description: repo.description || 'GitHub repository project',
      github: repo.html_url,
      demo: repo.homepage || undefined,
      featured: repo.stargazers_count > 0 || repo.topics.includes('featured'),
      category: this.categorizeRepo(repo, languages),
      metrics: `${repo.stargazers_count} stars • ${repo.forks_count} forks`,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at
    };
  }

  private static formatRepoName(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private static categorizeRepo(repo: GitHubRepo, languages: string[]): ProjectCategory {
    const allTech = [...languages, repo.language].filter((tech): tech is string => Boolean(tech)).map(t => t.toLowerCase());
    
    if (allTech.some(tech => ['react', 'vue', 'angular', 'svelte'].includes(tech))) {
      return 'frontend';
    }
    if (allTech.some(tech => ['node', 'express', 'fastapi', 'django'].includes(tech))) {
      return 'backend';
    }
    if (allTech.some(tech => ['react native', 'flutter', 'swift', 'kotlin'].includes(tech))) {
      return 'mobile';
    }
    if (repo.topics.includes('audio') || repo.name.toLowerCase().includes('audio')) {
      return 'audio';
    }
    
    return 'fullstack';
  }
}