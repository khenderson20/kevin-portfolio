import TrackCard from './TrackCard';
import SkillProgressBar from './SkillProgressBar';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import ParticleBackground from './ParticleBackground';
import { FaSpotify, FaSoundcloud } from 'react-icons/fa';

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

  return (
    <section className="music-section" id="music" aria-labelledby="music-heading">
      <main className="music-content">
        <ParticleBackground
          particleCount={25}
          particleColor="rgba(var(--color-secondary-rgb), 0.1)"
          speed={0.4}
          interactive={true}
        />
        <header>
          <h2 id="music-heading">Music Production & Audio Projects</h2>
          <p className="section-intro">
            Electronic music production featuring synth compositions, modular synthesis, and experimental audio
          </p>

          {/* Music Streaming Call-to-Action */}
          <div className="music-cta-container">
            <a
              href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary music-cta spotify-cta rounded-lg interactive-element"
              aria-label="Listen to my music on Spotify"
            >
              <FaSpotify className="btn-icon" />
              <span className="btn-text">Listen on Spotify</span>
              <span className="btn-arrow">→</span>
            </a>
            <a
              href="https://soundcloud.com/user-228826128"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary music-cta soundcloud-cta rounded-lg interactive-element"
              aria-label="Listen to my music on SoundCloud"
            >
              <FaSoundcloud className="btn-icon" />
              <span className="btn-text">SoundCloud</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
          {/* Audio Stats Section */}
          <div className="stats-grid" role="region" aria-label="Audio engineering statistics">
            {audioStats.map((stat, index) => (
              <InteractiveCard
                key={index}
                glowEffect={true}
                tiltEffect={false}
                scaleOnHover={true}
                shadowIntensity="low"
                className="stat-card-wrapper"
              >
                <div className="stat-item">
                  <div className="stat-value">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2500}
                      delay={index * 300}
                    />
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </header>
        <div className="music-grid" role="region" aria-label="Audio engineering projects">
          {audioProjects.map((project, index) => (
            <InteractiveCard
              key={index}
              glowEffect={true}
              tiltEffect={true}
              scaleOnHover={true}
              shadowIntensity="medium"
              className="track-card-wrapper"
            >
              <TrackCard track={project} />
            </InteractiveCard>
          ))}
        </div>
        <div className="audio-skills" role="region" aria-labelledby="audio-skills-heading">
          <h3 id="audio-skills-heading">Audio Technology Skills</h3>
          <p className="skills-intro">
            Professional audio tools and technologies for modern digital production
          </p>
          <div className="audio-skills-grid">
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
        </div>

        {/* Music Streaming Platforms Section */}
        <div className="music-links-section" role="region" aria-label="Music streaming links">
          <h3>Listen to My Music</h3>
          <p className="music-links-intro">
            Stream my electronic music, synth compositions, and experimental audio across platforms
          </p>
          <div className="music-platforms-grid">
            {/* Spotify Card */}
            <div
              className="music-platform-card spotify-card card-3d card-enhanced rounded-lg interactive-element"
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.setProperty('--mouse-x', '0.5');
                card.style.setProperty('--mouse-y', '0.5');
                card.style.setProperty('--mouse-from-center-x', '0');
                card.style.setProperty('--mouse-from-center-y', '0');
                card.classList.add('card-hovered');
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const centerX = (x - 0.5) * 2;
                const centerY = (y - 0.5) * 2;
                const quadrantX = x > 0.5 ? 1 : -1;
                const quadrantY = y > 0.5 ? 1 : -1;

                card.style.setProperty('--mouse-x', x.toString());
                card.style.setProperty('--mouse-y', y.toString());
                card.style.setProperty('--mouse-from-center-x', centerX.toString());
                card.style.setProperty('--mouse-from-center-y', centerY.toString());
                card.style.setProperty('--quadrant-x', quadrantX.toString());
                card.style.setProperty('--quadrant-y', quadrantY.toString());
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.setProperty('--mouse-x', '0.5');
                card.style.setProperty('--mouse-y', '0.5');
                card.style.setProperty('--mouse-from-center-x', '0');
                card.style.setProperty('--mouse-from-center-y', '0');
                card.style.setProperty('--quadrant-x', '0');
                card.style.setProperty('--quadrant-y', '0');
                card.classList.remove('card-hovered');
              }}
            >
              <div className="card-3d-inner">
                <div className="card-3d-front">
                  <a
                    href="https://open.spotify.com/artist/4cHJRNFfmZcx44gkmTr8mH?si=p__McSMTTbyGI3AQeVi52A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-link"
                    aria-label="Listen to my music on Spotify"
                  >
                    <div className="platform-header parallax-layer" data-speed="1">
                      <FaSpotify className="platform-icon" />
                      <span className="platform-name">Spotify</span>
                    </div>
                    <p className="platform-description parallax-layer" data-speed="0.8">Albums, singles, and synth music releases</p>
                    <div className="platform-cta parallax-layer" data-speed="0.6">
                      <span>Listen Now</span>
                      <span className="cta-arrow">→</span>
                    </div>
                  </a>

                  {/* 3D depth indicators */}
                  <div className="card-depth-indicator card-depth-1 parallax-layer" data-speed="0.6"></div>
                  <div className="card-depth-indicator card-depth-2 parallax-layer" data-speed="0.4"></div>
                  <div className="card-depth-indicator card-depth-3 parallax-layer" data-speed="0.2"></div>

                  {/* Dynamic Light Sources */}
                  <div className="light-source primary-light"></div>
                  <div className="light-source ambient-light"></div>
                  <div className="light-source accent-light"></div>

                  {/* Glass Effect Overlay */}
                  <div className="glass-overlay"></div>
                </div>
              </div>
            </div>

            {/* SoundCloud Card */}
            <div
              className="music-platform-card soundcloud-card card-3d card-enhanced rounded-lg interactive-element"
              onMouseEnter={(e) => {
                const card = e.currentTarget;
                card.style.setProperty('--mouse-x', '0.5');
                card.style.setProperty('--mouse-y', '0.5');
                card.style.setProperty('--mouse-from-center-x', '0');
                card.style.setProperty('--mouse-from-center-y', '0');
                card.classList.add('card-hovered');
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const centerX = (x - 0.5) * 2;
                const centerY = (y - 0.5) * 2;
                const quadrantX = x > 0.5 ? 1 : -1;
                const quadrantY = y > 0.5 ? 1 : -1;

                card.style.setProperty('--mouse-x', x.toString());
                card.style.setProperty('--mouse-y', y.toString());
                card.style.setProperty('--mouse-from-center-x', centerX.toString());
                card.style.setProperty('--mouse-from-center-y', centerY.toString());
                card.style.setProperty('--quadrant-x', quadrantX.toString());
                card.style.setProperty('--quadrant-y', quadrantY.toString());
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.setProperty('--mouse-x', '0.5');
                card.style.setProperty('--mouse-y', '0.5');
                card.style.setProperty('--mouse-from-center-x', '0');
                card.style.setProperty('--mouse-from-center-y', '0');
                card.style.setProperty('--quadrant-x', '0');
                card.style.setProperty('--quadrant-y', '0');
                card.classList.remove('card-hovered');
              }}
            >
              <div className="card-3d-inner">
                <div className="card-3d-front">
                  <a
                    href="https://soundcloud.com/user-228826128"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-link"
                    aria-label="Visit my SoundCloud profile"
                  >
                    <div className="platform-header parallax-layer" data-speed="1">
                      <FaSoundcloud className="platform-icon" />
                      <span className="platform-name">SoundCloud</span>
                    </div>
                    <p className="platform-description parallax-layer" data-speed="0.8">Original music and audio experiments</p>
                    <div className="platform-cta parallax-layer" data-speed="0.6">
                      <span>Explore</span>
                      <span className="cta-arrow">→</span>
                    </div>
                  </a>

                  {/* 3D depth indicators */}
                  <div className="card-depth-indicator card-depth-1 parallax-layer" data-speed="0.6"></div>
                  <div className="card-depth-indicator card-depth-2 parallax-layer" data-speed="0.4"></div>
                  <div className="card-depth-indicator card-depth-3 parallax-layer" data-speed="0.2"></div>

                  {/* Dynamic Light Sources */}
                  <div className="light-source primary-light"></div>
                  <div className="light-source ambient-light"></div>
                  <div className="light-source accent-light"></div>

                  {/* Glass Effect Overlay */}
                  <div className="glass-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default MusicSection;




