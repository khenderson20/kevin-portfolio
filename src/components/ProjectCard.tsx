interface Project {
  title: string;
  tech: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p className="tech-stack">{project.tech}</p>
      <p>{project.description}</p>
      <div className="project-links">
        <button className="btn-link">Live Demo</button>
        <button className="btn-link">GitHub</button>
      </div>
    </div>
  );
}

export default ProjectCard;