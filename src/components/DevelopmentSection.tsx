import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Star, GitBranch, Search } from 'lucide-react';
import ProjectCard from './ProjectCard';
import GitHubProjects from './GitHubProjects';
import { PortfolioService } from '../services/portfolioService';
import { Project } from '../types/portfolio';

// Memoize ProjectCard to prevent unnecessary re-renders
const MemoizedProjectCard = memo(ProjectCard);

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
  const categories = ['All', 'Frontend', 'Backend', 'Full-Stack', 'Mobile', 'DevOps'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Add pagination for GitHub projects
  const [githubPage, setGithubPage] = useState(1);

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
      const data = await PortfolioService.getFeaturedProjects();
      const transformedData: Project[] = data.map(project => {
        // Ensure tech is a proper string array
        const techArray = Array.isArray(project.tech)
          ? project.tech.filter((t): t is string => typeof t === 'string' && t !== null)
          : [];

        return {
          id: project.id,
          title: project.title,
          tech: techArray,
          description: project.description,
          metrics: project.metrics || undefined,
          github: project.github || undefined,
          demo: project.demo || undefined,
          image: project.image || undefined,
          featured: project.featured || false,
          category: project.category || undefined,
          createdAt: project.createdAt || undefined,
          updatedAt: project.updatedAt || undefined,
        } as Project;
      });

      setProjects(transformedData);
      setCache(prev => new Map(prev).set(cacheKey, transformedData));
      setRetryCount(0);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
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
      if (activeTab === 'github' && !loading) {
        setGithubPage(prev => prev + 1);
      }
    }, [activeTab, loading])
  );

  return (
    <section className="dev-section" id="development">
      <div className="dev-content">
        <header className="section-header">
          <h2>Technical Projects</h2>
          <p>Showcasing full-stack applications with measurable business impact</p>
        </header>

        {/* Project Tabs */}
        <div 
          className="project-tabs" 
          role="tablist" 
          aria-label="Project categories"
        >
          <button
            className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
            aria-label="View featured projects"
            role="tab"
            aria-selected={activeTab === 'featured'}
            aria-controls="featured-panel"
            id="featured-tab"
            tabIndex={activeTab === 'featured' ? 0 : -1}
          >
            <Star className="tab-icon" size={16} />
            Featured Projects
            <span className="tab-count">{projects.length}</span>
          </button>
          <button
            className={`tab-button ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
            aria-label="View GitHub repositories"
            role="tab"
            aria-selected={activeTab === 'github'}
            aria-controls="github-panel"
            id="github-tab"
            tabIndex={activeTab === 'github' ? 0 : -1}
          >
            <GitBranch className="tab-icon" size={16} />
            GitHub Repositories
            <span className="tab-count">6+</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="projects-filter-bar">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Search projects"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tech Filter */}
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
                <>
                  {filteredProjects.map((project) => (
                    <MemoizedProjectCard key={project.id} project={project} />
                  ))}
                  {filteredProjects.length === 0 && !loading && (
                    <div className="no-results">
                      <p>No projects found matching your criteria.</p>
                    </div>
                  )}
                </>
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
              <GitHubProjects showAll={false} limit={githubPage * PROJECTS_PER_PAGE} />
              <div ref={loadMoreRef} className="load-more-trigger" style={{ height: '20px' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentSection;

