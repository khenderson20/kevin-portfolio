import TrackCard from './TrackCard';
import InteractiveCard from './InteractiveCard';
import MusicStatCard from './MusicStatCard';
import { FaSpotify, FaSoundcloud, FaUsers, FaMusic, FaCompactDisc, FaHeadphones } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

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
    { label: "Monthly Listeners", value: 4, suffix: "", Icon: FaUsers },
    { label: "Spotify Followers", value: 10, suffix: "", Icon: FaSpotify },
    { label: "Published Tracks", value: 10, suffix: "+", Icon: FaMusic },
    { label: "Albums Released", value: 6, suffix: "", Icon: FaCompactDisc }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const platformCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const headingEl = headingRef.current;
    const statEls = statCardRefs.current.slice();
    const trackEls = trackCardRefs.current.slice();
    const platformEl = platformCardsRef.current;

    const timer = setTimeout(() => {
      animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20,
        scrollTrigger: true,
      });

      animations.textReveal(headingRef.current, {
        duration: 1.5,
        delay: 0.2,
        scrollTrigger: true,
      });

      animations.staggerFadeIn(statCardRefs.current, {
        duration: 0.8,
        stagger: 0.1,
        delay: 0.3,
        y: 30,
        scrollTrigger: true,
      });

      animations.staggerFadeIn(trackCardRefs.current, {
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4,
        y: 40,
        scrollTrigger: true,
      });

      if (platformCardsRef.current) {
        animations.fadeIn(platformCardsRef.current, {
          duration: 0.8,
          delay: 0.5,
          y: 30,
          scrollTrigger: true,
        });
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      killScrollTriggersFor([sectionEl, headingEl, statEls, trackEls, platformEl]);
      killTweensFor([sectionEl, headingEl, statEls, trackEls, platformEl]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      aria-labelledby="music-heading"
      className="relative overflow-hidden min-h-[110vh] py-6 px-12 min-w-full"
    >
      {/* Background - Matching DevelopmentSection pattern with gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Animated gradient orbs - using emerald theme instead of purple */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        {/* Dark overlay for consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-900" />
      </div>

      <div className="container-responsive relative z-10 section-content-container">
        {/* Section Header - Matching DevelopmentSection pattern */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <FaHeadphones className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-200 font-medium">Music & Audio</span>
          </div>

          <h2
            ref={headingRef}
            id="music-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            tabIndex={-1}
          >
            <span className="gradient-text">Audio Production</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Electronic music production featuring synth compositions, modular synthesis, and experimental audio design
          </p>

          {/* Streaming Platform Buttons - Updated styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
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
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl glass-effect border border-white/20 hover:border-emerald-400/50 text-white font-semibold shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Listen to my music on SoundCloud"
            >
              <FaSoundcloud className="w-6 h-6" />
              <span>SoundCloud</span>
              <span className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Audio Stats - Using glass effect cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" role="region" aria-label="Audio engineering statistics">
            {audioStats.map((stat, index) => (
              <div key={index} ref={el => (statCardRefs.current[index] = el)}>
                <MusicStatCard
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  Icon={stat.Icon}
                  delayMs={index * 300}
                />
              </div>
            ))}
          </div>
        </header>

        {/* Featured Audio Projects Section */}
        <section className="mb-16">
          <h3 id="audio-projects-heading" className="text-2xl md:text-3xl font-bold mb-8 text-center sm:text-left">
            <span className="gradient-text">Featured Audio Projects</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="region" aria-labelledby="audio-projects-heading">
            {audioProjects.map((project, index) => (
              <InteractiveCard
                key={index}
                tiltEffect={true}
                scaleOnHover={true}
                shadowIntensity="medium"
                className="h-full"
              >
                <div
                  ref={(el) => (trackCardRefs.current[index] = el)}
                  className="h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  tabIndex={0}
                >
                  <TrackCard track={project} />
                </div>
              </InteractiveCard>
            ))}
          </div>
        </section>

        {/* Platform Links Section */}
        <section ref={platformCardsRef}>
          <h3 id="music-links-heading" className="text-2xl md:text-3xl font-bold mb-4 text-center sm:text-left">
            <span className="gradient-text">Stream My Music</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl sm:text-base text-sm text-center sm:text-left">
            Stream my electronic music, synth compositions, and experimental audio across platforms
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="region" aria-labelledby="music-links-heading">
            {/* Spotify Platform Card */}
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-effect rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Listen to my music on Spotify"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                  <FaSpotify className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Spotify</h4>
                <p className="text-gray-400 text-sm mb-4">Albums, singles, and synth music releases</p>
                <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-3 transition-all">
                  Listen Now
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>

            {/* SoundCloud Platform Card */}
            <a
              href="https://soundcloud.com/user-228826128"
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-effect rounded-2xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Visit my SoundCloud profile"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                  <FaSoundcloud className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">SoundCloud</h4>
                <p className="text-gray-400 text-sm mb-4">Original music and audio experiments</p>
                <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:gap-3 transition-all">
                  Explore
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MusicSection;
