
import { useState, useEffect, useCallback, useRef } from 'react';
import { DevelopmentIcons } from '../constants/icons';
import GitHubProjects from './GitHubProjects';
import { Project } from '../types/portfolio';
import { GitHubService } from '../services/githubService';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';
import { GitHubRepo } from '../services';


function DevelopmentSection() {
  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // GitHub projects state for incremental loading
  const [githubProjects, setGithubProjects] = useState<Project[]>([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState<string | null>(null);
  const [allGithubRepos, setAllGithubRepos] = useState<GitHubRepo[]>([]);
  const [hasMoreGithubProjects, setHasMoreGithubProjects] = useState(true);


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
      const projectsWithLanguages = await Promise.all(
        initialRepos.map(async (repo) => {
          const languages = await GitHubService.getRepoLanguages(repo.name);
          return GitHubService.transformToPortfolioProject(repo, languages);
        })
      );
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
      className="relative py-6 px-12 overflow-hidden"
    >
        {/* Background Elements (temporarily removed for mobile interaction debugging) */}
        <div className="pointer-events-none z-0 absolute -inset-x-16 -top-16 -bottom-0 md:-inset-x-24 md:-top-24 md:-bottom-0">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-3/4 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>
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

          {/* Project Content */}
          <div className="projects-content">
            <GitHubProjects
              projects={githubProjects}
              loading={githubLoading}
              error={githubError}
              hasMore={hasMoreGithubProjects}
            />
          </div>
        </div>
      </div>
    );
}

export default DevelopmentSection;
