import { useRef, useEffect } from 'react';
import {
  LuMapPin,
  LuMail,
  LuLinkedin,
  LuGithub,
  LuCalendar,
  LuMusic,
  LuDisc,
  LuPlay,
  LuPause,
} from 'react-icons/lu';
import { animations, killScrollTriggersFor, killTweensFor } from '../utils/animations';

// Icon mapping for consistent styling and semantic meaning
const ContactIcons = {
  location: LuMapPin,
  email: LuMail,
  linkedin: LuLinkedin,
  github: LuGithub,
  calendar: LuCalendar,
} as const;

// Cassette tape screw component
const CassetteScrew = ({ className = '' }: { className?: string }) => (
  <div
    className={`w-4 h-4 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-600 shadow-inner flex items-center justify-center ${className}`}
    aria-hidden="true"
  >
    <div className="w-2 h-0.5 bg-zinc-700 rounded-full" />
  </div>
);

// Tape reel component with spinning animation
const TapeReel = ({
  size = 'lg',
  spinning = false,
}: {
  size?: 'sm' | 'lg';
  spinning?: boolean;
}) => {
  const sizeClasses = size === 'lg' ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20';

  return (
    <div
      className={`${sizeClasses} rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-lg flex items-center justify-center ${
        spinning ? 'animate-spin' : ''
      }`}
      style={{ animationDuration: '3s' }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div className="absolute inset-2 rounded-full border-2 border-zinc-700" />
      {/* Spokes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 60, 120, 180, 240, 300].map((rotation) => (
          <div
            key={rotation}
            className="absolute w-full h-0.5 bg-zinc-700"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        ))}
      </div>
      {/* Center hub */}
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 border-2 border-zinc-500 z-10 flex items-center justify-center">
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-zinc-400" />
      </div>
    </div>
  );
};

function ContactSection() {
  // Animation refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cassetteRef = useRef<HTMLDivElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);

  const contactInfo = {
    email: 'primary-email@kevinhenderson.dev',
    location: 'San Antonio, TX',
    availability: 'Available for full-time opportunities',
  };

  const professionalLinks = [
    {
      href: 'mailto:primary-email@kevinhenderson.dev',
      icon: 'email',
      label: 'Email',
      description: 'Drop a line',
      color: 'from-amber-500 to-orange-600',
    },
    {
      href: 'https://www.linkedin.com/in/kevin-h-cs/',
      icon: 'linkedin',
      label: 'LinkedIn',
      description: 'Connect',
      color: 'from-blue-500 to-blue-700',
    },
    {
      href: 'https://github.com/khenderson20',
      icon: 'github',
      label: 'GitHub',
      description: 'View code',
      color: 'from-zinc-600 to-zinc-800',
    },
    {
      href: 'https://calendly.com/primary-email-kevinhenderson/one-on-one',
      icon: 'calendar',
      label: 'Book a Call',
      description: 'Schedule',
      color: 'from-emerald-500 to-teal-600',
    },
  ] as const;

  // Animation setup
  useEffect(() => {
    const sectionEl = sectionRef.current;
    const headerEl = headerRef.current;
    const cassetteEl = cassetteRef.current;
    const vinylEl = vinylRef.current;

    const timer = setTimeout(() => {
      animations.fadeIn(sectionRef.current, {
        duration: 1.2,
        y: 20,
        scrollTrigger: true,
      });

      animations.fadeIn(headerRef.current, {
        duration: 1,
        delay: 0.2,
        y: 30,
        scrollTrigger: true,
      });

      animations.scaleIn(cassetteRef.current, {
        duration: 0.8,
        delay: 0.3,
        scale: 0.9,
        scrollTrigger: true,
      });

      animations.scaleIn(vinylRef.current, {
        duration: 0.8,
        delay: 0.4,
        scale: 0.9,
        scrollTrigger: true,
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      killScrollTriggersFor([sectionEl, headerEl, cassetteEl, vinylEl]);
      killTweensFor([sectionEl, headerEl, cassetteEl, vinylEl]);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-6 px-8"
      aria-labelledby="contact-heading"
    >
      {/* Cassette Tape Background Pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dark warm gradient overlay - nostalgic cassette tape feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-neutral-950/60 to-stone-900/40" />
        {/* Subtle amber accent glow at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-stone-800/20 via-transparent to-transparent" />
        {/* Film grain / tape texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Vintage scan lines - like old CRT/analog displays */}
        <div className="absolute inset-0 opacity-[0.03]">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-amber-100"
              style={{ top: `${i * 1.67}%` }}
            />
          ))}
        </div>
        {/* Corner vignette for that worn tape look */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="container-responsive relative z-10 section-content-container mb-0">
        <header ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-amber-800/40 to-orange-800/40 backdrop-blur-sm rounded-full border border-amber-500/30">
            <LuMusic className="w-5 h-5 text-amber-300" />
            <span className="text-amber-200 font-medium tracking-wider uppercase text-sm">
              Now Playing
            </span>
          </div>

          <h2
            id="contact-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span
              className="bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Courier New', monospace",
                textShadow: '0 0 40px rgba(251, 191, 36, 0.3)',
              }}
            >
              Let's Connect
            </span>
          </h2>

          <p
            className="text-xl md:text-2xl text-amber-100/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Ready to spin up something amazing together
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Cassette Tape Card */}
          <div
            ref={cassetteRef}
            className="relative rounded-2xl overflow-hidden"
            role="region"
            aria-labelledby="contact-info-heading"
          >
            {/* Cassette Body */}
            <div className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100 p-1 rounded-2xl shadow-2xl">
              {/* Inner cassette frame */}
              <div className="bg-gradient-to-br from-stone-800 via-stone-900 to-zinc-900 rounded-xl p-6 md:p-8">
                {/* Top screws */}
                <div className="flex justify-between items-center mb-4">
                  <CassetteScrew />
                  <div className="px-4 py-1.5 bg-amber-100 rounded text-xs font-bold text-stone-700 tracking-widest uppercase shadow-sm">
                    Contact Mix Vol. 1
                  </div>
                  <CassetteScrew />
                </div>

                {/* Tape Window */}
                <div className="relative bg-gradient-to-b from-stone-950 to-stone-900 rounded-lg p-4 mb-6 border-2 border-stone-700">
                  {/* Tape reels container */}
                  <div className="flex justify-between items-center">
                    <TapeReel size="lg" spinning />
                    <div className="flex-1 mx-4">
                      {/* Tape path */}
                      <div className="h-1 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 rounded-full mb-2" />
                      <div className="h-1 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 rounded-full" />
                    </div>
                    <TapeReel size="lg" />
                  </div>

                  {/* Tape counter display */}
                  <div className="absolute top-2 right-2 bg-zinc-900/95 px-2 py-1 rounded text-xs font-mono text-emerald-400 border border-zinc-700 z-10">
                    00:42
                  </div>
                </div>

                {/* Label Area - Clear separation from tape window */}
                <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-5 mb-4 shadow-inner z-10">
                  <div className="text-center mb-3">
                    <h3
                      id="contact-info-heading"
                      className="text-xl md:text-2xl font-bold text-stone-800 mb-2"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      Get In Touch
                    </h3>
                    <p className="text-sm text-stone-600 font-medium">{contactInfo.availability}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-stone-700 font-medium">
                    <ContactIcons.location className="w-4 h-4 text-amber-700" />
                    <span>{contactInfo.location}</span>
                  </div>
                </div>

                {/* Control buttons / Links */}
                <div className="grid grid-cols-2 gap-3">
                  {professionalLinks.map((link, index) => {
                    const IconComponent =
                      ContactIcons[link.icon as keyof typeof ContactIcons];
                    return (
                      <a
                        key={index}
                        href={link.href}
                        className={`group relative flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br ${link.color} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20`}
                        target={link.href.startsWith('http') ? '_blank' : '_self'}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        aria-label={`${link.label} - ${link.description}${link.href.startsWith('http') ? ' (opens in new tab)' : ''}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <IconComponent className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate">
                            {link.label}
                          </div>
                          <div className="text-xs opacity-80 truncate">
                            {link.description}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Bottom screws */}
                <div className="flex justify-between mt-4">
                  <CassetteScrew />
                  <CassetteScrew />
                </div>
              </div>
            </div>
          </div>

          {/* Vinyl Record Card */}
          <div ref={vinylRef} className="relative">
            <div className="relative bg-gradient-to-br from-stone-900 via-zinc-900 to-stone-950 rounded-2xl p-6 md:p-8 shadow-2xl border border-stone-700/50 overflow-hidden">
              {/* Album sleeve texture - reduced opacity to not interfere with content */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                  }}
                />
              </div>

              {/* Vinyl Record */}
              <div className="relative flex justify-center mb-8 z-10">
                <div
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black shadow-2xl group hover:animate-spin"
                  style={{ animationDuration: '4s' }}
                  aria-hidden="true"
                >
                  {/* Grooves */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full border border-zinc-700/30"
                      style={{
                        inset: `${8 + i * 6}%`,
                      }}
                    />
                  ))}

                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <LuDisc className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white mb-1" />
                        <div
                          className="text-xs md:text-sm font-bold text-white tracking-wider drop-shadow-sm"
                          style={{ fontFamily: "'Courier New', monospace" }}
                        >
                          KEVIN
                        </div>
                        <div className="text-[8px] md:text-[10px] text-white/90 font-medium">
                          HENDERSON
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Light reflection */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Album info - elevated z-index for clear visibility */}
              <div className="relative text-center space-y-4 z-10">
                <h3
                  className="text-2xl md:text-3xl font-bold text-amber-100 drop-shadow-sm"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Other Ways to Connect
                </h3>

                <div className="inline-flex items-center gap-4 px-4 py-2 bg-stone-800/80 backdrop-blur-sm rounded-full border border-stone-700">
                  <button
                    className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors"
                    aria-label="Play"
                  >
                    <LuPlay className="w-4 h-4 text-stone-900 ml-0.5" />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full bg-stone-700 hover:bg-stone-600 flex items-center justify-center transition-colors"
                    aria-label="Pause"
                  >
                    <LuPause className="w-4 h-4 text-amber-100" />
                  </button>
                  <div className="h-6 w-px bg-stone-600" />
                  <span className="text-sm text-amber-200 font-mono font-medium">Track 02</span>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <ContactIcons.email className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-amber-300 uppercase tracking-wider font-semibold">
                      Email
                    </span>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-amber-100 hover:text-amber-200 transition-colors font-medium"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-amber-900/30 via-orange-900/30 to-amber-900/30 rounded-xl border border-amber-700/30 backdrop-blur-sm">
                  <p
                    className="text-amber-100/90 leading-relaxed text-sm md:text-base"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    "I'm always excited to discuss new opportunities, collaborate on interesting
                    projects, or simply connect with fellow developers and creators. Feel free
                    to reach out!"
                  </p>
                </div>

                {/* Vintage rating sticker */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-600 rounded-sm rotate-[-2deg] shadow-md">
                  <span className="text-xs font-bold text-white tracking-wider uppercase drop-shadow-sm">
                    ★ Highly Recommended ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
