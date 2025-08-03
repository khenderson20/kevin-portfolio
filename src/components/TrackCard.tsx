interface Track {
  title: string;
  duration: string;
  genre: string;
  description?: string;
}

interface TrackCardProps {
  track: Track;
}

function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="track-card" role="article" aria-labelledby={`track-${track.title.replace(/\s+/g, '-').toLowerCase()}`}>
      <header>
        <h3 id={`track-${track.title.replace(/\s+/g, '-').toLowerCase()}`}>
          {track.title}
        </h3>
        <p className="track-info" aria-label="Project type and technology">
          <strong>{track.genre}</strong> • {track.duration}
        </p>
      </header>
      
      {track.description && (
        <div className="track-content">
          <p className="track-description">
            {track.description}
          </p>
        </div>
      )}
    </article>
  );
}

export default TrackCard;

