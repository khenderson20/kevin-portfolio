import { Card, CardBody, Typography } from '@material-tailwind/react';
import { IconType } from 'react-icons';
import AnimatedCounter from './AnimatedCounter';

interface MusicStatCardProps {
  label: string;
  value: number;
  suffix?: string;
  Icon?: IconType;
  delayMs?: number;
  className?: string;
}

export default function MusicStatCard({
  label,
  value,
  suffix = '',
  Icon,
  delayMs = 0,
  className = ''
}: MusicStatCardProps) {
  return (
    <Card className={`relative glass-effect bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 hover:border-white/30 shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <CardBody className="p-6 text-center">
        {Icon && (
          <div className="mx-auto mb-3 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-white">
            {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
          </div>
        )}
        <Typography type="h3" className="mb-1 text-white font-bold text-2xl md:text-3xl">
          <AnimatedCounter end={value} suffix={suffix} duration={2500} delay={delayMs} />
        </Typography>
        <Typography type="p" className="text-xs tracking-wider uppercase text-gray-300">
          {label}
        </Typography>
      </CardBody>
    </Card>
  );
}

