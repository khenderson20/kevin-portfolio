import { ExternalLink, GitBranch, BarChart3 } from 'lucide-react';
import { Project } from '../types/portfolio';
import Card3D from './Card3D';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  // Helper function to normalize tech names for data attributes
  const normalizeTechName = (tech: string): string => {
    return tech.toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '')
      .replace('javascript', 'javascript')
      .replace('typescript', 'typescript')
      .replace('nodejs', 'node')
      .replace('reactjs', 'react')
      .replace('vuejs', 'vue')
      .replace('angularjs', 'angular');
  };

  return (
    <Card3D
      className="project-card"
      intensity={0.8}
      enableMouseTracking={true}
    >
      <article
        className="project-card"
        data-category={project.category}
        role="article"
        aria-labelledby={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
      >
      <header>
        <div className="project-header-top">
          <h3 id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}>
            {project.title}
          </h3>
          {project.category && (
            <span className="project-category-badge" data-category={project.category}>
              {project.category}
            </span>
          )}
        </div>
        <div className="tech-stack" aria-label="Technologies used">
          <div className="tech-stack-label">Tech Stack:</div>
          <div className="tech-badges">
            {(project.tech || []).map((tech, index) => (
              <span
                key={index}
                className="tech-badge"
                data-tech={normalizeTechName(tech)}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </header>
      
      <div className="project-content">
        <p className="project-description">
          {project.description}
        </p>
        
        {project.metrics && (
          <div className="project-metrics" role="region" aria-label="Project impact metrics">
            <p>
              <BarChart3 size={16} className="metrics-icon" aria-label="Metrics" />
              <strong>Impact:</strong> {project.metrics}
            </p>
          </div>
        )}
      </div>
      
      <footer className="project-links" role="group" aria-label="Project links">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
            aria-label={`View live demo of ${project.title}`}
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
            aria-label={`View source code for ${project.title} on GitHub`}
          >
            <GitBranch size={14} />
            GitHub
          </a>
        )}
      </footer>
    </article>
    </Card3D>
  );
}

export default ProjectCard;

