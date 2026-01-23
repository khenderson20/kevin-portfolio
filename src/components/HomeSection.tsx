import { useEffect, useRef, useState } from 'react';
import { GitHubStatsService } from '../services/githubStatsService';
import { FaArrowDown } from 'react-icons/fa';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';
import HeroActions from './HeroActions';
import heroVideo from '../assets/Hero-background.mp4';
import styles from './HomeSection.module.css';

interface HomeSectionProps {
  onNavigateToSection?: (section: string) => void;
}

interface GitHubStats {
  yearsExperience: number;
  repositoryCount: number;
  languageCount: number;
  followerCount: number;
}

function HomeSection({ onNavigateToSection }: HomeSectionProps) {
  const reducedMotion = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)[0];
  const [videoError, setVideoError] = useState(false);

  const [githubStats, setGithubStats] = useState<GitHubStats>({
    yearsExperience: 8,
    repositoryCount: 11,
    languageCount: 6,
    followerCount: 16
  });

  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        const [years, repos, languages, followers] = await Promise.all([
          GitHubStatsService.getYearsExperience(),
          GitHubStatsService.getRepositoryCount(),
          GitHubStatsService.getLanguageCount(),
          GitHubStatsService.getFollowerCount()
        ]);
        setGithubStats({
          yearsExperience: years,
          repositoryCount: repos,
          languageCount: languages,
          followerCount: followers
        });
      } catch (error) {
        console.error('Error loading GitHub stats:', error);
      }
    };
    loadGitHubStats();
  }, []);

  useEffect(() => {
    // Add a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      // Hero entrance animations - immediate for first impression, no scroll trigger needed
      animations.fadeIn(nameRef.current, {
        duration: 1.2,
        delay: 0.3,
        y: 50,
        scrollTrigger: false
      });

      animations.fadeIn(titleRef.current, {
        duration: 1,
        delay: 0.6,
        y: 30,
        scrollTrigger: false
      });

      animations.fadeIn(descriptionRef.current, {
        duration: 0.8,
        delay: 0.9,
        y: 20,
        scrollTrigger: false
      });

      animations.fadeIn(ctaButtonsRef.current, {
        duration: 0.8,
        delay: 1.2,
        y: 20,
        scrollTrigger: false
      });

      animations.fadeIn(statsRef.current, {
        duration: 0.8,
        delay: 1.5,
        y: 30,
        scrollTrigger: false
      });

      animations.fadeIn(scrollIndicatorRef.current, {
        duration: 0.6,
        delay: 2,
        y: 20,
        scrollTrigger: false
      });
    }, 100); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this section only
      killScrollTriggersFor([
        heroRef.current,
        nameRef.current,
        titleRef.current,
        descriptionRef.current,
        ctaButtonsRef.current,
        statsRef.current,
        scrollIndicatorRef.current,
      ]);
      killTweensFor([
        heroRef.current,
        nameRef.current,
        titleRef.current,
        descriptionRef.current,
        ctaButtonsRef.current,
        statsRef.current,
        scrollIndicatorRef.current,
      ]);
    };
  }, []);





  const statsData = [
    { label: 'Years Experience', value: githubStats.yearsExperience, suffix: '+' },
    { label: 'Projects Built', value: githubStats.repositoryCount, suffix: '+' },
    { label: 'Technologies', value: githubStats.languageCount, suffix: '+' },
    { label: 'GitHub Followers', value: githubStats.followerCount, suffix: '+' },
  ];

  return (
    <div
      ref={heroRef}
      className={`${styles.hero} ${styles.heroThemeA} w-full relative min-h-screen flex items-center justify-center navbar-spacing`}
    >
      {/* Background video (Home section only) */}
      <div className={styles.background} aria-hidden="true">
        {!reducedMotion && !videoError ? (
          <>
            <video
              className={`${styles.video} ${styles.videoCover}`}
              data-hero-bg
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
            <video
              className={`${styles.video} ${styles.videoContain}`}
              data-hero-bg
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          </>
        ) : (
          <div
            className={styles.fallback}
          />
        )}
      </div>

      {/* Main Content */}
      <div className={`${styles.content} container-responsive relative z-10 pt-20 md:pt-16`}>
        <div className="text-center pb-4 max-w-4xl mx-auto">
          {/* Name */}
          <h1
            ref={nameRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0"
          >
            <span className="gradient-text">Kevin Henderson</span>
          </h1>

          {/* Title */}
          <h2
            ref={titleRef}
            className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-6 opacity-0"
          >
            Software Developer & Creative Technologist
          </h2>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="text-xl md:text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-normal md:leading-relaxed opacity-0 pt-4 md:pt-6"
          >
            I build fast, polished web apps—where thoughtful design meets solid engineering.
          </p>

          {/* Hero Actions */}
          <div
            ref={ctaButtonsRef}
            className="mb-16 opacity-0"
          >
            <HeroActions onNavigateToSection={onNavigateToSection} />
          </div>

          {/* GitHub Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 opacity-0"
          >
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>


          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2"
          >
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <FaArrowDown className="w-4 h-4 text-gray-400 animate-bounce" />
          </div>


        </div>
      </div>
    </div>
  );
}

export default HomeSection;
