import { useRef, useEffect } from 'react';
import { ProjectIcons } from '../constants/icons';
import { Project } from '../types/portfolio';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

interface HorizontalProjectCardProps {
  project: Project;
  index: number;
}

function HorizontalProjectCard({ project, index }: HorizontalProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      // Card entrance animation with stagger
      animations.fadeIn(cardRef.current, {
        duration: 0.8,
        delay: index * 0.1,
        y: 50,
        scrollTrigger: true,
      });

      // Image parallax effect
      if (imageRef.current) {
        animations.parallax(imageRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this card only
      killScrollTriggersFor([
        cardRef.current,
        imageRef.current,
      ]);
      killTweensFor([
        cardRef.current,
        imageRef.current,
        contentRef.current,
      ]);
    };
  }, [index]);

  const getCategoryDisplayName = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'dsa':
        return 'Data Structures & Algorithms';
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'fullstack':
        return 'Full-Stack';
      case 'mobile':
        return 'Mobile';
      case 'audio':
        return 'Audio';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return 'from-cyan-500 to-blue-500';
      case 'backend':
        return 'from-emerald-500 to-teal-500';
      case 'fullstack':
        return 'from-emerald-400 to-cyan-400';
      case 'mobile':
        return 'from-teal-500 to-cyan-500';
      case 'audio':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div
      ref={cardRef}
      className="horizontal-project-card group relative flex-shrink-0 w-80 md:w-96 h-[500px] glass-effect rounded-2xl overflow-hidden border border-white/20 hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-500/20"
      role="article"
      aria-labelledby={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20 opacity-0 group-hover:opacity-100" />
      
      {/* Project Image */}
      {project.image && (
        <div ref={imageRef} className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={`${project.title} preview`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          {project.category && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg`}>
              {getCategoryDisplayName(project.category)}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div ref={contentRef} className="flex flex-col flex-1 p-6">
        {/* Header */}
        <header className="mb-4">
          <h3 
            id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300"
          >
            {project.title}
          </h3>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-3">
            {(project.tech || []).slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium bg-white/10 text-emerald-200 rounded-md border border-white/20 hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
            {(project.tech || []).length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-white/10 text-gray-400 rounded-md border border-white/20">
                +{(project.tech || []).length - 4} more
              </span>
            )}
          </div>
        </header>

        {/* Description */}
        <div className="flex-1 mb-4">
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
            {project.description}
          </p>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 text-emerald-300">
              <ProjectIcons.stats size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">Impact</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{project.metrics}</p>
          </div>
        )}

        {/* Action Buttons */}
        <footer className="flex gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
              aria-label={`View live demo of ${project.title}`}
            >
              <ProjectIcons.external size={14} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <ProjectIcons.github size={14} />
              GitHub
            </a>
          )}
        </footer>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-xl" />
      </div>
    </div>
  );
}

export default HorizontalProjectCard;
