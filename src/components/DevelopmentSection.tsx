import { useState, useEffect } from 'react';
import { Star, GitBranch } from 'lucide-react';
import ProjectCard from './ProjectCard';
import GitHubProjects from './GitHubProjects';
import { PortfolioService } from '../services/portfolioService';
import { Project } from '../types/portfolio';

function DevelopmentSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'featured' | 'github'>('featured');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await PortfolioService.getFeaturedProjects();
        // Transform the data to ensure it matches our Project type
        const transformedData = data.map(project => {
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
          };
        });
        setProjects(transformedData as Project[]);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section className="dev-section" id="development">
      <div className="dev-content">
        <header className="section-header">
          <h2>Technical Projects</h2>
          <p>Showcasing full-stack applications with measurable business impact</p>
        </header>

        {/* Project Tabs */}
        <div className="project-tabs">
          <button
            className={`tab-button ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
            aria-label="View featured projects"
          >
            <Star className="tab-icon" size={16} />
            Featured Projects
          </button>
          <button
            className={`tab-button ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
            aria-label="View GitHub repositories"
          >
            <GitBranch className="tab-icon" size={16} />
            GitHub Repositories
          </button>
        </div>

        {/* Project Content */}
        <div className="projects-content">
          {activeTab === 'featured' && (
            <div className="projects-grid">
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
                projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
          )}
          
          {activeTab === 'github' && (
            <GitHubProjects showAll={false} limit={6} />
          )}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentSection;

