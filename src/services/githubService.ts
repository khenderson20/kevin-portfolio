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

// Add interface for code snippet
interface CodeSnippet {
  content: string;
  language: string;
  filename: string;
}

export class GitHubService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly USERNAME = 'khenderson20'; // Your GitHub username
  private static readonly VITE_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  private static cache = new Map<string, { data: GitHubRepo[] | string[] | CodeSnippet; timestamp: number }>();
  private static readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes cache

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    };

    // Add authorization header if token is available
    if (this.VITE_GITHUB_TOKEN) {
      console.log('✅ GitHub token found, using authenticated requests');
      headers['Authorization'] = `token ${this.VITE_GITHUB_TOKEN}`;
    } else {
      console.warn('⚠️ No GitHub token found, using unauthenticated requests (60/hour limit)');
    }

    return headers;
  }

  private static isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }

  static async getUserRepos(): Promise<GitHubRepo[]> {
    const cacheKey = `repos-${this.USERNAME}`;

    // Return cached data if valid
    if (this.isCacheValid(cacheKey)) {
      const cachedData = this.cache.get(cacheKey)!.data;
      if (Array.isArray(cachedData) && cachedData.length > 0 && typeof cachedData[0] === 'object' && 'id' in cachedData[0]) {
        return cachedData as GitHubRepo[];
      }
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/users/${this.USERNAME}/repos?sort=updated&per_page=100`,
        { headers: this.getHeaders() }
      );

      if (!response.ok) {
        // Check if it's a rate limit error
        if (response.status === 403) {
          const resetTime = response.headers.get('X-RateLimit-Reset');
          console.warn('⚠️ GitHub API rate limit exceeded. Reset time:', resetTime);
          return this.getFallbackRepos();
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const repos: GitHubRepo[] = await response.json();
      const filteredRepos = repos.filter(repo => !repo.fork && !repo.archived);

      // Cache the successful response
      this.cache.set(cacheKey, { data: filteredRepos, timestamp: Date.now() });

      return filteredRepos;
    } catch (error) {
      console.error('⚠️ Error fetching GitHub repos:', error);
      return this.getFallbackRepos();
    }
  }

  static async getSpecificRepos(): Promise<GitHubRepo[]> {
    const allRepos = await this.getUserRepos();

    const portfolioTags = [
      'featured',           // Custom tag for featured projects
      'portfolio',          // Portfolio projects
      'showcase',           // Projects to showcase
      'demo',               // Demo projects
      'highlight',          // Highlighted work
    ];

    return allRepos.filter(repo =>
      portfolioTags.some(tag => repo.topics.includes(tag))
    );
  }

  private static getFallbackRepos(): GitHubRepo[] {
    // Return mock data when API fails or rate limit is exceeded
    return [
      {
        id: 1,
        name: 'kevin-portfolio',
        full_name: 'khenderson20/kevin-portfolio',
        description: 'Modern portfolio website built with React, TypeScript, and AWS Amplify. Features responsive design, GraphQL API, and contemporary UI patterns.',
        html_url: 'https://github.com/khenderson20/kevin-portfolio',
        homepage: 'https://main.d2x8j9k4l5m3n7.amplifyapp.com',
        language: 'TypeScript',
        stargazers_count: 12,
        forks_count: 3,
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-12-15T10:30:00Z',
        topics: ['portfolio', 'react', 'typescript', 'aws-amplify'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      },
      {
        id: 2,
        name: 'react-task-manager',
        full_name: 'khenderson20/react-task-manager',
        description: 'Full-stack task management application with drag-and-drop functionality, user authentication, and real-time updates.',
        html_url: 'https://github.com/khenderson20/react-task-manager',
        homepage: 'https://react-task-manager-demo.netlify.app',
        language: 'JavaScript',
        stargazers_count: 28,
        forks_count: 7,
        created_at: '2024-02-10T14:20:00Z',
        updated_at: '2024-12-10T14:20:00Z',
        topics: ['react', 'nodejs', 'mongodb', 'task-management'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      },
      {
        id: 3,
        name: 'audio-visualizer',
        full_name: 'khenderson20/audio-visualizer',
        description: 'Interactive audio visualizer with Web Audio API, real-time frequency analysis, and customizable visual effects.',
        html_url: 'https://github.com/khenderson20/audio-visualizer',
        homepage: 'https://audio-visualizer-demo.vercel.app',
        language: 'JavaScript',
        stargazers_count: 42,
        forks_count: 12,
        created_at: '2024-03-05T09:15:00Z',
        updated_at: '2024-12-05T09:15:00Z',
        topics: ['audio', 'visualization', 'web-audio-api', 'canvas'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      },
      {
        id: 4,
        name: 'ecommerce-dashboard',
        full_name: 'khenderson20/ecommerce-dashboard',
        description: 'Comprehensive e-commerce dashboard with analytics, inventory management, and order tracking built with Vue.js and Python.',
        html_url: 'https://github.com/khenderson20/ecommerce-dashboard',
        homepage: 'https://ecommerce-dashboard-demo.herokuapp.com',
        language: 'Vue',
        stargazers_count: 35,
        forks_count: 8,
        created_at: '2024-04-28T16:45:00Z',
        updated_at: '2024-11-28T16:45:00Z',
        topics: ['vue', 'python', 'ecommerce', 'dashboard'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      },
      {
        id: 5,
        name: 'mobile-weather-app',
        full_name: 'khenderson20/mobile-weather-app',
        description: 'Cross-platform mobile weather app with location-based forecasts, interactive maps, and offline caching.',
        html_url: 'https://github.com/khenderson20/mobile-weather-app',
        homepage: null,
        language: 'TypeScript',
        stargazers_count: 23,
        forks_count: 5,
        created_at: '2024-05-20T11:30:00Z',
        updated_at: '2024-11-20T11:30:00Z',
        topics: ['react-native', 'weather', 'mobile', 'typescript'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      },
      {
        id: 6,
        name: 'ml-api-service',
        full_name: 'khenderson20/ml-api-service',
        description: 'RESTful API for machine learning model inference with Docker containerization and AWS deployment.',
        html_url: 'https://github.com/khenderson20/ml-api-service',
        homepage: 'https://ml-api-demo.aws.com',
        language: 'Python',
        stargazers_count: 31,
        forks_count: 9,
        created_at: '2024-06-15T13:20:00Z',
        updated_at: '2024-11-15T13:20:00Z',
        topics: ['machine-learning', 'api', 'python', 'docker'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: ''
      }
    ];
  }

  static async getRepoLanguages(repoName: string): Promise<string[]> {
    const cacheKey = `languages-${repoName}`;

    if (this.isCacheValid(cacheKey)) {
      const cachedData = this.cache.get(cacheKey)!.data;
      if (Array.isArray(cachedData) && typeof cachedData[0] === 'string') {
        return cachedData as string[];
      }
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/repos/${this.USERNAME}/${repoName}/languages`,
        { headers: this.getHeaders() }
      );

      if (!response.ok) {
        if (response.status === 403) {
          console.warn('Rate limit exceeded for languages API');
          return []; // Return empty array for rate limit
        }
        return [];
      }

      const languages: GitHubLanguages = await response.json();
      const languageList = Object.keys(languages);

      this.cache.set(cacheKey, { data: languageList, timestamp: Date.now() });
      return languageList;
    } catch (error) {
      console.error('Error fetching repo languages:', error);
      return [];
    }
  }

  static async getFeaturedRepos(): Promise<GitHubRepo[]> {
    const repos = await this.getUserRepos();

    // Define criteria for featured projects (more inclusive)
    return repos.filter(repo =>
      repo.stargazers_count >= 0 || // All repos (including 0 stars)
      repo.topics.includes('portfolio') || // Tagged as portfolio
      repo.topics.includes('featured') || // Explicitly marked as featured
      repo.description?.toLowerCase().includes('portfolio') ||
      repo.description?.toLowerCase().includes('project') ||
      repo.description?.toLowerCase().includes('app') ||
      repo.description?.toLowerCase().includes('website') ||
      ['portfolio', 'website', 'app', 'project', 'demo', 'example'].some(keyword =>
        repo.name.toLowerCase().includes(keyword)
      ) ||
      repo.description !== null // Has any description
    ).slice(0, 12); // Increased limit to 12 featured projects
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
    const repoName = repo.name.toLowerCase();
    const description = repo.description?.toLowerCase() || '';
    
    // Check for Data Structures and Algorithms projects
    if (allTech.includes('c') || 
        allTech.includes('c++') ||
        repoName.includes('algorithm') ||
        repoName.includes('data-structure') ||
        repoName.includes('dsa') ||
        description.includes('algorithm') ||
        description.includes('data structure') ||
        repo.topics.some(topic => ['algorithm', 'data-structures', 'dsa', 'leetcode', 'competitive-programming'].includes(topic))) {
      return 'dsa';
    }
    
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
    
    // Don't default JavaScript projects to fullstack
    if (allTech.includes('javascript')) {
      return 'frontend';
    }
    
    return 'frontend';
  }

  // Filter by your custom portfolio tags
  static async getPortfolioRepos(): Promise<GitHubRepo[]> {
    const allRepos = await this.getUserRepos();
    
    const portfolioTags = [
      'featured',           // Custom tag for featured projects
      'portfolio',          // Portfolio projects
      'showcase',           // Projects to showcase
      'demo',              // Demo projects
      'highlight',         // Highlighted work
      'kevin-featured'     // Your personal featured tag
    ];
    
    return allRepos.filter(repo => 
      portfolioTags.some(tag => repo.topics.includes(tag))
    );
  }

  // Removed getCodeSnippet method

  // Removed getLanguageFromFilename method
}






