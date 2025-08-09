import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiPython, SiVuedotjs, SiHtml5, SiCss3, SiNodedotjs } from 'react-icons/si';
import { Chip } from '@material-tailwind/react';
import { Project } from '../types/portfolio';

// Helpers
const normalize = (t?: string) => (t || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const getAccentForTech = (techRaw?: string) => {
  const tech = normalize(techRaw);
  if (tech.includes('typescript') || tech.includes('react') || tech.includes('next')) {
    return { accentBg: 'bg-blue-500/15', accentText: 'text-blue-300', ring: 'ring-blue-400/40', chipBg: 'bg-blue-500/10', chipText: 'text-blue-200', Icon: SiTypescript } as const;
  }
  if (tech.includes('javascript') || tech.includes('node')) {
    return { accentBg: 'bg-amber-500/15', accentText: 'text-amber-300', ring: 'ring-amber-400/40', chipBg: 'bg-amber-500/10', chipText: 'text-amber-200', Icon: SiJavascript } as const;
  }
  if (tech.includes('python')) {
    return { accentBg: 'bg-purple-500/15', accentText: 'text-purple-300', ring: 'ring-purple-400/40', chipBg: 'bg-purple-500/10', chipText: 'text-purple-200', Icon: SiPython } as const;
  }
  if (tech.includes('vue')) {
    return { accentBg: 'bg-green-500/15', accentText: 'text-green-300', ring: 'ring-green-400/40', chipBg: 'bg-green-500/10', chipText: 'text-green-200', Icon: SiVuedotjs } as const;
  }
  if (tech.includes('html')) {
    return { accentBg: 'bg-pink-500/15', accentText: 'text-pink-300', ring: 'ring-pink-400/40', chipBg: 'bg-pink-500/10', chipText: 'text-pink-200', Icon: SiHtml5 } as const;
  }
  if (tech.includes('css')) {
    return { accentBg: 'bg-indigo-500/15', accentText: 'text-indigo-300', ring: 'ring-indigo-400/40', chipBg: 'bg-indigo-500/10', chipText: 'text-indigo-200', Icon: SiCss3 } as const;
  }
  return { accentBg: 'bg-blue-gray-500/15', accentText: 'text-blue-gray-300', ring: 'ring-blue-gray-400/40', chipBg: 'bg-blue-gray-500/10', chipText: 'text-blue-gray-200', Icon: SiNodedotjs } as const;
};

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
}

export default function GitHubProjects({
  projects,
  loading,
  error,
  hasMore = false
}: GitHubProjectsProps) {

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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => {
          const accent = getAccentForTech(project.tech?.[0]);
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
              {/* Accent bar */}
              <div className={`absolute inset-x-0 top-0 h-1.5 ${accent.accentBg}`} aria-hidden="true" />

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex items-center justify-center h-9 w-9 rounded-lg border border-white/20 ${accent.accentBg} ${accent.accentText} shadow-md shadow-black/20`}>
                    <TitleIcon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h4 id={titleId} className="text-white font-semibold text-lg truncate">
                    {project.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2 shrink-0" role="group" aria-label="Repository statistics">
                  <Chip size="sm" variant="ghost" className={`border border-white/20 ${accent.chipBg} ${accent.chipText}`} aria-label={`${stars} stars`}>
                    <span className="inline-flex items-center gap-1"><FaStar className="w-3.5 h-3.5" aria-hidden="true" />{stars}</span>
                  </Chip>
                  <Chip size="sm" variant="ghost" className={`border border-white/20 ${accent.chipBg} ${accent.chipText}`} aria-label={`${forks} forks`}>
                    <span className="inline-flex items-center gap-1"><FaCodeBranch className="w-3.5 h-3.5" aria-hidden="true" />{forks}</span>
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
                  {project.tech.slice(0, 5).map((t, i) => (
                    <span key={i} className={`px-2.5 py-1 rounded-full text-xs border border-white/20 ${accent.chipBg} ${accent.chipText}`}>{t}</span>
                  ))}
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
                    <FaGithub className="w-4 h-4" /> Code
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
                    <FaExternalLinkAlt className="w-4 h-4" /> Demo
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
