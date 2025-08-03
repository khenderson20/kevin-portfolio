function AboutSection() {
  const experience = [
    {
      role: "DevOps Developer Intern",
      company: "International Business Machines (IBM)",
      period: "May 2025 – August 2025",
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

  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <header>
        <h2 id="about-heading">Professional Background</h2>
        <p className="section-intro">
          Computer Science student with enterprise DevOps experience and research leadership
        </p>
      </header>
      
      <div className="about-content">
        <div className="about-summary" role="region" aria-labelledby="summary-heading">
          <h3 id="summary-heading">Professional Summary</h3>
          <p>
            Computer Science student with hands-on experience in DevOps, enterprise cloud infrastructure, 
            and research-driven web development. Currently contributing to IBM's Security and Compliance Center 
            while advancing academic research through full-stack applications and data visualization.
          </p>
          <p>
            Unique blend of technical expertise spanning DevOps automation, AI platform integration, 
            and audio engineering, with proven ability to deliver scalable solutions across 
            enterprise and academic environments.
          </p>
        </div>

        <div className="experience-grid" role="region" aria-label="Professional experience">
          {experience.map((job, index) => (
            <article key={index} className="experience-card" role="article">
              <header>
                <h3>{job.role}</h3>
                <div className="job-details">
                  <span className="company">{job.company}</span>
                  <span className="period">{job.period}</span>
                </div>
              </header>
              
              <div className="job-content">
                <ul className="achievements" role="list">
                  {job.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} role="listitem">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="education-section" role="region" aria-labelledby="education-heading">
          <h3 id="education-heading">Education</h3>
          <p className="education-intro">
            Academic foundation in computer science with focus on practical application
          </p>
          
          <div className="education-grid">
            {education.map((edu, index) => (
              <article key={index} className="education-card">
                <h4>{edu.degree}</h4>
                <div className="education-details">
                  <span className="institution">{edu.institution}</span>
                  <span className="period">{edu.period}</span>
                </div>
                <p className="education-focus">{edu.details}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;


