function AboutSection() {
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

  return (
    <section className="about-section page-section" id="about" aria-labelledby="about-heading">
      <div className="container">
        <header className="about-header">
          <h2 id="about-heading" className="typography-h1">
            Professional Background
          </h2>
          <p className="section-intro typography-body-large">
            Computer Science student with enterprise DevOps experience and research leadership
          </p>
        </header>

        <div className="about-content">
          <div className="about-summary" role="region" aria-labelledby="summary-heading">
            <h3 id="summary-heading" className="typography-h2 text-secondary">
              Professional Summary
            </h3>
            <div className="summary-content">
              <p className="typography-body">
                Computer Science student with hands-on experience in DevOps, enterprise cloud infrastructure,
                and research-driven web development. Currently contributing to IBM's Security and Compliance Center
                while advancing academic research through full-stack applications and data visualization.
              </p>
              <p className="typography-body">
                Unique blend of technical expertise spanning DevOps automation, AI platform integration,
                and audio engineering, with proven ability to deliver scalable solutions across
                enterprise and academic environments.
              </p>
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
    </section>
  );
}

export default AboutSection;


