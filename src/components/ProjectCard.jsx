const ProjectCard = ({ project }) => {
  return (
    <article className="project-card-v2">
      <div className="project-visual">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay">
          <div className="project-actions">
            <a href={project.liveUrl} className="action-primary">View Live</a>
            <a href={project.githubUrl} className="action-secondary">Code</a>
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-year">{project.year}</span>
        </div>
        
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-tech">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-pill">{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
};