import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
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
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Helper to destroy current tween safely
  const killTween = useCallback(() => {
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }
  }, []);

  const setupAutoScroll = useCallback(() => {
    const container = containerRef.current;
    const scroller = scrollContainerRef.current;
    if (!container || !scroller) return;

    // Ensure horizontal scrolling is enabled on the container
    container.style.overflowX = 'auto';
    container.style.overflowY = 'hidden';

    // Calculate the scrollable distance
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    // If nothing to scroll, just make sure position is reset and exit
    if (maxScrollLeft <= 0) {
      killTween();
      container.scrollLeft = 0;
      return;
    }

    // Duration scaled by distance for consistent speed (~100px/sec)
    const duration = Math.max(8, Math.min(45, maxScrollLeft / 100));

    // Create or replace the tween that animates scrollLeft
    killTween();
    tweenRef.current = gsap.to(container, {
      scrollLeft: maxScrollLeft,
      duration,
      ease: 'none',
      repeat: -1,
      yoyo: true, // ping-pong for readability
    });
  }, [killTween]);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef.current || loading || projects.length === 0) {
      return;
    }

    const container = containerRef.current;

    // Initial setup
    setupAutoScroll();

    // Pause on hover/focus for usability
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('focusin', pause);
    container.addEventListener('focusout', resume);

    // Recalculate on resize
    const handleResize = () => {
      // Let layout settle before recalculating
      requestAnimationFrame(setupAutoScroll);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('focusin', pause);
      container.removeEventListener('focusout', resume);
      window.removeEventListener('resize', handleResize);
      killTween();
    };
  }, [projects, loading, setupAutoScroll, killTween]);

  // Keyboard navigation (left/right arrows) for accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const step = Math.max(120, Math.round(container.clientWidth * 0.2));
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      container.scrollLeft = Math.min(container.scrollLeft + step, container.scrollWidth - container.clientWidth);
      tweenRef.current?.pause();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      container.scrollLeft = Math.max(container.scrollLeft - step, 0);
      tweenRef.current?.pause();
    }
  }, []);

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

      {/* Horizontal Auto-Scroll Container */}
      <div
        ref={containerRef}
        className="horizontal-projects-container relative overflow-x-auto overflow-y-hidden focus:outline-none"
        style={{ minHeight: '600px' }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <p id="projects-carousel-instructions" className="sr-only">
          Auto-scrolling list of project cards. Use left and right arrow keys to navigate. Hover or focus to pause.
        </p>
        <div
          ref={scrollContainerRef}
          className="horizontal-projects-scroll flex gap-6 pr-4"
          style={{ width: 'max-content' }}
          aria-describedby="projects-carousel-instructions"
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
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-70">
          <div className="w-6 h-1 bg-gradient-to-r from-emerald-400 to-transparent rounded-full animate-pulse" />
          <span>Auto-scrolling — hover or focus to pause</span>
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



