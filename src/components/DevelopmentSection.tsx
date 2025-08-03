import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  tech: string;
  description: string;
}

function DevelopmentSection() {
  const projects: Project[] = [
    { 
      title: "Music Visualizer", 
      tech: "React, Web Audio API", 
      description: "Real-time audio visualization tool"
    },
    { 
      title: "Beat Sequencer", 
      tech: "JavaScript, Tone.js", 
      description: "Browser-based drum machine"
    },
    { 
      title: "Portfolio Site", 
      tech: "React, AWS Amplify", 
      description: "This very portfolio you're viewing"
    }
  ];

  return (
    <section className="dev-section">
      <h2>Development Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default DevelopmentSection;