import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { Project } from '../types/portfolio';

interface GitHubProjectsProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  hasMore?: boolean;
}

export default function GitHubProjects({
  projects,
  loading,
  error,
  hasMore = false
}: GitHubProjectsProps) {

  if (loading && projects.length === 0) {
    return <div className="loading-skeleton">Loading GitHub projects...</div>;
  }

  if (error && projects.length === 0) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="github-projects">
      <div className="projects-header">
        <h3>
          <FaGithub className="github-icon" />
          Latest from GitHub
        </h3>
        <a 
          href="https://github.com/khenderson20" 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-all-link"
        >
          View All Repositories
          <FaExternalLinkAlt />
        </a>
      </div>
      
      <div className="github-projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="github-project-card">
            <div className="project-header">
              <h4>{project.title}</h4>
              <div className="project-stats">
                {project.metrics && (
                  <span className="stats">
                    <FaStar /> {project.metrics.split(' ')[0]}
                    <FaCodeBranch /> {project.metrics.split('•')[1]?.trim().split(' ')[0]}
                  </span>
                )}
              </div>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.tech.map((tech: string, index: number) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                <FaGithub /> Code
              </a>
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaExternalLinkAlt /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator for pagination */}
      {loading && projects.length > 0 && (
        <div className="loading-more">
          <div className="loading-spinner"></div>
          <span>Loading more repositories...</span>
        </div>
      )}

      {/* Error indicator for pagination */}
      {error && projects.length > 0 && (
        <div className="error-message-inline">
          <span>Failed to load more repositories. Please try again.</span>
        </div>
      )}

      {/* End of results indicator */}
      {!loading && !error && projects.length > 0 && !hasMore && (
        <div className="end-of-results">
          <span>All repositories loaded</span>
        </div>
      )}
    </div>
  );
}