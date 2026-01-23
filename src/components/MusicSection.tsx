import TrackCard from './TrackCard';
import InteractiveCard from './InteractiveCard';
import MusicStatCard from './MusicStatCard';
import { FaSpotify, FaSoundcloud, FaUsers, FaMusic, FaCompactDisc } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';
import { Typography } from '@material-tailwind/react';


interface Track {
  title: string;
  duration: string;
  genre: string;
  description?: string;
  soundCloudUrl?: string;
}

function MusicSection() {
  const audioProjects: Track[] = [
    {
      title: "RINGS 2022",
      duration: "2022",
      genre: "Ambient Electronic",
      description: "Atmospheric electronic composition featuring layered synthesizers and evolving soundscapes",
      soundCloudUrl: "https://soundcloud.com/user-228826128/rings-2022"
    },
    {
      title: "Experiment with modular",
      duration: "2022",
      genre: "Modular Synthesis",
      description: "Exploration of modular synthesizer techniques with complex patch routing and generative sequences",
      soundCloudUrl: "https://soundcloud.com/user-228826128/big-bass-mastered"
    },
    {
      title: "garage 09",
      duration: "2020",
      genre: "UK Garage",
      description: "UK garage-influenced track with syncopated rhythms and bass-heavy production",
      soundCloudUrl: "https://soundcloud.com/user-228826128/garage-09"
    }
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
    // Capture ref values for cleanup to avoid stale `.current` warnings
    const sectionEl = sectionRef.current;
    const headingEl = headingRef.current;
    const statEls = statCardRefs.current.slice();
    const trackEls = trackCardRefs.current.slice();

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
        sectionEl,
        headingEl,
        statEls,
        trackEls,
      ]);
      killTweensFor([
        sectionEl,
        headingEl,
        statEls,
        trackEls,
      ]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-labelledby="music-heading"
      className="relative py-6 px-8"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute -inset-x-16 -top-16 -bottom-0 md:-inset-x-24 md:-top-24 md:-bottom-0">
        <div className="absolute inset-0 opacity-30">
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
            
            <span className="text-gray-300 text-3xl md:text-4xl lg:text-5xl font-light"> & Audio Projects</span>
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
            {audioStats.map((stat, index) => {
              const Icon =
                stat.label === 'Monthly Listeners' ? FaUsers :
                stat.label === 'Spotify Followers' ? FaSpotify :
                stat.label === 'Published Tracks' ? FaMusic :
                FaCompactDisc;
              return (
                <div key={index} ref={el => (statCardRefs.current[index] = el)}>
                  <MusicStatCard
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    Icon={Icon}
                    delayMs={index * 300}
                  />
                </div>
              );
            })}
          </div>
        </header>
        <Typography type="h2" id="audio-projects-heading" variant="h3" className="mb-6 text-center sm:text-left">
          <span className="gradient-text">Featured Audio Projects</span>
        </Typography>
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
                ref={(el) => (trackCardRefs.current[index] = el)}
                className="h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                tabIndex={0}
              >
                <TrackCard track={project} />
              </div>
            </InteractiveCard>
          ))}
        </div>
        
        <Typography type="h4" id="music-links-heading" className="mb-2 text-center sm:text-left">
          <span className="gradient-text">Listen to My Music</span>
        </Typography>
        <Typography type="p" className="mb-4 max-w-2xl mx-auto text-neutral-200 sm:text-base text-sm">
          Stream my electronic music, synth compositions, and experimental audio across platforms
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="region" aria-labelledby="music-links-heading">
          {/* Spotify Card */}
          <div className="music-platform-card spotify-card bg-green-600 hover:bg-green-700 rounded-lg shadow-md p-6 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition" tabIndex={0}>
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-white font-semibold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              aria-label="Listen to my music on Spotify"
            >
              <FaSpotify className="w-8 h-8 mb-2" />
              <span className="text-lg">Spotify</span>
              <span className="text-sm">Albums, singles, and synth music releases</span>
              <span className="inline-block mt-2 text-base font-bold">Listen Now →</span>
            </a>
          </div>
          {/* SoundCloud Card */}
          <div className="music-platform-card soundcloud-card bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md p-6 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 transition" tabIndex={0}>
            <a
              href="https://soundcloud.com/user-228826128"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-white font-semibold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
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





