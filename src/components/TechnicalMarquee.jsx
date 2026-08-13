import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function TechnicalMarquee() {
  const projects = portfolioData.projects;

  // Duplicate array 4 times to guarantee a smooth continuous scroll across all screen widths
  const marqueeItems = [...projects, ...projects, ...projects, ...projects];

  return (
    <div className="w-full bg-[var(--color-ink)] border-b-[3px] border-[var(--color-rule)] py-8 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-hallmark-marquee">
        {marqueeItems.map((project, index) => (
          <a
            key={index}
            href="#projects"
            className="flex items-center group cursor-pointer"
          >
            <span className="font-display font-black uppercase text-3xl md:text-5xl text-[var(--color-paper)] px-8 tracking-tighter group-hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </span>
            <span className="text-[var(--color-accent)] font-mono font-black text-3xl">/</span>
          </a>
        ))}
      </div>
    </div>
  );
}

