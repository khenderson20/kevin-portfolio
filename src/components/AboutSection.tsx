import { useRef, useEffect } from 'react';
import { DevelopmentIcons } from '../constants/icons';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

function AboutSection() {
  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const experience = [
    {
      role: "DevOps Developer Intern",
      company: "International Business Machines (IBM)",
      period: "May 2025 – August 2025",
      type: "enterprise", // For color theming
      achievements: [
        "Developed Security and Compliance Center features for enterprise cloud infrastructure",
        "Collaborated in Scrum/Agile development processes with cross-functional teams",
        "Explored IBM Watsonx AI platform capabilities for automated DevOps workflows",
        "Resolved critical bugs and implemented performance optimizations across multiple services"
      ]
    },
    {
      role: "Undergraduate Research Assistant",
      company: "University of Texas at San Antonio",
      period: "Jan 2023 – Present",
      type: "research", // For color theming
      achievements: [
        "Built responsive web applications using React and Python for research data collection",
        "Managed Git version control across 14+ repositories with collaborative development workflows",
        "Implemented documentation systems using pydantic schemas and mkdocs for API standardization",
        "Created interactive data visualizations with Streamlit and Pandas for research analysis"
      ]
    },
    {
      role: "Application Solutions Analyst",
      company: "City of San Antonio",
      period: "Feb 2022 – July 2022",
      type: "government", // For color theming
      achievements: [
        "Supported 5 City Departments with Fleet Management Software implementation and maintenance",
        "Resolved technical tickets for each City Department individually with on-call and after-hours support",
        "Tested software deployments on development servers before production launch dates"
      ]
    },
    {
      role: "Web Developer",
      company: "Instructus Media, Ltd",
      period: "Oct 2020 – Oct 2021",
      type: "development", // For color theming
      achievements: [
        "Successfully converted Department of Veterans Affairs online training from Flash to HTML5",
        "Developed responsive courseware using Vue.js, jQuery, and Tailwind CSS on budget and on time",
        "Implemented consistent styling using Tailwind CSS Framework for utility-first design approach",
        "Leveraged internal and external documentation to master available development tooling"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Texas at San Antonio",
      period: "2021 – 2025",
      details: "Focus on Software Engineering and Data Science"
    }
  ];

  // Helper function to get card theme class based on experience type
  const getExperienceCardClass = (type: string) => {
    const baseClass = "experience-card card-interactive";
    switch (type) {
      case "enterprise":
        return `${baseClass} experience-card--primary`;
      case "research":
        return `${baseClass} experience-card--secondary`;
      case "government":
        return `${baseClass} experience-card--tertiary`;
      case "development":
        return `${baseClass} experience-card--accent`;
      default:
        return baseClass;
    }
  };

  // Animation setup
  useEffect(() => {
    // Optimized delay to ensure DOM elements are fully rendered after lazy loading
    const timer = setTimeout(() => {
      // Section entrance animation - using ScrollTrigger for smooth entrance
      if (sectionRef.current) animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20, // Reduced from 40 to prevent overflow
        scrollTrigger: true,
      });

      // Header animation - with scroll trigger for better visual impact
      if (headerRef.current) animations.fadeIn(headerRef.current, {
        duration: 1,
        delay: 0.2,
        y: 30,
        scrollTrigger: true,
      });

      // Summary animation - with scroll trigger for better UX
      if (summaryRef.current) animations.fadeIn(summaryRef.current, {
        duration: 0.8,
        delay: 0.3,
        y: 20,
        scrollTrigger: true,
      });

      // Experience section animation - with scroll trigger for better UX
      if (experienceRef.current) animations.fadeIn(experienceRef.current, {
        duration: 0.8,
        delay: 0.4,
        y: 30,
        scrollTrigger: true,
      });

      // Education section animation - with scroll trigger for better UX
      if (educationRef.current) animations.fadeIn(educationRef.current, {
        duration: 0.8,
        delay: 0.5,
        y: 30,
        scrollTrigger: true,
      });
    }, 150); // Optimized delay for DOM readiness

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this section only
      killScrollTriggersFor([
        sectionRef.current,
        headerRef.current,
        summaryRef.current,
        experienceRef.current,
        educationRef.current,
      ]);
      killTweensFor([
        sectionRef.current,
        headerRef.current,
        summaryRef.current,
        experienceRef.current,
        educationRef.current,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-6 px-8"
      aria-labelledby="about-heading"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute -inset-x-16 -top-16 -bottom-0 md:-inset-x-24 md:-top-24 md:-bottom-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container-responsive relative z-10 section-content-container">
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <DevelopmentIcons.user className="w-5 h-5 text-blue-300" />
            <span className="text-blue-200 font-medium">About Me</span>
          </div>

          <h2 id="about-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="gradient-text">Professional Background</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Computer Science student with enterprise DevOps experience and research leadership
          </p>
        </header>

        <div className="about-content">
          <div ref={summaryRef} className="max-w-4xl mx-auto mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Professional Summary
            </h3>
            <div className="glass-effect rounded-2xl p-8 md:p-12">
              <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              <p>
                I’m a passionate full-stack developer and creative technologist with a love for building elegant, user-focused digital experiences. My portfolio showcases a blend of technical depth and design sensibility, spanning web applications, interactive media, and music technology. I thrive on solving complex problems, collaborating across disciplines, and delivering polished solutions that delight users.
              </p>
              <p>
                Previously, I contributed to innovative projects at IBM, where I worked alongside talented teams to develop scalable, enterprise-grade software. My experience there sharpened my skills in cloud technologies, agile development, and cross-functional teamwork—values I bring to every project.
              </p>
              <p className="text-blue-300 font-semibold">
                Let’s build something remarkable together.
              </p>
              </div>
            </div>
          </div>

          <div className="experience-section" role="region" aria-label="Professional experience">
            <h3 className="typography-h2 text-tertiary section-heading">
              Professional Experience
            </h3>
            <div className="experience-grid">
              {experience.map((job, index) => (
                <article
                  key={index}
                  className={`${getExperienceCardClass(job.type)} card-3d card-enhanced`}
                  role="article"
                  tabIndex={0}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    card.style.setProperty('--mouse-x', '0.5');
                    card.style.setProperty('--mouse-y', '0.5');
                    card.style.setProperty('--mouse-from-center-x', '0');
                    card.style.setProperty('--mouse-from-center-y', '0');
                    card.classList.add('card-hovered');
                  }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;

                    // Calculate distance from center for enhanced effects
                    const centerX = (x - 0.5) * 2; // -1 to 1
                    const centerY = (y - 0.5) * 2; // -1 to 1

                    // Determine quadrant for multi-axis rotation
                    const quadrantX = x > 0.5 ? 1 : -1;
                    const quadrantY = y > 0.5 ? 1 : -1;

                    card.style.setProperty('--mouse-x', x.toString());
                    card.style.setProperty('--mouse-y', y.toString());
                    card.style.setProperty('--mouse-from-center-x', centerX.toString());
                    card.style.setProperty('--mouse-from-center-y', centerY.toString());
                    card.style.setProperty('--quadrant-x', quadrantX.toString());
                    card.style.setProperty('--quadrant-y', quadrantY.toString());
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.setProperty('--mouse-x', '0.5');
                    card.style.setProperty('--mouse-y', '0.5');
                    card.style.setProperty('--mouse-from-center-x', '0');
                    card.style.setProperty('--mouse-from-center-y', '0');
                    card.style.setProperty('--quadrant-x', '0');
                    card.style.setProperty('--quadrant-y', '0');
                    card.classList.remove('card-hovered');
                  }}
                >
                  <div className="card-3d-inner">
                    <div className="card-3d-front">
                      {/* Logo Container - Reserved for manual logo addition */}
                      {/* <div className="logo-container" data-company={job.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}></div> */}

                      <header className="card-header parallax-layer" data-speed="1">
                        <h4 className="typography-h3 job-title">{job.role}</h4>
                        <div className="job-details">
                          <span className="company typography-label-large">{job.company}</span>
                          <span className="period typography-caption">{job.period}</span>
                        </div>
                      </header>

                      <div className="card-content parallax-layer" data-speed="0.8">
                        <ul className="achievements typography-body-small" role="list">
                          {job.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} role="listitem" className="achievement-item" style={{ animationDelay: `${achIndex * 50}ms` }}>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Enhanced 3D depth indicators */}
                      <div className="card-depth-indicator card-depth-1 parallax-layer" data-speed="0.6"></div>
                      <div className="card-depth-indicator card-depth-2 parallax-layer" data-speed="0.4"></div>
                      <div className="card-depth-indicator card-depth-3 parallax-layer" data-speed="0.2"></div>

                      {/* Dynamic Light Sources */}
                      <div className="light-source primary-light"></div>
                      <div className="light-source ambient-light"></div>
                      <div className="light-source accent-light"></div>

                      {/* Glass Effect Overlay */}
                      <div className="glass-overlay"></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="education-section" role="region" aria-labelledby="education-heading">
            <h3 id="education-heading" className="typography-h2 text-primary section-heading">
              Education
            </h3>
            <p className="education-intro typography-body">
              Academic foundation in computer science with focus on practical application
            </p>

            <div className="education-grid">
              {education.map((edu, index) => (
                <article
                  key={index}
                  className="education-card card-interactive card-3d card-enhanced"
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    card.style.setProperty('--mouse-x', '0.5');
                    card.style.setProperty('--mouse-y', '0.5');
                    card.style.setProperty('--mouse-from-center-x', '0');
                    card.style.setProperty('--mouse-from-center-y', '0');
                    card.classList.add('card-hovered');
                  }}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;

                    const centerX = (x - 0.5) * 2;
                    const centerY = (y - 0.5) * 2;
                    const quadrantX = x > 0.5 ? 1 : -1;
                    const quadrantY = y > 0.5 ? 1 : -1;

                    card.style.setProperty('--mouse-x', x.toString());
                    card.style.setProperty('--mouse-y', y.toString());
                    card.style.setProperty('--mouse-from-center-x', centerX.toString());
                    card.style.setProperty('--mouse-from-center-y', centerY.toString());
                    card.style.setProperty('--quadrant-x', quadrantX.toString());
                    card.style.setProperty('--quadrant-y', quadrantY.toString());
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.setProperty('--mouse-x', '0.5');
                    card.style.setProperty('--mouse-y', '0.5');
                    card.style.setProperty('--mouse-from-center-x', '0');
                    card.style.setProperty('--mouse-from-center-y', '0');
                    card.style.setProperty('--quadrant-x', '0');
                    card.style.setProperty('--quadrant-y', '0');
                    card.classList.remove('card-hovered');
                  }}
                >
                  <div className="card-3d-inner">
                    <div className="card-3d-front">
                      {/* Logo Container - Reserved for manual logo addition */}
                      {/* <div className="logo-container" data-company="utsa"></div> */}

                      <header className="card-header parallax-layer" data-speed="1">
                        <h4 className="typography-h4">{edu.degree}</h4>
                        <div className="education-details">
                          <span className="institution typography-label-large">{edu.institution}</span>
                          <span className="period typography-caption">{edu.period}</span>
                        </div>
                      </header>
                      <p className="education-focus typography-body-small parallax-layer" data-speed="0.8">{edu.details}</p>

                      {/* Enhanced 3D depth indicators */}
                      <div className="card-depth-indicator card-depth-1 parallax-layer" data-speed="0.6"></div>
                      <div className="card-depth-indicator card-depth-2 parallax-layer" data-speed="0.4"></div>
                      <div className="card-depth-indicator card-depth-3 parallax-layer" data-speed="0.2"></div>

                      {/* Dynamic Light Sources */}
                      <div className="light-source primary-light"></div>
                      <div className="light-source ambient-light"></div>
                      <div className="light-source accent-light"></div>

                      {/* Glass Effect Overlay */}
                      <div className="glass-overlay"></div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;


