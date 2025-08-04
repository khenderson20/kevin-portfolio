
import ProjectCard from './ProjectCard';
import SkillProgressBar from './SkillProgressBar';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import ParticleBackground from './ParticleBackground';
import { 
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiPython, SiAmazonwebservices, SiDocker
} from 'react-icons/si';
import { FaGithubAlt, FaCode, FaServer, FaCloud, FaMusic, FaVideo } from 'react-icons/fa';

// Add icon mapping
const iconMap = {
  react: SiReact,
  typescript: SiTypescript,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  python: SiPython,
  aws: SiAmazonwebservices,
  docker: SiDocker,
  'github-actions': FaGithubAlt,
  code: FaCode,
  server: FaServer,
  cloud: FaCloud,
  music: FaMusic,
  video: FaVideo,
  waveform: FaMusic // fallback for DSP
};

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
      icon: "code",
      items: [
        { name: "React", level: 90, icon: "react" },
        { name: "TypeScript", level: 85, icon: "typescript" },
        { name: "Next.js", level: 80, icon: "nextjs" },
        { name: "Tailwind CSS", level: 75, icon: "tailwindcss" }
      ]
    },
    {
      category: "Backend",
      icon: "server",
      items: [
        { name: "Node.js", level: 85, icon: "nodejs" },
        { name: "Python", level: 70, icon: "python" }
      ]
    },
    {
      category: "Cloud",
      icon: "cloud",
      items: [
        { name: "AWS", level: 45, icon: "aws" },
        { name: "Docker", level: 30, icon: "docker" },
        { name: "CI/CD", level: 30, icon: "github-actions" }
      ]
    },
    {
      category: "Audio",
      icon: "music",
      items: [
        { name: "FFmpeg", level: 35, icon: "video" },
        { name: "DSP", level: 25, icon: "waveform" }
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
        particleColor="hsla(186, 85%, 54%, 0.8)"
        speed={0.7}
        interactive={true}
      />

      <div className="dev-content">
        {/* Section Header */}
        <header className="section-header">
          <h2 id="dev-heading">Technical Projects</h2>
          <p className="section-intro">
            Showcasing full-stack applications with measurable business impact
          </p>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid" role="region" aria-label="Development statistics">
          {stats.map((stat, index) => (
            <InteractiveCard
              key={index}
              glowEffect={true}
              tiltEffect={false}
              scaleOnHover={true}
              shadowIntensity="low"
              className="stat-card-wrapper"
            >
              <div className="stat-item">
                <div className="stat-value">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={1000}
                    delay={index * 200}
                  />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="projects-section">
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
        </div>
        
        {/* Technical Skills */}
        <div className="skills-section" role="region" aria-labelledby="skills-heading">
          <div className="skills-header">
            <h3 id="skills-heading">Technical Skills</h3>
            <p className="skills-intro">
              Core technologies and frameworks I use to build modern applications
            </p>
          </div>

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
                      icon={iconMap[skill.icon as keyof typeof iconMap]}
                      delay={index * 100 + skillIndex * 50}
                      showPercentage={false}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DevelopmentSection;












