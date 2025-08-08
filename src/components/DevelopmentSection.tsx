import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { DevelopmentIcons, ProjectIcons } from '../constants/icons';
import GitHubProjects from './GitHubProjects';
import HorizontalProjectsContainer from './HorizontalProjectsContainer';
import { PortfolioService } from '../services/portfolioService';
import { Project } from '../types/portfolio';
import { GitHubService } from '../services/githubService';
import { GitHubRepo } from '../types/github';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';



// Implement intersection observer for lazy loading
const useIntersectionObserver = (callback: () => void) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, callback]);

  return setRef;
};

const PROJECTS_PER_PAGE = 6;

function DevelopmentSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'featured' | 'github'>('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'stars' | 'name'>('recent');

  // Add category-based filtering
  const categories = [
    { name: 'All', icon: DevelopmentIcons.layers },
    { name: 'Frontend', icon: DevelopmentIcons.code },
    { name: 'Backend', icon: DevelopmentIcons.database },
    { name: 'Full-Stack', icon: DevelopmentIcons.layers },
    { name: 'Mobile', icon: DevelopmentIcons.mobile },
    { name: 'Data Structures & Algorithms', icon: ProjectIcons.github }
  ];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);


  // GitHub repository count for display
  const [githubRepoCount, setGithubRepoCount] = useState(0);

  // GitHub projects state for incremental loading
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [allGithubRepos, setAllGithubRepos] = useState<GitHubRepo[]>([]);
  const [hasMoreGithubProjects, setHasMoreGithubProjects] = useState(true);

  // Add caching and error retry logic
  const [cache, setCache] = useState<Map<string, Project[]>>(new Map());
  const [retryCount, setRetryCount] = useState(0);

  const loadProjectsWithCache = useCallback(async () => {
    const cacheKey = `projects-${activeTab}`;

    if (cache.has(cacheKey)) {
      setProjects(cache.get(cacheKey)!);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Get both database projects and GitHub showcase repos
      const [dbProjects, githubShowcaseRepos] = await Promise.all([
        PortfolioService.getFeaturedProjects(),
        GitHubService.getSpecificRepos() // This already filters for showcase/portfolio topics
      ]);
      
      // Transform GitHub repos to Project format (without code snippets)
      const githubProjects = await Promise.all(
        githubShowcaseRepos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );
      
      // Combine both sources
      const allProjects = [...dbProjects, ...githubProjects];
      
      if (!allProjects || !Array.isArray(allProjects)) {
        console.warn('No project data received or data is not an array');
        setProjects([]);
        return;
      }

      // Transform and filter data
      const transformedData = allProjects.map(project => {
        // Add null check for project
        if (!project) return null;

        const techArray = Array.isArray(project.tech)
          ? project.tech.filter((t): t is string => typeof t === 'string' && t !== null)
          : [];

        return {
          id: project.id,
          title: project.title || 'Untitled Project',
          tech: techArray,
          description: project.description || 'No description available',
          metrics: project.metrics || undefined,
          github: project.github || undefined,
          demo: project.demo || undefined,
          image: project.image || undefined,
          featured: project.featured || false,
          category: project.category || undefined,
          createdAt: project.createdAt || undefined,
          updatedAt: project.updatedAt || undefined,
        } as Project;
      }).filter(Boolean) as Project[]; // Remove null entries

      setProjects(transformedData);
      setCache(prev => new Map(prev).set(cacheKey, transformedData));
      setRetryCount(0);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
      setProjects([]); // Set empty array on error
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          loadProjectsWithCache();
        }, 1000 * Math.pow(2, retryCount));
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, retryCount, cache]);

  useEffect(() => {
    loadProjectsWithCache();
  }, [loadProjectsWithCache]);

  // Load GitHub repository count and initial repos
  useEffect(() => {
    const loadGithubData = async () => {
      try {
        const repos = await GitHubService.getUserRepos();
        setGithubRepoCount(repos.length);
        setAllGithubRepos(repos);
      } catch (error) {
        console.error('Error loading GitHub repo count:', error);
        setGithubRepoCount(0);
        setAllGithubRepos([]);
      }
    };

    loadGithubData();
  }, []);

  // Function to load initial GitHub projects
  const loadInitialGithubProjects = useCallback(async () => {
    if (githubLoading || allGithubRepos.length === 0) return;

    try {
      setGithubLoading(true);
      setGithubError(null);

      const initialRepos = allGithubRepos.slice(0, PROJECTS_PER_PAGE);
      const projectsWithLanguages = await Promise.all(
        initialRepos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );

      setGithubProjects(projectsWithLanguages);
      setHasMoreGithubProjects(allGithubRepos.length > PROJECTS_PER_PAGE);
    } catch (error) {
      console.error('Error loading initial GitHub projects:', error);
      setGithubError('Failed to load GitHub projects');
    } finally {
      setGithubLoading(false);
    }
  }, [allGithubRepos, githubLoading]);

  // Function to load more GitHub projects
  const loadMoreGithubProjects = useCallback(async () => {
    if (githubLoading || !hasMoreGithubProjects) return;

    console.log('🔄 Loading more GitHub projects...', {
      currentCount: githubProjects.length,
      totalAvailable: allGithubRepos.length
    });

    try {
      setGithubLoading(true);
      setGithubError(null);

      const startIndex = githubProjects.length;
      const endIndex = startIndex + PROJECTS_PER_PAGE;
      const newRepos = allGithubRepos.slice(startIndex, endIndex);

      if (newRepos.length === 0) {
        setHasMoreGithubProjects(false);
        return;
      }

      const newProjectsWithLanguages = await Promise.all(
        newRepos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );

      setGithubProjects(prev => {
        const updated = [...prev, ...newProjectsWithLanguages];
        console.log('✅ GitHub projects updated:', {
          previousCount: prev.length,
          newCount: updated.length,
          addedCount: newProjectsWithLanguages.length
        });
        return updated;
      });
      setHasMoreGithubProjects(endIndex < allGithubRepos.length);
    } catch (error) {
      console.error('Error loading more GitHub projects:', error);
      setGithubError('Failed to load more GitHub projects');
    } finally {
      setGithubLoading(false);
    }
  }, [allGithubRepos, githubProjects.length, githubLoading, hasMoreGithubProjects]);

  // Load initial GitHub projects when tab becomes active
  useEffect(() => {
    if (activeTab === 'github' && allGithubRepos.length > 0 && githubProjects.length === 0) {
      loadInitialGithubProjects();
    }
  }, [activeTab, allGithubRepos, githubProjects.length, loadInitialGithubProjects]);

  // Add filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = !selectedTech || project.tech.includes(selectedTech);
      const matchesCategory = selectedCategory === 'All' ||
                             (project.category && project.category.toLowerCase() === selectedCategory.toLowerCase()) ||
                             (selectedCategory === 'Full-Stack' && project.category === 'fullstack');
      return matchesSearch && matchesTech && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'stars') {
        const aStars = parseInt(a.metrics?.split(' ')[0] || '0');
        const bStars = parseInt(b.metrics?.split(' ')[0] || '0');
        return bStars - aStars;
      }
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    });
  }, [projects, searchTerm, selectedTech, selectedCategory, sortBy]);

  // Add keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const tabs = ['featured', 'github'] as const;
      const currentIndex = tabs.indexOf(activeTab);
      const nextIndex = e.key === 'ArrowRight' 
        ? (currentIndex + 1) % tabs.length 
        : (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    }
  }, [activeTab]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Intersection observer for GitHub pagination
  const loadMoreRef = useIntersectionObserver(
    useCallback(() => {
      if (activeTab === 'github' && !githubLoading && hasMoreGithubProjects) {
        loadMoreGithubProjects();
      }
    }, [activeTab, githubLoading, hasMoreGithubProjects, loadMoreGithubProjects])
  );

  // Animation setup
  useEffect(() => {
    // Optimized delay to ensure DOM elements are fully rendered after lazy loading
    const timer = setTimeout(() => {
      // Section entrance animation - using ScrollTrigger for smooth entrance
      animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20, // Reduced from 40 to prevent overflow
        scrollTrigger: true,
      });

      // Header animation - with scroll trigger for better visual impact
      animations.fadeIn(headerRef.current, {
        duration: 1,
        delay: 0.2,
        y: 30,
        scrollTrigger: true,
      });

      // Tabs animation - with scroll trigger for better UX
      animations.fadeIn(tabsRef.current, {
        duration: 0.8,
        delay: 0.3,
        y: 20,
        scrollTrigger: true,
      });

      // Filters animation - with scroll trigger for better UX
      animations.fadeIn(filtersRef.current, {
        duration: 0.8,
        delay: 0.4,
        y: 20,
        scrollTrigger: true,
      });
    }, 150); // Optimized delay for DOM readiness

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this section only
      killScrollTriggersFor([
        sectionRef.current,
        headerRef.current,
        tabsRef.current,
        filtersRef.current,
      ]);
      killTweensFor([
        sectionRef.current,
        headerRef.current,
        tabsRef.current,
        filtersRef.current,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-6 px-12 overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container-responsive relative z-10 section-content-container">
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <DevelopmentIcons.code className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-200 font-medium">Development</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="gradient-text">Technical Projects</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Showcasing full-stack applications with measurable business impact and modern technologies
          </p>
        </header>

        {/* Project Tabs */}
        <div
          ref={tabsRef}
          className="flex justify-center mb-12"
          role="tablist"
          aria-label="Project categories"
        >
          <div className="glass-effect rounded-xl p-2 flex gap-2">
            <button
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'featured'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('featured')}
              aria-label="View featured projects"
              role="tab"
              aria-selected={activeTab === 'featured'}
              aria-controls="featured-panel"
              id="featured-tab"
              tabIndex={activeTab === 'featured' ? 0 : -1}
            >
              <ProjectIcons.star size={16} />
              Featured Projects
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{projects.length}</span>
            </button>
            <button
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'github'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab('github')}
              aria-label="View GitHub repositories"
              role="tab"
              aria-selected={activeTab === 'github'}
              aria-controls="github-panel"
              id="github-tab"
              tabIndex={activeTab === 'github' ? 0 : -1}
            >
              <ProjectIcons.github size={16} />
              GitHub Repositories
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{githubRepoCount || '6+'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters - Only show for Featured Projects */}
        {activeTab === 'featured' && (
          <div ref={filtersRef} className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                    aria-pressed={selectedCategory === category.name}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search and Controls */}
        <div className="projects-filter-bar">
          <div className="search-container">
            <DevelopmentIcons.search size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search projects"
            />
          </div>

          <div className="filter-controls">
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="tech-filter-select"
              aria-label="Filter by technology"
            >
              <option value="">All Technologies</option>
              {Array.from(new Set(projects.flatMap(p => p.tech))).sort().map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'stars' | 'name')}
              className="sort-select"
              aria-label="Sort projects"
            >
              <option value="recent">Most Recent</option>
              <option value="stars">Most Stars</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Project Content */}
        <div className="projects-content">
          {error && (
            <div className="error-message" role="alert">
              <p>{error}</p>
              <button onClick={() => loadProjectsWithCache()} className="retry-button">
                Retry
              </button>
            </div>
          )}

          {activeTab === 'featured' && (
            <div
              role="tabpanel"
              id="featured-panel"
              aria-labelledby="featured-tab"
              hidden={activeTab !== 'featured'}
            >
              {loading ? (
                <div className="loading-skeleton">
                  {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="skeleton-project-card">
                      <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-tech"></div>
                        <div className="skeleton-description">
                          <div className="skeleton-line"></div>
                          <div className="skeleton-line"></div>
                          <div className="skeleton-line"></div>
                        </div>
                        <div className="skeleton-buttons">
                          <div className="skeleton-button"></div>
                          <div className="skeleton-button"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <HorizontalProjectsContainer
                  projects={filteredProjects}
                  loading={loading}
                />
              )}
            </div>
          )}

          {activeTab === 'github' && (
            <div
              role="tabpanel"
              id="github-panel"
              aria-labelledby="github-tab"
              hidden={activeTab !== 'github'}
            >
              <GitHubProjects
                projects={githubProjects}
                loading={githubLoading}
                error={githubError}
                hasMore={hasMoreGithubProjects}
              />
              <div ref={loadMoreRef} className="load-more-trigger" style={{ height: '20px' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DevelopmentSection;

