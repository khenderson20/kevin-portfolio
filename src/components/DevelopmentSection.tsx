
import ProjectCard from './ProjectCard';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import ParticleBackground from './ParticleBackground';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiPython, SiAmazonwebservices, SiDocker
} from 'react-icons/si';
import { FaGithubAlt, FaCode, FaServer, FaCloud, FaMusic, FaVideo } from 'react-icons/fa';

/**
 * Icon mapping object that associates string keys with React icon components.
 * Used to dynamically render icons based on skill/technology names.
 *
 * @constant
 * @type {Record<string, React.ComponentType>}
 */
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

/**
 * Interface defining the structure of a project object.
 * Used to type-check project data displayed in the portfolio.
 */
interface Project {
  /** The display name of the project */
  title: string;
  /** Comma-separated list of technologies used */
  tech: string;
  /** Brief description of the project and its purpose */
  description: string;
  /** Optional performance metrics or achievements */
  metrics?: string;
  /** Optional GitHub repository URL */
  github?: string;
  /** Optional live demo URL */
  demo?: string;
}

/**
 * DevelopmentSection Component
 *
 * A comprehensive portfolio section showcasing development skills, projects, and achievements.
 * Features animated counters, skill displays, project cards, and interactive elements.
 *
 * Key Features:
 * - Intersection Observer for scroll-triggered animations
 * - Category filtering for projects
 * - Animated statistics counters
 * - Skill display with icons and names
 * - Interactive project cards with hover effects
 * - Particle background animation
 *
 * @component
 * @returns {JSX.Element} The rendered development portfolio section
 */
function DevelopmentSection() {
  /**
   * Array of project objects to be displayed in the portfolio.
   * Each project includes title, technologies used, description, and optional links.
   *
   * @type {Project[]}
   */
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

  /**
   * Array of skill categories with their respective technologies.
   * Each category contains an icon identifier and an array of individual skills.
   *
   * @type {Array<{category: string, icon: string, items: Array<{name: string, icon: string}>}>}
   */
  const skills = [
    {
      category: "Frontend",
      icon: "code",
      items: [
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind CSS", icon: "tailwindcss" }
      ]
    },
    {
      category: "Backend",
      icon: "server",
      items: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Python", icon: "python" }
      ]
    },
    {
      category: "Cloud",
      icon: "cloud",
      items: [
        { name: "AWS", icon: "aws" },
        { name: "Docker", icon: "docker" },
        { name: "CI/CD", icon: "github-actions" }
      ]
    },
    {
      category: "Audio",
      icon: "music",
      items: [
        { name: "FFmpeg", icon: "video" },
        { name: "DSP", icon: "waveform" }
      ]
    }
  ];

  /**
   * Array of statistical achievements to display in animated counters.
   * Each stat includes a descriptive label, numerical value, and optional suffix.
   * Values are animated from 0 to the target value when the section becomes visible.
   *
   * @type {Array<{label: string, value: number, suffix: string}>}
   */
  const stats = [
    { label: "Projects Completed", value: 25, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Technologies Mastered", value: 15, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" }
  ];

  return (
    <section className="dev-section" id="development" aria-labelledby="dev-heading">
      {/* Animated particle background for visual enhancement */}
      <ParticleBackground
        particleCount={250}
        particleColor="hsla(186, 85%, 54%, 0.8)"
        speed={0.7}
        interactive={true}
      />

      <div className="dev-content">
        {/* Section Header - Main title and introduction */}
        <header className="section-header">
          <h2 id="dev-heading">Technical Projects</h2>
          <p className="section-intro">
            Showcasing full-stack applications with measurable business impact
          </p>
        </header>

        {/* Stats Grid - Animated achievement counters */}
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

        {/* Featured Projects - Interactive project showcase cards */}
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

        {/* Technical Skills - Categorized skill display with icons */}
        <div className="skills-section" role="region" aria-labelledby="skills-heading">
          <div className="skills-header">
            <h3 id="skills-heading">Technical Skills</h3>
            <p className="skills-intro">
              Core technologies and frameworks I use to build modern applications
            </p>
          </div>

          {/* Skills Grid - Organized by technology categories with icons */}
          <div className="skills-grid" role="group" aria-labelledby="skills-heading">
            {skills.map((skillGroup, index) => {
              const CategoryIconComponent = iconMap[skillGroup.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="skill-group"
                  role="group"
                  aria-labelledby={`skill-category-${index}`}
                >
                  <h4 id={`skill-category-${index}`} className={`skill-category-heading skill-category-${skillGroup.category.toLowerCase()}`}>
                    {CategoryIconComponent && (
                      <span className="skill-category-icon">
                        <CategoryIconComponent />
                      </span>
                    )}
                    <span className="skill-category-text">{skillGroup.category}</span>
                  </h4>
                  <div className="skill-list">
                    {/* Individual skills with icons and names */}
                    {skillGroup.items.map((skill, skillIndex) => {
                      const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
                      return (
                        <div key={skillIndex} className="skill-item">
                          {IconComponent && (
                            <span className="skill-icon">
                              <IconComponent />
                            </span>
                          )}
                          <span className="skill-name">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Export the DevelopmentSection component as the default export.
 * This component serves as a comprehensive portfolio showcase featuring:
 * - Animated statistics and achievements
 * - Interactive project cards with hover effects
 * - Categorized skill display with icons and names
 * - Particle background animation
 * - Accessibility-compliant markup with ARIA labels
 */
export default DevelopmentSection;
