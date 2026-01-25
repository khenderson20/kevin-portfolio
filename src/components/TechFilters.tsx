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

// Icon map for techs (same as GitHubProjects)
const TECH_ICON_MAP: Array<{
  match: (t: string) => boolean;
  icon: IconType;
  color: string;
  label: string;
}> = [
  { match: (t: string) => t === 'go' || t === 'golang', icon: SiGo, color: 'text-cyan-400', label: 'Go' },
  { match: (t: string) => t === 'rust', icon: SiRust, color: 'text-orange-400', label: 'Rust' },
  { match: (t: string) => t === 'dart', icon: SiDart, color: 'text-sky-400', label: 'Dart' },
  { match: (t: string) => t === 'kotlin', icon: SiKotlin, color: 'text-purple-400', label: 'Kotlin' },
  { match: (t: string) => t === 'swift', icon: SiSwift, color: 'text-orange-400', label: 'Swift' },
  { match: (t: string) => t === 'zig', icon: SiZig, color: 'text-yellow-400', label: 'Zig' },
  { match: (t: string) => t === 'julia', icon: SiJulia, color: 'text-fuchsia-400', label: 'Julia' },
  { match: (t: string) => t === 'ruby', icon: SiRuby, color: 'text-red-400', label: 'Ruby' },
  { match: (t: string) => t === 'php', icon: SiPhp, color: 'text-indigo-400', label: 'PHP' },
  { match: (t: string) => t === 'scala', icon: SiScala, color: 'text-red-400', label: 'Scala' },
  { match: (t: string) => t === 'elixir', icon: SiElixir, color: 'text-purple-400', label: 'Elixir' },
  { match: (t: string) => t === 'haskell', icon: SiHaskell, color: 'text-violet-400', label: 'Haskell' },
  { match: (t: string) => t === 'solidity', icon: SiSolidity, color: 'text-gray-400', label: 'Solidity' },
  { match: (t: string) => t === 'svelte', icon: SiSvelte, color: 'text-orange-400', label: 'Svelte' },
  { match: (t: string) => t === 'astro', icon: SiAstro, color: 'text-indigo-400', label: 'Astro' },
  { match: (t: string) => t === 'nextjs' || t === 'next', icon: SiNextdotjs, color: 'text-white', label: 'Next.js' },
  { match: (t: string) => t === 'remix', icon: SiRemix, color: 'text-blue-400', label: 'Remix' },
  { match: (t: string) => t === 'flutter', icon: SiFlutter, color: 'text-sky-400', label: 'Flutter' },
  { match: (t: string) => t === 'react', icon: SiReact, color: 'text-cyan-400', label: 'React' },
  { match: (t: string) => t === 'angular', icon: SiAngular, color: 'text-red-400', label: 'Angular' },
  { match: (t: string) => t === 'docker', icon: SiDocker, color: 'text-blue-400', label: 'Docker' },
  { match: (t: string) => t === 'terraform', icon: SiTerraform, color: 'text-purple-400', label: 'Terraform' },
  { match: (t: string) => t === 'graphql', icon: SiGraphql, color: 'text-pink-400', label: 'GraphQL' },
  { match: (t: string) => t === 'mysql', icon: SiMysql, color: 'text-yellow-400', label: 'MySQL' },
  { match: (t: string) => t === 'postgresql' || t === 'postgres', icon: SiPostgresql, color: 'text-blue-400', label: 'PostgreSQL' },
  { match: (t: string) => t === 'mongodb', icon: SiMongodb, color: 'text-green-400', label: 'MongoDB' },
  { match: (t: string) => t === 'redis', icon: SiRedis, color: 'text-red-400', label: 'Redis' },
  { match: (t: string) => t === 'firebase', icon: SiFirebase, color: 'text-yellow-400', label: 'Firebase' },
  { match: (t: string) => t === 'aws' || t === 'amazonwebservices', icon: SiAmazonwebservices, color: 'text-yellow-400', label: 'AWS' },
  { match: (t: string) => t.includes('typescript'), icon: SiTypescript, color: 'text-blue-400', label: 'TypeScript' },
  { match: (t: string) => t.includes('javascript'), icon: SiJavascript, color: 'text-amber-400', label: 'JavaScript' },
  { match: (t: string) => t.includes('python'), icon: SiPython, color: 'text-purple-400', label: 'Python' },
  { match: (t: string) => t.includes('vue'), icon: SiVuedotjs, color: 'text-green-400', label: 'Vue' },
  { match: (t: string) => t.includes('html'), icon: SiHtml5, color: 'text-pink-400', label: 'HTML' },
  { match: (t: string) => t.includes('css'), icon: SiCss3, color: 'text-indigo-400', label: 'CSS' },
  { match: (t: string) => t.includes('node'), icon: SiNodedotjs, color: 'text-lime-400', label: 'Node.js' },
  { match: (t: string) => ['bash', 'shell', 'sh'].includes(t), icon: FaTerminal, color: 'text-gray-400', label: 'Shell' },
  { match: (t: string) => t === 'powershell', icon: SiPowers, color: 'text-blue-400', label: 'PowerShell' },
  { match: (t: string) => t === 'c', icon: SiC, color: 'text-cyan-400', label: 'C' },
  { match: (t: string) => t === 'cpp' || t === 'c++', icon: SiCplusplus, color: 'text-blue-400', label: 'C++' },
  { match: (t: string) => t === 'java', icon: FaJava, color: 'text-orange-400', label: 'Java' },
  { match: (t: string) => t === 'md' || t === 'markdown', icon: SiMarkdown, color: 'text-gray-400', label: 'Markdown' },
  { match: (t: string) => t === 'vim' || t === 'vimscript', icon: SiVim, color: 'text-green-400', label: 'Vim Script' },
  { match: (t: string) => t === 'makefile' || t === 'make' || t === 'cmake', icon: SiGnu, color: 'text-yellow-400', label: 'Make' },
];

