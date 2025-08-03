import TrackCard from './TrackCard';

interface Track {
  title: string;
  duration: string;
  genre: string;
}

function MusicSection() {
  const tracks: Track[] = [
    { title: "Track 1", duration: "3:45", genre: "Electronic" },
    { title: "Track 2", duration: "4:12", genre: "Ambient" },
    { title: "Track 3", duration: "2:58", genre: "Experimental" }
  ];

  return (
    <section className="music-section">
      <h2>My Music</h2>
      <div className="music-grid">
        {tracks.map((track, index) => (
          <TrackCard key={index} track={track} />
        ))}
      </div>
    </section>
  );
}

export default MusicSection;