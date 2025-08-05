import { useState, useEffect } from 'react';
import { GitHubService } from '../services/githubService';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { Project } from '../types/portfolio';

interface GitHubProjectsProps {
  showAll?: boolean;
  limit?: number;
}

export default function GitHubProjects({ showAll = false, limit = 6 }: GitHubProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubProjects = async () => {
      try {
        setLoading(true);
        const repos = showAll 
          ? await GitHubService.getUserRepos()
          : await GitHubService.getSpecificRepos();
        
        const projectsWithLanguages = await Promise.all(
          repos.slice(0, limit).map(async (repo) => {
            const languages = await GitHubService.getRepoLanguages(repo.name);
            return GitHubService.transformToPortfolioProject(repo, languages);
          })
        );
        
        setProjects(projectsWithLanguages);
      } catch (err) {
        setError('Failed to load GitHub projects');
        console.error('Error loading GitHub projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubProjects();
  }, [showAll, limit]);

  if (loading) {
    return <div className="loading-skeleton">Loading GitHub projects...</div>;
  }

  if (error) {
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
    </div>
  );
}