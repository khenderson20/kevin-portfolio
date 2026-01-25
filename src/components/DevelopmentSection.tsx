
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DevelopmentIcons } from '../constants/icons';
import GitHubProjects from './GitHubProjects';
import TechFilters from './TechFilters';
import LanguageDistribution from './LanguageDistribution';
import { Project } from '../types/portfolio';
import { GitHubService } from '../services/githubService';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';
import { GitHubRepo } from '../services';

import techVideoMp4 from '../assets/tech-background.optimized.mp4';
import techVideoWebm from '../assets/tech-background.webm';
import techPoster from '../assets/tech-poster.jpg';

// Helper to normalize tech names
const normalize = (t?: string) => (t || '').toLowerCase().replace(/[^a-z0-9+]/g, '');

function DevelopmentSection() {
  const reducedMotion = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )[0];
  const [videoError, setVideoError] = useState(false);

  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GitHub projects state for incremental loading
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [allGithubRepos, setAllGithubRepos] = useState<GitHubRepo[]>([]);
  const [hasMoreGithubProjects, setHasMoreGithubProjects] = useState(true);

  // Tech filter state
  const [selectedTech, setSelectedTech] = useState<string | null>(null);


  // Load GitHub repository data
  useEffect(() => {
    const loadGithubData = async () => {
      try {
        const repos = await GitHubService.getUserRepos();
        setAllGithubRepos(repos);
      } catch {
        setAllGithubRepos([]);
      }
    };
    loadGithubData();
  }, []);

  // Function to load initial GitHub projects
  const loadInitialGithubProjects = useCallback(async () => {
    if (githubLoading || allGithubRepos.length === 0) return;
    try {
      setGithubLoading(true);
      setGithubError(null);
      const initialRepos = allGithubRepos.slice(0, 6);
      const languagesByRepo = await GitHubService.getRepoLanguagesBatch(
        initialRepos.map((r) => r.name),
        { concurrency: 3 }
      );
      const projectsWithLanguages = initialRepos.map((repo) => {
        const languages = languagesByRepo[repo.name] ?? [];
        return GitHubService.transformToPortfolioProject(repo, languages);
      });
      setGithubProjects(projectsWithLanguages);
      setHasMoreGithubProjects(allGithubRepos.length > 6);
    } catch {
      setGithubError('Failed to load GitHub projects');
    } finally {
      setGithubLoading(false);
    }
  }, [allGithubRepos, githubLoading]);

  // Load initial GitHub projects when repos are loaded
  useEffect(() => {
    if (allGithubRepos.length > 0 && githubProjects.length === 0) {
      loadInitialGithubProjects();
    }
  }, [allGithubRepos, githubProjects.length, loadInitialGithubProjects]);

  // Compute all unique technologies and counts for filters
  const { allTechs, techCounts } = useMemo(() => {
    const counts: Record<string, number> = {};
    const techs = new Set<string>();

    githubProjects.forEach(project => {
      project.tech?.forEach(t => {
        const normalized = normalize(t);
        techs.add(t);
        counts[normalized] = (counts[normalized] || 0) + 1;
      });
    });

    return {
      allTechs: Array.from(techs),
      techCounts: counts
    };
  }, [githubProjects]);

  // Animation setup
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const timer = setTimeout(() => {
      animations.fadeIn(section, {
        duration: 1.2,
        y: 20,
        scrollTrigger: true,
      });
      animations.fadeIn(header, {
        duration: 1,
        delay: 0.2,
        y: 30,
        scrollTrigger: true,
      });
    }, 150);
    return () => {
      clearTimeout(timer);
      killScrollTriggersFor([
        section,
        header,
      ]);
      killTweensFor([
        section,
        header,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden min-h-[110vh] py-6 px-12 min-w-full"
    >
      {/* Background video (Technical Projects section) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {!reducedMotion && !videoError ? (
          <video
            className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={techPoster}
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            onError={() => setVideoError(true)}
          >
            {/* Prefer WebM when available; falls back to MP4. */}
            <source src={techVideoWebm} type="video/webm" />
            <source src={techVideoMp4} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${techPoster})` }}
          />
        )}

        {/* Contrast overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      

      <div className="container-responsive relative z-10 section-content-container">
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <DevelopmentIcons.code className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-200 font-medium">Development</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="gradient-text">Technical Projects</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            These are my GitHub projects that I built myself.
          </p>
        </header>

        {/* Language Distribution Visualization */}
        {githubProjects.length > 0 && (
          <LanguageDistribution
            techCounts={techCounts}
            onSelectTech={setSelectedTech}
            selectedTech={selectedTech}
          />
        )}

        {/* Technology Filters */}
        {githubProjects.length > 0 && (
          <TechFilters
            technologies={allTechs}
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            projectCounts={techCounts}
          />
        )}

        {/* Project Content */}
        <div className="projects-content">
          <GitHubProjects
            projects={githubProjects}
            loading={githubLoading}
            error={githubError}
            hasMore={hasMoreGithubProjects}
            selectedTech={selectedTech}
          />
        </div>
      </div>
    </div>
  );
}

export default DevelopmentSection;
