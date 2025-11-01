import { ProjectIcons } from '../constants/icons';
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
      .replace('nodejs', 'node')
      .replace('reactjs', 'react')
      .replace('vuejs', 'vue')
      .replace('angularjs', 'angular');
  };

  const getCategoryDisplayName = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'dsa':
        return 'Data Structures & Algorithms';
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'fullstack':
        return 'Full-Stack';
      case 'mobile':
        return 'Mobile';
      case 'audio':
        return 'Audio';
      default:
        return category;
    }
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
      {project.image && (
        <img src={project.image} alt={`${project.title} preview`} className="project-image" />
      )}
      <header>
        <div className="project-header-top">
          <h3 id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}>
            {project.title}
          </h3>
          {project.category && (
            <span className="project-category-badge" data-category={project.category}>
              {getCategoryDisplayName(project.category)}
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
              <ProjectIcons.stats size={16} className="metrics-icon" aria-label="Metrics" />
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
            <ProjectIcons.external size={14} />
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
            <ProjectIcons.github size={14} />
            GitHub
          </a>
        )}
      </footer>
    </article>
    </Card3D>
  );
}

export default ProjectCard;

