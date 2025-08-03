interface Project {
  title: string;
  tech: string;
  description: string;
  metrics?: string;
  github?: string;
  demo?: string;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card" role="article" aria-labelledby={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <header>
        <h3 id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}>
          {project.title}
        </h3>
        <p className="tech-stack" aria-label="Technologies used">
          <strong>Tech Stack:</strong> {project.tech}
        </p>
      </header>
      
      <div className="project-content">
        <p className="project-description">
          {project.description}
        </p>
        
        {project.metrics && (
          <div className="project-metrics" role="region" aria-label="Project impact metrics">
            <p>
              <span aria-label="Metrics">📊</span>
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
            GitHub
          </a>
        )}
      </footer>
    </article>
  );
}

export default ProjectCard;

