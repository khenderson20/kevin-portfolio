interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

interface GitHubStats {
  user: GitHubUser;
  totalRepos: number;
  originalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: string[];
  yearsExperience: number;
  showcaseRepos: number;
  topLanguages: { language: string; count: number }[];
}

export class GitHubStatsService {
  private static readonly BASE_URL = 'https://api.github.com';
  private static readonly USERNAME = 'khenderson20';
  private static cache: GitHubStats | null = null;
  private static cacheTimestamp = 0;
  private static readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    };

    try {
      const token = import.meta.env?.VITE_GITHUB_TOKEN;
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }
    } catch (error) {
      console.warn('Environment variable access error:', error);
    }

    return headers;
  }

  private static isCacheValid(): boolean {
    return this.cache !== null && Date.now() - this.cacheTimestamp < this.CACHE_DURATION;
  }

  static async getGitHubStats(): Promise<GitHubStats> {
    if (this.isCacheValid()) {
      return this.cache!;
    }

    try {
      // Fetch user data and repositories in parallel
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`${this.BASE_URL}/users/${this.USERNAME}`, { headers: this.getHeaders() }),
        fetch(`${this.BASE_URL}/users/${this.USERNAME}/repos?sort=updated&per_page=100`, { headers: this.getHeaders() })
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to fetch GitHub data');
      }

      const user: GitHubUser = await userResponse.json();
      const repos: GitHubRepo[] = await reposResponse.json();

      // Calculate statistics
      const originalRepos = repos.filter(repo => !repo.fork && !repo.archived);
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      // Get unique languages
      const languages = [...new Set(repos
        .map(repo => repo.language)
        .filter((lang): lang is string => lang !== null)
      )];

      // Calculate years of experience
      const accountCreated = new Date(user.created_at);
      const yearsExperience = Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365));

      // Count showcase repositories
      const showcaseRepos = repos.filter(repo => 
        repo.topics.includes('showcase') || 
        repo.topics.includes('portfolio') ||
        repo.topics.includes('featured')
      ).length;

      // Calculate top languages by repository count
      const languageCounts = languages.reduce((acc, lang) => {
        acc[lang] = repos.filter(repo => repo.language === lang).length;
        return acc;
      }, {} as Record<string, number>);

      const topLanguages = Object.entries(languageCounts)
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      const stats: GitHubStats = {
        user,
        totalRepos: repos.length,
        originalRepos: originalRepos.length,
        totalStars,
        totalForks,
        languages,
        yearsExperience,
        showcaseRepos,
        topLanguages
      };

      // Cache the results
      this.cache = stats;
      this.cacheTimestamp = Date.now();

      return stats;
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      
      // Return fallback data based on the real data we know
      return this.getFallbackStats();
    }
  }

  private static getFallbackStats(): GitHubStats {
    return {
      user: {
        login: 'khenderson20',
        name: 'Kevin Henderson',
        bio: 'synth enthusiast | developer | creative\r\n|\r\n"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better."',
        company: 'University of Texas at San Antonio',
        location: 'USA',
        followers: 16,
        following: 66,
        public_repos: 11,
        public_gists: 0,
        created_at: '2016-12-01T18:45:58Z',
        updated_at: '2025-07-28T11:46:58Z'
      },
      totalRepos: 11,
      originalRepos: 10,
      totalStars: 0,
      totalForks: 0,
      languages: ['CSS', 'Vue', 'JavaScript', 'C', 'C++', 'Java', 'HTML', 'Python'],
      yearsExperience: 8,
      showcaseRepos: 6,
      topLanguages: [
        { language: 'JavaScript', count: 2 },
        { language: 'C', count: 1 },
        { language: 'C++', count: 1 },
        { language: 'Java', count: 1 },
        { language: 'Vue', count: 1 }
      ]
    };
  }

  // Helper methods for specific stats
  static async getYearsExperience(): Promise<number> {
    const stats = await this.getGitHubStats();
    return stats.yearsExperience;
  }

  static async getRepositoryCount(): Promise<number> {
    const stats = await this.getGitHubStats();
    return stats.totalRepos;
  }

  static async getLanguageCount(): Promise<number> {
    const stats = await this.getGitHubStats();
    return stats.languages.length;
  }

  static async getFollowerCount(): Promise<number> {
    const stats = await this.getGitHubStats();
    return stats.user.followers;
  }

  static async getUserBio(): Promise<string> {
    const stats = await this.getGitHubStats();
    return stats.user.bio;
  }

  static async getTopLanguages(): Promise<{ language: string; count: number }[]> {
    const stats = await this.getGitHubStats();
    return stats.topLanguages;
  }
}
