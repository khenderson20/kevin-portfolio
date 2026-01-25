import { useMemo } from 'react';
import { FaTerminal, FaJava } from 'react-icons/fa';
import {
  SiTypescript, SiJavascript, SiPython, SiVuedotjs, SiHtml5, SiCss3, SiNodedotjs,
  SiC, SiCplusplus, SiMarkdown, SiPowers,
  SiVim, SiGnu, SiGo, SiRust, SiDart,
  SiKotlin, SiSwift, SiZig, SiJulia,
  SiRuby, SiPhp, SiScala, SiElixir,
  SiHaskell, SiSolidity, SiSvelte,
  SiAstro, SiNextdotjs, SiRemix,
  SiFlutter, SiReact, SiAngular,
  SiDocker, SiTerraform, SiGraphql,
  SiMysql, SiPostgresql, SiMongodb, SiRedis,
  SiFirebase, SiAmazonwebservices,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

// Language color palette (GitHub-inspired colors)
const LANGUAGE_COLORS: Record<string, string> = {
  typescript: '#3178c6',
  javascript: '#f7df1e',
  python: '#3572A5',
  vue: '#41b883',
  html: '#e34c26',
  css: '#563d7c',
  node: '#339933',
  shell: '#89e051',
  bash: '#89e051',
  c: '#555555',
  cpp: '#f34b7d',
  'c++': '#f34b7d',
  java: '#b07219',
  go: '#00ADD8',
  rust: '#dea584',
  dart: '#00B4AB',
  kotlin: '#A97BFF',
  swift: '#F05138',
  ruby: '#701516',
  php: '#4F5D95',
  scala: '#c22d40',
  elixir: '#6e4a7e',
  haskell: '#5e5086',
  vim: '#199f4b',
  vimscript: '#199f4b',
  makefile: '#427819',
  cmake: '#DA3434',
  make: '#427819',
  markdown: '#083fa1',
  react: '#61dafb',
  angular: '#dd0031',
  svelte: '#ff3e00',
  docker: '#2496ED',
  graphql: '#e10098',
  sql: '#e38c00',
  mysql: '#4479A1',
  postgresql: '#336791',
  mongodb: '#47A248',
  redis: '#DC382D',
  firebase: '#FFCA28',
  aws: '#FF9900',
};

const TECH_ICON_MAP: Array<{
  match: (t: string) => boolean;
  icon: IconType;
}> = [
  { match: (t: string) => t === 'go' || t === 'golang', icon: SiGo },
  { match: (t: string) => t === 'rust', icon: SiRust },
  { match: (t: string) => t === 'dart', icon: SiDart },
  { match: (t: string) => t === 'kotlin', icon: SiKotlin },
  { match: (t: string) => t === 'swift', icon: SiSwift },
  { match: (t: string) => t === 'zig', icon: SiZig },
  { match: (t: string) => t === 'julia', icon: SiJulia },
  { match: (t: string) => t === 'ruby', icon: SiRuby },
  { match: (t: string) => t === 'php', icon: SiPhp },
  { match: (t: string) => t === 'scala', icon: SiScala },
  { match: (t: string) => t === 'elixir', icon: SiElixir },
  { match: (t: string) => t === 'haskell', icon: SiHaskell },
  { match: (t: string) => t === 'solidity', icon: SiSolidity },
  { match: (t: string) => t === 'svelte', icon: SiSvelte },
  { match: (t: string) => t === 'astro', icon: SiAstro },
  { match: (t: string) => t === 'nextjs' || t === 'next', icon: SiNextdotjs },
  { match: (t: string) => t === 'remix', icon: SiRemix },
  { match: (t: string) => t === 'flutter', icon: SiFlutter },
  { match: (t: string) => t === 'react', icon: SiReact },
  { match: (t: string) => t === 'angular', icon: SiAngular },
  { match: (t: string) => t === 'docker', icon: SiDocker },
  { match: (t: string) => t === 'terraform', icon: SiTerraform },
  { match: (t: string) => t === 'graphql', icon: SiGraphql },
  { match: (t: string) => t === 'mysql', icon: SiMysql },
  { match: (t: string) => t === 'postgresql' || t === 'postgres', icon: SiPostgresql },
  { match: (t: string) => t === 'mongodb', icon: SiMongodb },
  { match: (t: string) => t === 'redis', icon: SiRedis },
  { match: (t: string) => t === 'firebase', icon: SiFirebase },
  { match: (t: string) => t === 'aws' || t === 'amazonwebservices', icon: SiAmazonwebservices },
  { match: (t: string) => t.includes('typescript'), icon: SiTypescript },
  { match: (t: string) => t.includes('javascript'), icon: SiJavascript },
  { match: (t: string) => t.includes('python'), icon: SiPython },
  { match: (t: string) => t.includes('vue'), icon: SiVuedotjs },
  { match: (t: string) => t.includes('html'), icon: SiHtml5 },
  { match: (t: string) => t.includes('css'), icon: SiCss3 },
  { match: (t: string) => t.includes('node'), icon: SiNodedotjs },
  { match: (t: string) => ['bash', 'shell', 'sh'].includes(t), icon: FaTerminal },
  { match: (t: string) => t === 'powershell', icon: SiPowers },
  { match: (t: string) => t === 'c', icon: SiC },
  { match: (t: string) => t === 'cpp' || t === 'c++', icon: SiCplusplus },
  { match: (t: string) => t === 'java', icon: FaJava },
  { match: (t: string) => t === 'md' || t === 'markdown', icon: SiMarkdown },
  { match: (t: string) => t === 'vim' || t === 'vimscript', icon: SiVim },
  { match: (t: string) => t === 'makefile' || t === 'make' || t === 'cmake', icon: SiGnu },
];

const normalize = (t?: string) => (t || '').toLowerCase().replace(/[^a-z0-9+]/g, '');

function getIcon(techRaw: string): IconType {
  const tech = normalize(techRaw);
  for (const entry of TECH_ICON_MAP) {
    if (entry.match(tech)) return entry.icon;
  }
  return FaTerminal;
}

function getColor(techRaw: string): string {
  const tech = normalize(techRaw);
  return LANGUAGE_COLORS[tech] || '#6b7280';
}

function getLabel(techRaw: string): string {
  const labelMap: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    python: 'Python',
    vue: 'Vue',
    html: 'HTML',
    css: 'CSS',
    node: 'Node.js',
    shell: 'Shell',
    bash: 'Bash',
    c: 'C',
    cpp: 'C++',
    'c++': 'C++',
    java: 'Java',
    go: 'Go',
    rust: 'Rust',
    dart: 'Dart',
    kotlin: 'Kotlin',
    swift: 'Swift',
    ruby: 'Ruby',
    php: 'PHP',
    vim: 'Vim Script',
    vimscript: 'Vim Script',
    makefile: 'Make',
    cmake: 'CMake',
    markdown: 'Markdown',
  };
  const tech = normalize(techRaw);
  return labelMap[tech] || techRaw;
}

