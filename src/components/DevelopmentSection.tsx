
import ProjectCard from './ProjectCard';
import SkillProgressBar from './SkillProgressBar';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import ParticleBackground from './ParticleBackground';

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
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "Tailwind CSS", level: 75 }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 70 }
      ]
    },
    {
      category: "Cloud",
      items: [
        { name: "AWS", level: 45 },
        { name: "Docker", level: 30 },
        { name: "CI/CD", level: 30 }
      ]
    },
    {
      category: "Audio",
      items: [
        { name: "FFmpeg", level: 35 },
        { name: "DSP", level: 25 }
      ]
    }
  ];

  const stats = [
    { label: "Projects Completed", value: 25, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Technologies Mastered", value: 15, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" }
  ];

  return (
    <section className="dev-section" id="development" aria-labelledby="dev-heading">
      <ParticleBackground
        particleCount={250}
        particleColor="hsla(186, 85%, 54%, 0.8)" // Primary color with alpha
        speed={0.7}
        interactive={true}
      />

      <header>
        <h2 id="dev-heading">Technical Projects</h2>
        <p className="section-intro">
          Showcasing full-stack applications with measurable business impact
        </p>

        {/* Stats Section */}
        <div className="stats-grid" role="region" aria-label="Development statistics">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2000}
                  delay={index * 200}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </header>

      <div className="projects-grid" role="region" aria-label="Featured projects">
        {projects.map((project, index) => (
          <InteractiveCard
            key={index}
            glowEffect={true}
            tiltEffect={true}
            scaleOnHover={true}
            shadowIntensity="medium"
            className="project-card-wrapper"
          >
            <ProjectCard project={project} />
          </InteractiveCard>
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
              <div className="skill-progress-list">
                {skillGroup.items.map((skill, skillIndex) => (
                  <SkillProgressBar
                    key={skillIndex}
                    skill={skill.name}
                    level={skill.level}
                    category={skillGroup.category}
                    delay={index * 100 + skillIndex * 50}
                    showPercentage={false}
                  />
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






