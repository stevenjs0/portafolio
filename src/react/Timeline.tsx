import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';

export interface Experience {
  period: string;
  role: string;
  company: string;
  achievements: string[];
  tech: string[];
}

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <ErrorBoundary>
      <div className="relative">
        {/* Timeline line */}
        <div className="bg-border absolute top-0 bottom-0 left-3 w-px md:left-6" aria-hidden="true" />

        <div className="flex flex-col space-y-8">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.period} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute top-1.5 left-0 md:left-4">
        <div className="relative">
          <div className="border-accent bg-background flex h-6 w-6 items-center justify-center rounded-full border-2">
            <div className="bg-accent h-2 w-2 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="card p-6">
        {/* Period badge */}
        <div className="bg-accent-subtle border-accent-border mb-4 inline-flex items-center rounded-full border px-3 py-1">
          <span className="text-accent font-mono text-xs font-semibold">{exp.period}</span>
        </div>

        {/* Role & Company */}
        <div className="mb-4">
          <h3 className="mb-1 text-xl font-bold">{exp.role}</h3>
          <p className="text-accent font-medium">{exp.company}</p>
        </div>

        {/* Achievements */}
        <ul className="mb-6 space-y-2">
          {exp.achievements.map((achievement) => (
            <li
              key={achievement}
              className="text-foreground-secondary flex items-start gap-2 text-sm leading-relaxed"
            >
              <svg
                className="text-accent mt-0.5 h-4 w-4 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="border-border/50 bg-surface/50 text-foreground-secondary rounded-lg border px-3 py-1 font-mono text-xs"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