interface LanguageDistributionProps {
  techCounts: Record<string, number>;
  onSelectTech?: (tech: string | null) => void;
  selectedTech?: string | null;
}

export default function LanguageDistribution({
  techCounts,
  onSelectTech,
  selectedTech
}: LanguageDistributionProps) {
  // Calculate distribution
  const distribution = useMemo(() => {
    const total = Object.values(techCounts).reduce((sum, count) => sum + count, 0);
    if (total === 0) return [];

    return Object.entries(techCounts)
      .map(([tech, count]) => ({
        tech,
        normalized: normalize(tech),
        count,
        percentage: (count / total) * 100,
        color: getColor(tech),
        icon: getIcon(tech),
        label: getLabel(tech),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 languages
  }, [techCounts]);

  if (distribution.length === 0) return null;

  const total = Object.values(techCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="glass-effect rounded-2xl border border-white/20 p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        Language Distribution
      </h3>

      {/* Horizontal bar visualization */}
      <div className="mb-6">
        <div className="h-4 rounded-full overflow-hidden flex bg-white/5" role="img" aria-label="Language distribution bar">
          {distribution.map(({ normalized, percentage, color }, idx) => (
            <div
              key={normalized}
              className={`h-full transition-all duration-300 cursor-pointer hover:brightness-125 ${
                selectedTech && selectedTech !== normalized ? 'opacity-40' : ''
              }`}
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
                marginLeft: idx > 0 ? '2px' : 0,
              }}
              onClick={() => onSelectTech?.(selectedTech === normalized ? null : normalized)}
              title={`${getLabel(normalized)}: ${percentage.toFixed(1)}%`}
              role="button"
              aria-label={`${getLabel(normalized)}: ${percentage.toFixed(1)}%`}
            />
          ))}
        </div>
      </div>

      {/* Legend with details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {distribution.map(({ normalized, count, percentage, color, icon: Icon, label }) => (
          <button
            key={normalized}
            onClick={() => onSelectTech?.(selectedTech === normalized ? null : normalized)}
            className={`
              flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-left
              ${selectedTech === normalized
                ? 'bg-white/15 ring-2 ring-white/30'
                : selectedTech
                  ? 'opacity-50 hover:opacity-80'
                  : 'hover:bg-white/10'
              }
            `}
          >
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <Icon className="w-4 h-4 shrink-0" style={{ color }} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-white truncate">{label}</div>
              <div className="text-xs text-gray-400">
                {count} project{count !== 1 ? 's' : ''} · {percentage.toFixed(0)}%
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Total projects indicator */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
        <span className="text-gray-400">Total unique technologies across projects</span>
        <span className="text-emerald-400 font-semibold">{total}</span>
      </div>
    </div>
  );
}
