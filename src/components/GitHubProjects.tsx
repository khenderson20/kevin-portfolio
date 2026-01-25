import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaTerminal, FaJava } from 'react-icons/fa';
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
import { Chip } from '@material-tailwind/react';
import { Project } from '../types/portfolio';

// Icon map for techs
const TECH_ICON_MAP = [
  { match: (t: string) => t === 'go' || t === 'golang', icon: SiGo, accent: { bg: 'bg-cyan-700/15', text: 'text-cyan-200', ring: 'ring-cyan-700/40', chipBg: 'bg-cyan-700/10', chipText: 'text-cyan-200' } },
  { match: (t: string) => t === 'rust', icon: SiRust, accent: { bg: 'bg-orange-900/15', text: 'text-orange-300', ring: 'ring-orange-900/40', chipBg: 'bg-orange-900/10', chipText: 'text-orange-300' } },
  { match: (t: string) => t === 'dart', icon: SiDart, accent: { bg: 'bg-sky-700/15', text: 'text-sky-200', ring: 'ring-sky-700/40', chipBg: 'bg-sky-700/10', chipText: 'text-sky-200' } },
  { match: (t: string) => t === 'kotlin', icon: SiKotlin, accent: { bg: 'bg-purple-700/15', text: 'text-purple-200', ring: 'ring-purple-700/40', chipBg: 'bg-purple-700/10', chipText: 'text-purple-200' } },
  { match: (t: string) => t === 'swift', icon: SiSwift, accent: { bg: 'bg-orange-500/15', text: 'text-orange-200', ring: 'ring-orange-500/40', chipBg: 'bg-orange-500/10', chipText: 'text-orange-200' } },
  { match: (t: string) => t === 'zig', icon: SiZig, accent: { bg: 'bg-yellow-800/15', text: 'text-yellow-200', ring: 'ring-yellow-800/40', chipBg: 'bg-yellow-800/10', chipText: 'text-yellow-200' } },
  { match: (t: string) => t === 'julia', icon: SiJulia, accent: { bg: 'bg-fuchsia-700/15', text: 'text-fuchsia-200', ring: 'ring-fuchsia-700/40', chipBg: 'bg-fuchsia-700/10', chipText: 'text-fuchsia-200' } },
  { match: (t: string) => t === 'ruby', icon: SiRuby, accent: { bg: 'bg-red-700/15', text: 'text-red-200', ring: 'ring-red-700/40', chipBg: 'bg-red-700/10', chipText: 'text-red-200' } },
  { match: (t: string) => t === 'php', icon: SiPhp, accent: { bg: 'bg-indigo-700/15', text: 'text-indigo-200', ring: 'ring-indigo-700/40', chipBg: 'bg-indigo-700/10', chipText: 'text-indigo-200' } },
  { match: (t: string) => t === 'scala', icon: SiScala, accent: { bg: 'bg-red-800/15', text: 'text-red-200', ring: 'ring-red-800/40', chipBg: 'bg-red-800/10', chipText: 'text-red-200' } },
  { match: (t: string) => t === 'elixir', icon: SiElixir, accent: { bg: 'bg-purple-900/15', text: 'text-purple-300', ring: 'ring-purple-900/40', chipBg: 'bg-purple-900/10', chipText: 'text-purple-300' } },
  { match: (t: string) => t === 'haskell', icon: SiHaskell, accent: { bg: 'bg-violet-900/15', text: 'text-violet-200', ring: 'ring-violet-900/40', chipBg: 'bg-violet-900/10', chipText: 'text-violet-200' } },
  { match: (t: string) => t === 'solidity', icon: SiSolidity, accent: { bg: 'bg-gray-800/15', text: 'text-gray-200', ring: 'ring-gray-800/40', chipBg: 'bg-gray-800/10', chipText: 'text-gray-200' } },
  { match: (t: string) => t === 'svelte', icon: SiSvelte, accent: { bg: 'bg-orange-600/15', text: 'text-orange-200', ring: 'ring-orange-600/40', chipBg: 'bg-orange-600/10', chipText: 'text-orange-200' } },
  { match: (t: string) => t === 'astro', icon: SiAstro, accent: { bg: 'bg-indigo-900/15', text: 'text-indigo-200', ring: 'ring-indigo-900/40', chipBg: 'bg-indigo-900/10', chipText: 'text-indigo-200' } },
  { match: (t: string) => t === 'nextjs' || t === 'next', icon: SiNextdotjs, accent: { bg: 'bg-gray-900/15', text: 'text-gray-200', ring: 'ring-gray-900/40', chipBg: 'bg-gray-900/10', chipText: 'text-gray-200' } },
  { match: (t: string) => t === 'remix', icon: SiRemix, accent: { bg: 'bg-blue-900/15', text: 'text-blue-200', ring: 'ring-blue-900/40', chipBg: 'bg-blue-900/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t === 'flutter', icon: SiFlutter, accent: { bg: 'bg-sky-500/15', text: 'text-sky-200', ring: 'ring-sky-500/40', chipBg: 'bg-sky-500/10', chipText: 'text-sky-200' } },
  { match: (t: string) => t === 'react', icon: SiReact, accent: { bg: 'bg-cyan-500/15', text: 'text-cyan-200', ring: 'ring-cyan-500/40', chipBg: 'bg-cyan-500/10', chipText: 'text-cyan-200' } },
  { match: (t: string) => t === 'angular', icon: SiAngular, accent: { bg: 'bg-red-600/15', text: 'text-red-200', ring: 'ring-red-600/40', chipBg: 'bg-red-600/10', chipText: 'text-red-200' } },
  { match: (t: string) => t === 'docker', icon: SiDocker, accent: { bg: 'bg-blue-500/15', text: 'text-blue-200', ring: 'ring-blue-500/40', chipBg: 'bg-blue-500/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t === 'terraform', icon: SiTerraform, accent: { bg: 'bg-purple-800/15', text: 'text-purple-200', ring: 'ring-purple-800/40', chipBg: 'bg-purple-800/10', chipText: 'text-purple-200' } },
  { match: (t: string) => t === 'graphql', icon: SiGraphql, accent: { bg: 'bg-pink-700/15', text: 'text-pink-200', ring: 'ring-pink-700/40', chipBg: 'bg-pink-700/10', chipText: 'text-pink-200' } },
  { match: (t: string) => t === 'mysql', icon: SiMysql, accent: { bg: 'bg-yellow-800/15', text: 'text-yellow-200', ring: 'ring-yellow-800/40', chipBg: 'bg-yellow-800/10', chipText: 'text-yellow-200' } },
  { match: (t: string) => t === 'postgresql' || t === 'postgres', icon: SiPostgresql, accent: { bg: 'bg-blue-800/15', text: 'text-blue-200', ring: 'ring-blue-800/40', chipBg: 'bg-blue-800/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t === 'mongodb', icon: SiMongodb, accent: { bg: 'bg-green-800/15', text: 'text-green-200', ring: 'ring-green-800/40', chipBg: 'bg-green-800/10', chipText: 'text-green-200' } },
  { match: (t: string) => t === 'redis', icon: SiRedis, accent: { bg: 'bg-red-800/15', text: 'text-red-200', ring: 'ring-red-800/40', chipBg: 'bg-red-800/10', chipText: 'text-red-200' } },
  { match: (t: string) => t === 'firebase', icon: SiFirebase, accent: { bg: 'bg-yellow-500/15', text: 'text-yellow-200', ring: 'ring-yellow-500/40', chipBg: 'bg-yellow-500/10', chipText: 'text-yellow-200' } },
  { match: (t: string) => t === 'aws' || t === 'amazonwebservices' || t === 'amazonaws', icon: SiAmazonwebservices, accent: { bg: 'bg-yellow-700/15', text: 'text-yellow-200', ring: 'ring-yellow-700/40', chipBg: 'bg-yellow-700/10', chipText: 'text-yellow-200' } },
  { match: (t: string) => t.includes('typescript'), icon: SiTypescript, accent: { bg: 'bg-blue-500/15', text: 'text-blue-300', ring: 'ring-blue-400/40', chipBg: 'bg-blue-500/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t.includes('javascript'), icon: SiJavascript, accent: { bg: 'bg-amber-500/15', text: 'text-amber-300', ring: 'ring-amber-400/40', chipBg: 'bg-amber-500/10', chipText: 'text-amber-200' } },
  { match: (t: string) => t.includes('python'), icon: SiPython, accent: { bg: 'bg-purple-500/15', text: 'text-purple-300', ring: 'ring-purple-400/40', chipBg: 'bg-purple-500/10', chipText: 'text-purple-200' } },
  { match: (t: string) => t.includes('vue'), icon: SiVuedotjs, accent: { bg: 'bg-green-500/15', text: 'text-green-300', ring: 'ring-green-400/40', chipBg: 'bg-green-500/10', chipText: 'text-green-200' } },
  { match: (t: string) => t.includes('html'), icon: SiHtml5, accent: { bg: 'bg-pink-500/15', text: 'text-pink-300', ring: 'ring-pink-400/40', chipBg: 'bg-pink-500/10', chipText: 'text-pink-200' } },
  { match: (t: string) => t.includes('css'), icon: SiCss3, accent: { bg: 'bg-indigo-500/15', text: 'text-indigo-300', ring: 'ring-indigo-400/40', chipBg: 'bg-indigo-500/10', chipText: 'text-indigo-200' } },
  { match: (t: string) => t.includes('node'), icon: SiNodedotjs, accent: { bg: 'bg-lime-500/15', text: 'text-lime-300', ring: 'ring-lime-400/40', chipBg: 'bg-lime-500/10', chipText: 'text-lime-200' } },
  { match: (t: string) => ['bash', 'shell', 'sh'].includes(t), icon: FaTerminal, accent: { bg: 'bg-gray-500/15', text: 'text-gray-300', ring: 'ring-gray-400/40', chipBg: 'bg-gray-500/10', chipText: 'text-gray-200' } },
  { match: (t: string) => t === 'powershell', icon: SiPowers, accent: { bg: 'bg-blue-800/15', text: 'text-blue-200', ring: 'ring-blue-800/40', chipBg: 'bg-blue-800/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t === 'c', icon: SiC, accent: { bg: 'bg-cyan-500/15', text: 'text-cyan-300', ring: 'ring-cyan-400/40', chipBg: 'bg-cyan-500/10', chipText: 'text-cyan-200' } },
  { match: (t: string) => t === 'cpp' || t === 'c++', icon: SiCplusplus, accent: { bg: 'bg-blue-400/15', text: 'text-blue-200', ring: 'ring-blue-400/40', chipBg: 'bg-blue-400/10', chipText: 'text-blue-200' } },
  { match: (t: string) => t === 'java', icon: FaJava, accent: { bg: 'bg-orange-500/15', text: 'text-orange-300', ring: 'ring-orange-400/40', chipBg: 'bg-orange-500/10', chipText: 'text-orange-200' } },
  { match: (t: string) => t === 'md' || t === 'markdown', icon: SiMarkdown, accent: { bg: 'bg-gray-700/15', text: 'text-gray-200', ring: 'ring-gray-700/40', chipBg: 'bg-gray-700/10', chipText: 'text-gray-200' } },
  { match: (t: string) => t === 'vim' || t === 'vimscript', icon: SiVim, accent: { bg: 'bg-green-800/15', text: 'text-green-200', ring: 'ring-green-800/40', chipBg: 'bg-green-800/10', chipText: 'text-green-200' } },
  { match: (t: string) => t === 'makefile' || t === 'make', icon: SiGnu, accent: { bg: 'bg-yellow-700/15', text: 'text-yellow-200', ring: 'ring-yellow-700/40', chipBg: 'bg-yellow-700/10', chipText: 'text-yellow-200' } },
];

function getTechIconAndAccent(techRaw?: string) {
  const tech = normalize(techRaw);
  for (const entry of TECH_ICON_MAP) {
    if (entry.match(tech)) {
      return {
        Icon: entry.icon,
        accentBg: entry.accent.bg,
        accentText: entry.accent.text,
        ring: entry.accent.ring,
        chipBg: entry.accent.chipBg,
        chipText: entry.accent.chipText,
      };
    }
  }
  // Default to generic terminal icon style
  return {
    Icon: FaTerminal,
    accentBg: 'bg-blue-gray-500/15',
    accentText: 'text-blue-gray-300',
    ring: 'ring-blue-gray-400/40',
    chipBg: 'bg-blue-gray-500/10',
    chipText: 'text-blue-gray-200',
  };
}
// Helpers
// normalize must preserve the '+' character for languages like C++
const normalize = (t?: string) => (t || '').toLowerCase().replace(/[^a-z0-9+]/g, '');

// Use the new helper for accent and icon

const parseMetrics = (metrics?: string) => {
  if (!metrics) return { stars: 0, forks: 0 };
  const nums = (metrics.match(/\d+/g) || []).map((n) => parseInt(n, 10));
  return { stars: nums[0] || 0, forks: nums[1] || 0 };
};


interface GitHubProjectsProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  hasMore?: boolean;
  selectedTech?: string | null;
}

export default function GitHubProjects({
  projects,
  loading,
  error,
  hasMore = false,
  selectedTech = null
}: GitHubProjectsProps) {
  // Filter projects by selected technology
  const filteredProjects = selectedTech
    ? projects.filter(project =>
        project.tech?.some(t => normalize(t) === selectedTech)
      )
    : projects;

  if (loading && projects.length === 0) {
    return <div className="text-gray-300">Loading GitHub projects...</div>;
  }

  if (error && projects.length === 0) {
    return <div className="text-red-300">{error}</div>;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <a
          href="https://github.com/khenderson20"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass-effect border border-white/20 text-blue-200 hover:text-white hover:ring-2 hover:ring-blue-400/40 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label="View all repositories on GitHub"
        >
          View All Repositories
          <FaExternalLinkAlt className="w-4 h-4" />
        </a>
      </div>

      {/* Grid - centers items when few projects exist */}
      <div
        className={`grid gap-6 md:gap-8 ${
          filteredProjects.length === 1
            ? 'grid-cols-1 max-w-md mx-auto'
            : filteredProjects.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredProjects.length === 0 && selectedTech ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            <p className="text-lg">No projects found with this technology.</p>
            <p className="text-sm mt-2">Try selecting a different filter.</p>
          </div>
        ) : null}
        {filteredProjects.map((project) => {
          const accent = getTechIconAndAccent(project.tech?.[0]);
          const { stars, forks } = parseMetrics(project.metrics);
          const TitleIcon = accent.Icon;
          const titleId = `repo-${project.id}`;

          return (
            <article
              key={project.id}
              className={`group relative glass-effect rounded-2xl border border-white/20 p-5 md:p-6 transition transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 focus-within:ring-2 ${accent.ring}`}
              aria-labelledby={titleId}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && project.github) {
                  window.open(project.github, '_blank', 'noopener,noreferrer');
                }
              }}
            >


              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/20 ${accent.accentBg} ${accent.accentText} shadow-md shadow-black/20 p-2 flex-shrink-0`}>
                    <TitleIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                  </span>
                  <h4 id={titleId} className="text-white font-semibold text-lg truncate">
                    {project.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2 shrink-0" role="group" aria-label="Repository statistics">
                  <Chip size="sm" variant="ghost" className={`border border-white/20 ${accent.chipBg} ${accent.chipText}`} aria-label={`${stars} stars`}>
                    <span className="inline-flex items-center gap-1"><FaStar className="w-5 h-5" aria-hidden="true" />{stars}</span>
                  </Chip>
                  <Chip size="sm" variant="ghost" className={`border border-white/20 ${accent.chipBg} ${accent.chipText}`} aria-label={`${forks} forks`}>
                    <span className="inline-flex items-center gap-1"><FaCodeBranch className="w-5 h-5" aria-hidden="true" />{forks}</span>
                  </Chip>
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <p className="mt-3 text-gray-300 text-sm line-clamp-4">{project.description}</p>
              )}

              {/* Tech tags */}
              {project.tech && project.tech.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((t, i) => {
                    const tech = normalize(t);
                    const entry = TECH_ICON_MAP.find(entry => entry.match(tech));
                    const Icon = entry ? entry.icon : FaTerminal;
                    return (
                      <span key={i} className={`px-2.5 py-1 rounded-full text-xs border border-white/20 ${accent.chipBg} ${accent.chipText} flex items-center`}>
                        <Icon className="w-4 h-4 mr-1 align-middle inline-block" />
                        {t}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm glass-effect border border-white/20 ${accent.accentText} hover:text-white hover:ring-2 ${accent.ring} transition`}
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub className="w-5 h-5" /> Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm glass-effect border border-white/20 text-emerald-200 hover:text-white hover:ring-2 hover:ring-emerald-400/40 transition"
                    aria-label={`Open live demo for ${project.title}`}
                  >
                    <FaExternalLinkAlt className="w-5 h-5" /> Demo
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Loading indicator for pagination */}
      {loading && projects.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3 text-gray-300">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/60" aria-hidden="true"></div>
          <span>Loading more repositories...</span>
        </div>
      )}

      {/* Error indicator for pagination */}
      {error && projects.length > 0 && (
        <div className="mt-6 text-center text-red-300">Failed to load more repositories. Please try again.</div>
      )}

      {/* End of results indicator */}
      {!loading && !error && projects.length > 0 && !hasMore && (
        <div className="mt-6 text-center text-gray-400">All repositories loaded</div>
      )}
    </div>
  );
}
