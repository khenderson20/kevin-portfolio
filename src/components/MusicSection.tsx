import TrackCard from './TrackCard';
import SkillProgressBar from './SkillProgressBar';
import AnimatedCounter from './AnimatedCounter';
import InteractiveCard from './InteractiveCard';
import ParticleBackground from './ParticleBackground';

interface Track {
  title: string;
  duration: string;
  genre: string;
  description?: string;
}

function MusicSection() {
  const audioProjects: Track[] = [
    { 
      title: "Interactive Audio Visualizer", 
      duration: "Web App", 
      genre: "React + Web Audio API",
      description: "Real-time frequency analysis with custom DSP algorithms and responsive visual feedback"
    },
    { 
      title: "Podcast Processing Pipeline", 
      duration: "Production Tool", 
      genre: "Node.js + FFmpeg",
      description: "Automated audio enhancement and normalization system for 50+ podcast episodes"
    },
    { 
      title: "MIDI Controller Interface", 
      duration: "Hardware Integration", 
      genre: "JavaScript + WebMIDI",
      description: "Browser-based DAW controller with sub-20ms latency for professional music production"
    }
  ];

  const audioSkills = [
    { name: "Digital Signal Processing (DSP)", level: 85 },
    { name: "Audio Plugin Development", level: 75 },
    { name: "Ableton Live Integration", level: 90 },
    { name: "MIDI Programming", level: 80 },
    { name: "Web Audio API", level: 85 },
    { name: "FFmpeg Processing", level: 80 }
  ];

  const audioStats = [
    { label: "Audio Projects", value: 15, suffix: "+" },
    { label: "Podcast Episodes", value: 50, suffix: "+" },
    { label: "Audio Plugins", value: 8, suffix: "" },
    { label: "Processing Speed", value: 20, suffix: "ms" }
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
          <h2 id="music-heading">Audio Engineering Projects</h2>
          <p className="section-intro">
            Bridging the gap between creative audio production and modern web technology
          </p>
          {/* Audio Stats Section */}
          <div className="stats-grid" role="region" aria-label="Audio engineering statistics">
            {audioStats.map((stat, index) => (
              <div key={index} className="stat-item">
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
                delay={index * 100}
                showPercentage={true}
                color="var(--color-secondary)"
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}

export default MusicSection;


