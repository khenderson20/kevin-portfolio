import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  tech: string;
  description: string;
  metrics?: string;
  github?: string;
  demo?: string;
}

function DevelopmentSection() {
  const projects: Project[] = [
    { 
      title: "Portfolio website", 
      tech: "React, TypeScript, Vite, AWS Amplify",
      description: "Portfolio website built with React and TypeScript and deployed on AWS Amplify",
      metrics: "bundle size optimized for fast load times",
      github: "https://github.com/khenderson20",
      demo: "https://demo-link.com"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python"] },
    { category: "Cloud", items: ["AWS", "Docker", "CI/CD"] },
    { category: "Audio", items: ["FFmpeg", "DSP"] }
  ];

  return (
    <section className="dev-section" aria-labelledby="dev-heading">
      <header>
        <h2 id="dev-heading">Technical Projects</h2>
        <p className="section-intro">
          Showcasing full-stack applications with measurable business impact
        </p>
      </header>
      
      <div className="projects-grid" role="region" aria-label="Featured projects">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      
      <div className="skills-section" role="region" aria-labelledby="skills-heading">
        <h3 id="skills-heading">Technical Skills</h3>
        <p className="skills-intro">
          Core technologies and frameworks I use to build modern applications
        </p>
        
        <div className="skills-grid" role="group" aria-labelledby="skills-heading">
          {skills.map((skillGroup, index) => (
            <div 
              key={index} 
              className="skill-group" 
              role="group" 
              aria-labelledby={`skill-category-${index}`}
            >
              <h4 id={`skill-category-${index}`}>{skillGroup.category}</h4>
              <div 
                className="skill-items" 
                role="list" 
                aria-label={`${skillGroup.category} technologies`}
              >
                {skillGroup.items.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="skill-tag" 
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${skill} technology`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DevelopmentSection;



