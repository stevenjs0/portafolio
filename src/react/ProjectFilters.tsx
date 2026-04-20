import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';

interface Project {
  slug: string;
  title: string;
  summary: string;
  metrics: string[];
  technologies: string[];
  featured: boolean;
  category: string;
  date: string;
  cover_image?: string;
}

export default function ProjectFilters({ projects }: { projects: string }) {
  const allProjects: Project[] = useMemo(() => {
    try {
      return JSON.parse(projects);
    } catch (err) {
      console.error('ProjectFilters: Failed to parse projects JSON:', err);
      return [];
    }
  }, [projects]);
  const [filter, setFilter] = useState('all');

  const categories = [
    'all',
    ...Array.from(new Set(allProjects.map((p) => p.category).filter(Boolean))),
  ];

  const filtered = useMemo(() => {
    const result =
      filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter);
    return [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [allProjects, filter]);

  return (
    <ErrorBoundary>
      <div className="flex flex-col">
        {/* Filter buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                filter === cat
                  ? 'bg-accent text-background shadow-sm'
                  : 'bg-surface border-border text-foreground-secondary hover:text-foreground hover:border-accent/30 border'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-foreground-muted mb-6 text-center font-mono text-sm">
          Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, index) => (
              <motion.a
                key={project.slug}
                href={`/projects/${project.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card group glow-subtle block overflow-hidden"
              >
                {/* Cover image */}
                {project.cover_image ? (
                  <div className="bg-surface aspect-video overflow-hidden">
                    <img
                      src={project.cover_image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = 'none';
                        const placeholder = img.parentElement?.querySelector(
                          '.img-fallback',
                        ) as HTMLElement | null;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <div className="img-fallback from-accent-subtle to-surface absolute inset-0 hidden items-center justify-center bg-linear-to-br">
                      <svg
                        className="text-accent/20 h-16 w-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="from-accent-subtle to-surface flex aspect-video items-center justify-center bg-linear-to-br">
                    <svg
                      className="text-accent/20 h-16 w-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A2.5 2.5 0 0 0 15.5 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                      <path d="M12 11V9" />
                      <path d="M12 17v-2" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Badges */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {project.featured && (
                      <span className="badge border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Featured
                      </span>
                    )}
                    {project.category && <span className="badge">{project.category}</span>}
                  </div>

                  {/* Title */}
                  <h3 className="group-hover:text-accent mb-2 line-clamp-2 text-lg font-bold transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-foreground-secondary mb-4 line-clamp-2 flex-1 text-sm">
                    {project.summary}
                  </p>

                  {/* Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <span
                          key={i}
                          className="border-accent-border bg-accent-subtle text-accent rounded-lg border px-2.5 py-1 text-xs font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="border-border/50 bg-surface/50 text-foreground-muted rounded-lg border px-2.5 py-1 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="border-border/50 bg-surface/50 text-foreground-muted rounded-lg border px-2.5 py-1 font-mono text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-foreground-muted flex flex-col items-center justify-center py-20">
            <svg
              className="mb-4 h-16 w-16 opacity-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A2.5 2.5 0 0 0 15.5 5.5c-1.4 0-2.5 1.1-2.5 2.5 0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
              <path d="M12 11V9" />
              <path d="M12 17v-2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p className="text-sm">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
