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

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
}

interface GitHubActivity {
  recentCommits: number;
  lastCommitDate: string;
  lastActiveRepo: string;
  totalEventsToday: number;
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
  activity: GitHubActivity;
}

export class GitHubStatsService {
  private static readonly BASE_URL = 'https://api.github.com';
  // Same-origin GitHub proxy (Amplify Function/API) to keep tokens server-side.
  // If not configured, we fall back to direct public GitHub API requests.
  private static readonly PROXY_BASE_URL = '/github';
  private static readonly USERNAME = 'khenderson20';
  private static cache: GitHubStats | null = null;
  private static cacheTimestamp = 0;
  private static readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    };
    // IMPORTANT: do not attach any token from import.meta.env here.
    // Any VITE_* value is embedded into the browser bundle and becomes public.
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
      // Fetch user data, repositories, and recent activity in parallel
      const proxyFetchOrFallback = async (proxyPath: string, fallbackPath: string) => {
        const proxyUrl = `${this.PROXY_BASE_URL}${proxyPath}`;
        let res = await fetch(proxyUrl, { headers: this.getHeaders() });
        if (!res.ok) {
          res = await fetch(`${this.BASE_URL}${fallbackPath}`, { headers: this.getHeaders() });
        }
        return res;
      };

      const [userResponse, reposResponse, eventsResponse] = await Promise.all([
        proxyFetchOrFallback('/user', `/users/${this.USERNAME}`),
        proxyFetchOrFallback('/repos', `/users/${this.USERNAME}/repos?sort=updated&per_page=100`),
        proxyFetchOrFallback('/events', `/users/${this.USERNAME}/events?per_page=30`),
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('Failed to fetch GitHub data');
      }

      const user: GitHubUser = await userResponse.json();
      const repos: GitHubRepo[] = await reposResponse.json();

      // Parse events for activity (fallback to empty array if events fail)
      let events: GitHubEvent[] = [];
      if (eventsResponse.ok) {
        events = await eventsResponse.json();
      }

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

      // Calculate activity metrics
      const activity = this.calculateActivity(events);

      const stats: GitHubStats = {
        user,
        totalRepos: repos.length,
        originalRepos: originalRepos.length,
        totalStars,
        totalForks,
        languages,
        yearsExperience,
        showcaseRepos,
        topLanguages,
        activity
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

  private static calculateActivity(events: GitHubEvent[]): GitHubActivity {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Filter push events (commits) from the last 7 days
    const recentPushEvents = events.filter(event =>
      event.type === 'PushEvent' &&
      new Date(event.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    // Count total commits in recent push events
    const recentCommits = recentPushEvents.reduce((total, event) => {
      return total + (event.payload.commits?.length || 0);
    }, 0);

    // Find last commit date
    const lastCommitDate = recentPushEvents.length > 0
      ? recentPushEvents[0].created_at
      : '';

    // Find last active repository
    const lastActiveRepo = recentPushEvents.length > 0
      ? recentPushEvents[0].repo.name.split('/')[1]
      : '';

    // Count events today
    const totalEventsToday = events.filter(event =>
      new Date(event.created_at) >= todayStart
    ).length;

    return {
      recentCommits,
      lastCommitDate,
      lastActiveRepo,
      totalEventsToday
    };
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
      ],
      activity: {
        recentCommits: 5,
        lastCommitDate: new Date().toISOString(),
        lastActiveRepo: 'kevin-portfolio',
        totalEventsToday: 2
      }
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

  static async getRecentActivity(): Promise<GitHubActivity> {
    const stats = await this.getGitHubStats();
    return stats.activity;
  }

  static async getRecentCommitCount(): Promise<number> {
    const stats = await this.getGitHubStats();
    return stats.activity.recentCommits;
  }

  static async getLastActiveRepo(): Promise<string> {
    const stats = await this.getGitHubStats();
    return stats.activity.lastActiveRepo;
  }
}
