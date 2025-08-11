import { Card, CardBody, CardHeader, CardFooter, Typography, Chip, Button } from "@material-tailwind/react";
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
  if (g.includes("ambient")) return "from-indigo-500 via-blue-500 to-purple-600"; // cool blues/purples
  if (g.includes("modular") || g.includes("synthesis")) return "from-teal-400 via-emerald-500 to-cyan-500"; // techy greens/cyans
  if (g.includes("garage")) return "from-orange-500 via-rose-500 to-red-600"; // warm oranges/reds
  return "from-slate-600 via-indigo-600 to-purple-700"; // default
}

function TrackCard({ track }: TrackCardProps) {
  const trackId = `track-${track.title.replace(/\s+/g, '-').toLowerCase()}`;
  const gradient = getGradientForGenre(track.genre);

  return (
    <Card className="h-full bg-white/80 dark:bg-neutral-900 border border-white/10 shadow-lg" role="article" aria-labelledby={trackId}>
      <CardHeader
        floated={undefined}
        className={`relative grid place-content-center h-28 bg-gradient-to-r ${gradient} rounded-b-none text-white`}
      >
        <FaSoundcloud className="w-16 h-16" aria-hidden="true" />
      </CardHeader>

      <CardBody className="p-5">
        <Typography type="h5" className="mb-2 text-neutral-900 dark:text-white" id={trackId}>
          {track.title}
        </Typography>

        <div className="flex items-center flex-wrap gap-2 mb-3">
          <Chip size="sm" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200">{track.genre}</Chip>
          <span className="inline-flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300" aria-label="Year or duration">
            <FaClock className="w-4 h-4" aria-hidden="true" />
            {track.duration}
          </span>
        </div>

        {track.description && (
          <Typography type="p" className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 line-clamp-4">
            {track.description}
          </Typography>
        )}
      </CardBody>

      <CardFooter className="pt-0">
        {track.soundCloudUrl ? (
          <Button
            size="md"
            color="primary"
            className="w-full flex items-center justify-center gap-2"
            variant="solid"
            as="a"
            href={track.soundCloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Soundcloud: ${track.title}`}
          >
            <FaPlay className="w-4 h-4" aria-hidden="true" />
            Preview on Soundcloud
          </Button>
        ) : (
          <Button
            size="md"
            color="primary"
            className="w-full flex items-center justify-center gap-2"
            variant="solid"
            disabled
            aria-label={`Preview unavailable for ${track.title}`}
          >
            <FaPlay className="w-4 h-4" aria-hidden="true" />
            Preview Unavailable
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default TrackCard;

