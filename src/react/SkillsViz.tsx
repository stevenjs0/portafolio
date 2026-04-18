import { useState, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';

export interface Skill {
  name: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface SkillsVizProps {
  skillCategories: SkillCategory[];
}

const iconPaths: Record<string, JSX.Element> = {
  layout: (
    <path
      d="M3 3h18v18H3zM3 9h18M9 21V9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" strokeWidth="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" strokeWidth="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2" />
      <path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" strokeWidth="2" />
      <path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" strokeWidth="2" />
    </>
  ),
  tool: (
    <path
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function SkillsViz({ skillCategories }: SkillsVizProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <ErrorBoundary>
      <div className="mx-auto w-full">
        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category, idx) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(idx)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === idx
                  ? 'bg-accent text-background shadow-sm'
                  : 'bg-surface border-border text-foreground-secondary hover:text-foreground hover:border-accent/30 border'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {iconPaths[category.icon]}
              </svg>
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {skillCategories[activeCategory].skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card glow-subtle p-5"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold">{skill.name}</h4>
                    <p className="text-foreground-muted font-mono text-xs">{skill.years}+ years</p>
                  </div>
                  <div className="text-right">
                    <span className="text-accent text-2xl font-bold">{skill.level}%</span>
                  </div>
                </div>

                {/* Proficiency bar */}
                <div className="bg-background h-2 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                    className="from-accent to-accent-hover h-full rounded-full bg-linear-to-r"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
