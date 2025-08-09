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
        "Explored IBM Watsonx AI platform capabilities for use internally",
        "Resolved critical bugs and implemented performance optimizations across the platform UI"
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
      period: "2022 – 2025",
      details: "Focus on Software Engineering"
    }
  ];

  // Helpers for timeline theming (use static class names to keep Tailwind JIT happy)
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'enterprise':
        return { dotBg: 'bg-blue-500/20', dotText: 'text-blue-300', chipBg: 'bg-blue-500/10', chipText: 'text-blue-300' };
      case 'research':
        return { dotBg: 'bg-purple-500/20', dotText: 'text-purple-300', chipBg: 'bg-purple-500/10', chipText: 'text-purple-300' };
      case 'government':
        return { dotBg: 'bg-green-500/20', dotText: 'text-green-300', chipBg: 'bg-green-500/10', chipText: 'text-green-300' };
      case 'development':
        return { dotBg: 'bg-amber-500/20', dotText: 'text-amber-300', chipBg: 'bg-amber-500/10', chipText: 'text-amber-300' };
      default:
        return { dotBg: 'bg-blue-gray-500/20', dotText: 'text-blue-gray-300', chipBg: 'bg-blue-gray-500/10', chipText: 'text-blue-gray-300' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'enterprise':
        return DevelopmentIcons.layers;
      case 'research':
        return DevelopmentIcons.search;
      case 'government':
        return DevelopmentIcons.database;
      case 'development':
        return DevelopmentIcons.code;
      default:
        return DevelopmentIcons.user;
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
            Computer Science student with enterprise experience and research experience
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
                I’m a passionate full-stack developer and creative technologist with a love for building elegant, user-focused digital experiences. My portfolio showcases a blend of technical depth and design sensibility, spanning web applications, interactive media, and music technology. I thrive on solving complex problems, collaborating across disciplines, and delivering polished solutions that delight human users.
              </p>
              <p>
                Previously, At IBM’s Security Compliance Center, I focused on frontend UI quality for cloud compliance dashboards. In a 3‑month internship, I ramped quickly and began squashing UI bugs within weeks—improving usability, accessibility, and performance across React/JavaScript views.
              </p>
              <p>
                In my internship, I learned how I work best—curious, calm under ambiguity, and focused on small, high‑impact changes. I also got a real‑world view of enterprise software: constraints, trade‑offs, and the importance of clear, timely communication. I also had some great mentors who helped me grow and develop my skills.
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

            {/* Vertical timeline using Material Tailwind + Tailwind classes */}
            <div className="mx-auto max-w-5xl">
              <div className="relative">
                {/* central line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />

                <ul className="space-y-10">
                  {experience.map((job, index) => {
                    const Icon = getTypeIcon(job.type);
                    const styles = getTypeStyles(job.type);
                    const isEven = index % 2 === 0;
                    const side = isEven ? 'md:pl-10' : 'md:pr-10';
                    const align = isEven ? '' : 'md:text-right';
                    const colStart = isEven ? 'md:col-start-1' : 'md:col-start-3';
                    return (
                      <li key={index} className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)]">
                        {/* Left content (on even rows on desktop) */}


                        {/* Dot + connector */}
                        <div className="relative flex items-start justify-center md:col-start-2">
                          <span className={`z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 ${styles.dotBg} ${styles.dotText} shadow-md shadow-black/30`}>
                            {Icon && <Icon className="h-4 w-4" />}
                          </span>
                        </div>

                        {/* Right content (on mobile always right) */}
                        <div className={`glass-effect rounded-xl p-5 min-w-0 ${side} ${colStart}`}>
                          <div className={`flex flex-wrap items-center gap-2 md:justify-between min-w-0 ${align}`}>
                            <div className="min-w-0">
                              <h4 className="text-white text-xl font-semibold break-words whitespace-normal leading-snug">{job.role}</h4>
                              <p className="text-gray-300 text-sm break-words whitespace-normal">{job.company}</p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-white/10 ${styles.chipBg} ${styles.chipText}`}>{job.period}</span>
                          </div>
                          <ul className="mt-3 list-disc pl-5 text-gray-300 space-y-1 text-left md:text-left">
                            {job.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="leading-relaxed">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div ref={educationRef} className="education-section" role="region" aria-labelledby="education-heading">
            <h3 id="education-heading" className="text-3xl md:text-4xl font-bold text-white mb-8">
              Education
            </h3>
            <p className="text-gray-300 mb-8 text-xl md:text-2xl">
              Academic foundation in computer science with focus on practical application
            </p>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 gap-6">
                {education.map((edu, index) => (
                  <article
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-blue-900/20"
                    aria-label={`${edu.degree} at ${edu.institution}`}
                  >
                    {/* Subtle background glow on hover */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/25 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

                    <div className="relative z-10">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
                        <DevelopmentIcons.gradcap className="h-6 w-6" />
                      </div>

                      <header className="mb-1">
                        <h4 className="text-xl font-semibold text-white">{edu.degree}</h4>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-300">
                          <span className="font-medium">{edu.institution}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-indigo-300 ring-1 ring-inset ring-indigo-400/20">{edu.period}</span>
                        </div>
                      </header>

                      <p className="mt-3 text-gray-300">{edu.details}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;