const normalize = (t?: string) => (t || '').toLowerCase().replace(/[^a-z0-9+]/g, '');

function getTechInfo(techRaw?: string): { icon: IconType; color: string; label: string } {
  const tech = normalize(techRaw);
  for (const entry of TECH_ICON_MAP) {
    if (entry.match(tech)) {
      return { icon: entry.icon, color: entry.color, label: entry.label };
    }
  }
  return { icon: FaTerminal, color: 'text-gray-400', label: techRaw || 'Unknown' };
}

interface TechFiltersProps {
  technologies: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  projectCounts: Record<string, number>;
}

export default function TechFilters({ 
  technologies, 
  selectedTech, 
  onSelectTech,
  projectCounts 
}: TechFiltersProps) {
  // Get unique technologies with their icons
  const techItems = useMemo(() => {
    return technologies
      .map(tech => {
        const normalized = normalize(tech);
        const info = getTechInfo(tech);
        return {
          raw: tech,
          normalized,
          ...info,
          count: projectCounts[normalized] || 0
        };
      })
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [technologies, projectCounts]);

  if (techItems.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
        Filter by Technology
      </h3>
      <div className="flex flex-wrap gap-2">
        {/* "All" filter button */}
        <button
          onClick={() => onSelectTech(null)}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200 border
            ${selectedTech === null
              ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 ring-2 ring-emerald-500/30'
              : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
            }
          `}
          aria-pressed={selectedTech === null}
        >
          <span className="w-4 h-4 flex items-center justify-center text-xs">∞</span>
          All
          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/10">
            {Object.values(projectCounts).reduce((sum, n) => sum + n, 0) / (techItems.length || 1) > 1 
              ? techItems.length 
              : Object.keys(projectCounts).length}
          </span>
        </button>

        {/* Technology filter buttons */}
        {techItems.map(({ normalized, icon: Icon, color, label, count }) => (
          <button
            key={normalized}
            onClick={() => onSelectTech(selectedTech === normalized ? null : normalized)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 border
              ${selectedTech === normalized
                ? `bg-white/15 border-white/40 ${color} ring-2 ring-white/20`
                : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
              }
            `}
            aria-pressed={selectedTech === normalized}
          >
            <Icon className={`w-4 h-4 ${selectedTech === normalized ? color : ''}`} />
            {label}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/10">
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
