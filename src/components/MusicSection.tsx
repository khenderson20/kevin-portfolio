import TrackCard from './TrackCard';

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
    "Digital Signal Processing (DSP)",
    "Audio Plugin Development",
    "Ableton Live and Bitwig Studio Integration",
    "MIDI Programming"
  ];

  return (
    <section className="music-section" aria-labelledby="music-heading">
      <header>
        <h2 id="music-heading">Audio Engineering Projects</h2>
        <p className="section-intro">
          Bridging the gap between creative audio production and modern web technology
        </p>
        <p className="section-intro">
          Combining technical expertise with creative audio solutions
        </p>
      </header>
      
      <div className="music-grid" role="region" aria-label="Audio engineering projects">
        {audioProjects.map((project, index) => (
          <TrackCard key={index} track={project} />
        ))}
      </div>

      <div className="audio-skills" role="region" aria-labelledby="audio-skills-heading">
        <h3 id="audio-skills-heading">Audio Technology Skills</h3>
        <p className="skills-intro">
          Professional audio tools and technologies for modern digital production
        </p>
        
        <div 
          className="skill-tags" 
          role="list" 
          aria-label="Audio technology skills"
        >
          {audioSkills.map((skill, index) => (
            <span 
              key={index} 
              className="skill-tag" 
              role="listitem"
              tabIndex={0}
              aria-label={`${skill} technology`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MusicSection;


