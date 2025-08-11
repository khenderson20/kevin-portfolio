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
  // console.log removed
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
    // Return real data based on actual GitHub repositories when API fails or rate limit is exceeded
    return [
      {
        id: 1032137464,
        name: 'kevin-portfolio',
        full_name: 'khenderson20/kevin-portfolio',
        description: 'AWS Amplify Portfolio',
        html_url: 'https://github.com/khenderson20/kevin-portfolio',
        homepage: null,
        language: 'CSS',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2025-08-04T21:40:45Z',
        updated_at: '2025-08-05T23:55:37Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2025-08-06T00:02:35Z'
      },
      {
        id: 424386891,
        name: 'countdown-project',
        full_name: 'khenderson20/countdown-project',
        description: 'This is a short project of me learning my way around Vue.js',
        html_url: 'https://github.com/khenderson20/countdown-project',
        homepage: null,
        language: 'Vue',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2021-11-03T21:33:10Z',
        updated_at: '2025-08-05T19:12:51Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2021-11-11T22:17:29Z'
      },
      {
        id: 245860961,
        name: 'Task_List',
        full_name: 'khenderson20/Task_List',
        description: 'A simple task list application that utilizes the DOM and persists data using Local Storage within the browser.',
        html_url: 'https://github.com/khenderson20/Task_List',
        homepage: null,
        language: 'JavaScript',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2020-03-08T17:50:00Z',
        updated_at: '2025-08-05T19:12:10Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2020-03-09T11:03:07Z'
      },
      {
        id: 687281077,
        name: 'Data_Structures',
        full_name: 'khenderson20/Data_Structures',
        description: 'Basic Data Structures I learned taking CS 2124 at UTSA',
        html_url: 'https://github.com/khenderson20/Data_Structures',
        homepage: null,
        language: 'C',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2023-09-05T03:14:43Z',
        updated_at: '2025-08-05T19:11:30Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2023-11-05T22:46:43Z'
      },
      {
        id: 448479065,
        name: 'stanford-programming-abstractions-cpp',
        full_name: 'khenderson20/stanford-programming-abstractions-cpp',
        description: 'exercises done on my own from the college text "Programming Abstractions in C++" by Eric S. Roberts',
        html_url: 'https://github.com/khenderson20/stanford-programming-abstractions-cpp',
        homepage: null,
        language: 'C++',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2022-01-16T06:48:19Z',
        updated_at: '2025-08-05T19:10:45Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2022-01-19T11:40:12Z'
      },
      {
        id: 444325381,
        name: 'CS_Princeton_Programs',
        full_name: 'khenderson20/CS_Princeton_Programs',
        description: 'Problem sets from the college text: "Computer Science An Interdisciplinary Approach by Robert Sedgewick; Kevin Wayne"',
        html_url: 'https://github.com/khenderson20/CS_Princeton_Programs',
        homepage: null,
        language: 'Java',
        stargazers_count: 0,
        forks_count: 0,
        created_at: '2022-01-04T07:27:55Z',
        updated_at: '2025-08-05T19:10:22Z',
        topics: ['showcase'],
        fork: false,
        archived: false,
        languages_url: '',
        pushed_at: '2022-01-09T14:21:07Z'
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






