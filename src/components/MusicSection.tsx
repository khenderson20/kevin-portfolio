import TrackCard from './TrackCard';
import SkillProgressBar from './SkillProgressBar';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import { FaSpotify, FaSoundcloud } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

interface Track {
  title: string;
  duration: string;
  genre: string;
  description?: string;
}

function MusicSection() {
  const audioProjects: Track[] = [
    {
      title: "RINGS 2022",
      duration: "2022",
      genre: "Ambient Electronic",
      description: "Atmospheric electronic composition featuring layered synthesizers and evolving soundscapes"
    },
    {
      title: "Experiment with modular",
      duration: "2022",
      genre: "Modular Synthesis",
      description: "Exploration of modular synthesizer techniques with complex patch routing and generative sequences"
    },
    {
      title: "garage 09",
      duration: "2020",
      genre: "UK Garage",
      description: "UK garage-influenced track with syncopated rhythms and bass-heavy production"
    }
  ];

  const audioSkills = [
    { name: "Modular Synthesis", level: 85 },
    { name: "Electronic Music Production", level: 90 },
    { name: "Synthesizer Programming", level: 80 },
    { name: "MIDI Sequencing", level: 85 },
    { name: "Sound Design", level: 75 },
    { name: "Ambient Composition", level: 80 }
  ];

  const audioStats = [
    { label: "Monthly Listeners", value: 4, suffix: "" },
    { label: "Spotify Followers", value: 10, suffix: "" },
    { label: "Published Tracks", value: 10, suffix: "+" },
    { label: "Albums Released", value: 6, suffix: "" }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Optimized delay to ensure DOM elements are fully rendered after lazy loading
    const timer = setTimeout(() => {
      // Section entrance animation - using ScrollTrigger for smooth entrance
      animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20,
        scrollTrigger: true,
      });

      // Heading animation - with scroll trigger for better visual impact
      animations.textReveal(headingRef.current, {
        duration: 1.5,
        delay: 0.2,
        scrollTrigger: true,
      });

      // Staggered stat cards animation - with scroll trigger for better UX
      animations.staggerFadeIn(statCardRefs.current, {
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        y: 30,
        scrollTrigger: true,
      });

      // Staggered track cards animation - with scroll trigger for consistency
      animations.staggerFadeIn(trackCardRefs.current, {
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        y: 40,
        scrollTrigger: true,
      });
    }, 150); // Optimized delay for DOM readiness

    return () => {
      clearTimeout(timer);
      // Targeted cleanup for this section only
      killScrollTriggersFor([
        sectionRef.current,
        headingRef.current,
        statCardRefs.current,
        trackCardRefs.current,
      ]);
      killTweensFor([
        sectionRef.current,
        headingRef.current,
        statCardRefs.current,
        trackCardRefs.current,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-labelledby="music-heading"
      className="relative py-6 px-8 overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="container-responsive relative z-10 section-content-container">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-purple-200 font-medium">Music & Audio</span>
          </div>

          <h1
            ref={headingRef}
            id="music-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            tabIndex={-1}
          >
            <span className="gradient-text">Music Production</span>
            <br />
            <span className="text-gray-300 text-3xl md:text-4xl lg:text-5xl font-light">& Audio Projects</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Electronic music production featuring synth compositions, modular synthesis, and experimental audio design
          </p>
          {/* Streaming Platforms */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
              aria-label="Listen to my music on Spotify"
            >
              <FaSpotify className="w-6 h-6" />
              <span>Listen on Spotify</span>
              <span className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
            <a
              href="https://soundcloud.com/user-228826128"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              aria-label="Listen to my music on SoundCloud"
            >
              <FaSoundcloud className="w-6 h-6" />
              <span>SoundCloud</span>
              <span className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
          </div>
          {/* Audio Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" role="region" aria-label="Audio engineering statistics">
            {audioStats.map((stat, index) => (
              <div
                key={index}
                ref={el => (statCardRefs.current[index] = el)}
                className="glass-effect rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 group"
                tabIndex={0}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2500}
                    delay={index * 300}
                  />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </header>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6" id="audio-projects-heading">
          Featured Audio Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" role="region" aria-labelledby="audio-projects-heading">
          {audioProjects.map((project, index) => (
            <InteractiveCard
              key={index}
              tiltEffect={true}
              scaleOnHover={true}
              shadowIntensity="medium"
              className="track-card-wrapper"
            >
              <div
                ref={el => (trackCardRefs.current[index] = el)}
                className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-5 h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                tabIndex={0}
              >
                <TrackCard track={project} />
              </div>
            </InteractiveCard>
          ))}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-4" id="audio-skills-heading">
          Audio Technology Skills
        </h3>
        <p className="text-base text-neutral-700 dark:text-neutral-300 mb-4 max-w-2xl mx-auto">
          Professional audio tools and technologies for modern digital production
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" role="region" aria-labelledby="audio-skills-heading">
          {audioSkills.map((skill, index) => (
            <SkillProgressBar
              key={index}
              skill={skill.name}
              level={skill.level}
              category="Audio"
              showPercentage={true}
            />
          ))}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-4" id="music-links-heading">
          Listen to My Music
        </h3>
        <p className="text-base text-neutral-700 dark:text-neutral-300 mb-4 max-w-2xl mx-auto">
          Stream my electronic music, synth compositions, and experimental audio across platforms
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="region" aria-labelledby="music-links-heading">
          {/* Spotify Card */}
          <div className="music-platform-card spotify-card bg-green-50 dark:bg-green-900 rounded-lg shadow-md p-6 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition" tabIndex={0}>
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-green-700 dark:text-green-200 font-semibold hover:text-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              aria-label="Listen to my music on Spotify"
            >
              <FaSpotify className="w-8 h-8 mb-2" />
              <span className="text-lg">Spotify</span>
              <span className="text-sm">Albums, singles, and synth music releases</span>
              <span className="inline-block mt-2 text-base font-bold">Listen Now →</span>
            </a>
          </div>
          {/* SoundCloud Card */}
          <div className="music-platform-card soundcloud-card bg-orange-50 dark:bg-orange-900 rounded-lg shadow-md p-6 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 transition" tabIndex={0}>
            <a
              href="https://soundcloud.com/user-228826128"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-orange-700 dark:text-orange-200 font-semibold hover:text-orange-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              aria-label="Visit my SoundCloud profile"
            >
              <FaSoundcloud className="w-8 h-8 mb-2" />
              <span className="text-lg">SoundCloud</span>
              <span className="text-sm">Original music and audio experiments</span>
              <span className="inline-block mt-2 text-base font-bold">Explore →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicSection;






