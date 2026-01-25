import { FaClock, FaPlay, FaSoundcloud } from "react-icons/fa";

interface Track {
  title: string;
  duration: string; // year or length
  genre: string;
  description?: string;
  soundCloudUrl?: string;
}

interface TrackCardProps {
  track: Track;
}

function getGradientForGenre(genre: string): string {
  const g = genre.toLowerCase();
  // Using emerald-based gradients to match site theme
  if (g.includes("ambient")) return "from-emerald-600 via-teal-600 to-cyan-600";
  if (g.includes("modular") || g.includes("synthesis")) return "from-teal-500 via-emerald-500 to-green-600";
  if (g.includes("garage")) return "from-emerald-500 via-green-500 to-lime-600";
  return "from-slate-600 via-emerald-600 to-teal-600";
}

function TrackCard({ track }: TrackCardProps) {
  const trackId = `track-${track.title.replace(/\s+/g, '-').toLowerCase()}`;
  const gradient = getGradientForGenre(track.genre);

  return (
    <article 
      className="h-full glass-effect bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/50 rounded-xl overflow-hidden transition-all duration-300" 
      role="article" 
      aria-labelledby={trackId}
    >
      {/* Album Art Header */}
      <header
        className={`relative grid place-content-center h-28 bg-gradient-to-r ${gradient}`}
      >
        <FaSoundcloud className="w-14 h-14 text-white/80" aria-hidden="true" />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
      </header>

      {/* Card Content */}
      <div className="p-5">
        <h4 className="text-lg font-semibold text-white mb-3" id={trackId}>
          {track.title}
        </h4>

        <div className="flex items-center flex-wrap gap-2 mb-3">
          {/* Genre Tag - Using emerald theme */}
          <span className="px-3 py-1 bg-emerald-600/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">
            {track.genre}
          </span>
          {/* Duration/Year */}
          <span 
            className="inline-flex items-center gap-1 text-sm text-gray-400" 
            aria-label="Year or duration"
          >
            <FaClock className="w-3.5 h-3.5" aria-hidden="true" />
            {track.duration}
          </span>
        </div>

        {track.description && (
          <p className="text-sm leading-relaxed text-gray-400 line-clamp-3 mb-4">
            {track.description}
          </p>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 pb-5 pt-0">
        {track.soundCloudUrl ? (
          <a
            href={track.soundCloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label={`Preview ${track.title} on SoundCloud`}
          >
            <FaPlay className="w-3.5 h-3.5" aria-hidden="true" />
            Preview on SoundCloud
          </a>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-700/50 text-gray-500 font-medium cursor-not-allowed"
            aria-label={`Preview unavailable for ${track.title}`}
          >
            <FaPlay className="w-3.5 h-3.5" aria-hidden="true" />
            Preview Unavailable
          </button>
        )}
      </div>
    </article>
  );
}

export default TrackCard;
