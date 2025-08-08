import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types/portfolio';
import HorizontalProjectCard from './HorizontalProjectCard';
import { animations } from '../utils/animations';

interface HorizontalProjectsContainerProps {
  projects: Project[];
  loading: boolean;
}

function HorizontalProjectsContainer({ projects, loading }: HorizontalProjectsContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current || loading || projects.length === 0) {
      return;
    }

    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;

    // Calculate total scroll width based on screen size
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 320 : 384; // w-80 on mobile, w-96 on desktop
    const gap = 24; // gap-6 = 24px
    const totalWidth = (cardWidth + gap) * projects.length;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth + 100; // Add some padding

    console.log('🔍 Scroll Debug:', {
      projects: projects.length,
      isMobile,
      cardWidth,
      totalWidth,
      viewportWidth,
      scrollDistance,
      shouldScroll: scrollDistance > 0
    });

    // Create horizontal scroll if content overflows (remove mobile restriction)
    if (scrollDistance > 0) {
      // Create horizontal scroll animation
      const horizontalScroll = gsap.to(scrollContainer, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 20%',
          end: `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate title on scroll
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: -50,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 20%',
            end: 'bottom 20%',
            scrub: true,
          },
        });
      }

      return () => {
        horizontalScroll.kill();
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === container) {
            trigger.kill();
          }
        });
      };
    }
  }, [projects, loading]);

  // Initial entrance animation for the container
  useEffect(() => {
    if (titleRef.current) {
      animations.fadeIn(titleRef.current, {
        duration: 1,
        y: 30,
        delay: 0.2,
      });
    }
  }, []);

  if (loading) {
    return (
      <div className="horizontal-projects-loading">
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 md:w-96 h-[500px] glass-effect rounded-2xl border border-white/20 animate-pulse"
            >
              <div className="h-48 bg-white/10 rounded-t-2xl" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-white/10 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-white/10 rounded w-16" />
                  <div className="h-6 bg-white/10 rounded w-20" />
                  <div className="h-6 bg-white/10 rounded w-18" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="h-4 bg-white/10 rounded w-4/6" />
                </div>
                <div className="flex gap-3 mt-6">
                  <div className="h-10 bg-white/10 rounded flex-1" />
                  <div className="h-10 bg-white/10 rounded flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="horizontal-projects-wrapper">
      {/* Section Title */}
      <h3 
        ref={titleRef}
        className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Featured Projects
      </h3>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="horizontal-projects-container relative overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        <div
          ref={scrollContainerRef}
          className="horizontal-projects-scroll flex gap-6 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {projects.map((project, index) => (
            <HorizontalProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-70">
          <div className="w-6 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full animate-pulse" />
          <span>Scroll to explore</span>
          <div className="w-6 h-1 bg-gradient-to-l from-emerald-400 to-transparent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Mobile Touch Scroll Hint */}
      <div className="md:hidden text-center mt-6">
        <p className="text-gray-400 text-sm">
          Swipe horizontally to browse projects
        </p>
      </div>
    </div>
  );
}

export default HorizontalProjectsContainer;



