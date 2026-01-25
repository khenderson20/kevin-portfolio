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
    <div 
      className={`
        relative glass-effect bg-white/5 backdrop-blur-md 
        border border-white/10 hover:border-emerald-400/50 
        shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 
        transition-all duration-300 rounded-xl overflow-hidden 
        ${className}
      `}
    >
      {/* Hover gradient overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-br from-emerald-500/5 to-transparent transition-opacity duration-300" 
        aria-hidden="true" 
      />
      
      <div className="p-6 text-center relative z-10">
        {Icon && (
          <div className="mx-auto mb-3 flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 transition-colors duration-300">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        )}
        
        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
          <AnimatedCounter end={value} suffix={suffix} duration={2500} delay={delayMs} />
        </div>
        
        <p className="text-xs tracking-wider uppercase text-gray-400">
          {label}
        </p>
      </div>
    </div>
  );
}
