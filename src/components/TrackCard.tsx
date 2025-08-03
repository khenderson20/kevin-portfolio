interface Track {
  title: string;
  duration: string;
  genre: string;
}

interface TrackCardProps {
  track: Track;
}

function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="track-card">
      <div className="track-artwork"></div>
      <h3>{track.title}</h3>
      <p>{track.genre} • {track.duration}</p>
      <button className="play-btn">▶ Play</button>
    </div>
  );
}

export default TrackCard;