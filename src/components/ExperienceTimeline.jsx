import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';

export default function ExperienceTimeline() {
  const { lang } = useApp();

  return (
    <section id="experience" className="w-full bg-[var(--color-paper)] border-b-[3px] border-[var(--color-rule)]">
      
      {/* S1 Left Margin Numbered */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-b-[3px] border-[var(--color-rule)]">
        <div className="lg:w-1/4 p-6 lg:p-12 lg:border-r-[3px] border-[var(--color-rule)] flex items-start">
          <span className="font-mono text-2xl font-black text-[var(--color-ink)]">02 /</span>
        </div>
        <div className="lg:w-3/4 p-6 lg:p-12">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-[var(--color-ink)] mb-6">
            {lang === 'vi' ? 'Hành trình' : 'Experience'}
          </h2>
        </div>
      </div>

      {/* Brutalist Timeline List */}
      <div className="max-w-7xl mx-auto">
        {portfolioData.experience.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row border-b-[3px] border-[var(--color-rule)] last:border-b-0 hover:bg-[var(--color-paper-2)] transition-colors">
            {/* Left Col: Duration */}
            <div className="md:w-1/4 p-6 md:p-12 md:border-r-[3px] border-[var(--color-rule)]">
              <span className="font-mono text-sm md:text-base font-black uppercase text-[var(--color-ink)] px-4 py-2 bg-[var(--color-accent)] text-[var(--color-paper)] brutal-border">
                {item.duration[lang]}
              </span>
            </div>
            
            {/* Right Col: Details */}
            <div className="md:w-3/4 p-6 md:p-12 flex flex-col justify-center">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-ink)] uppercase mb-2">
                {item.role[lang]}
              </h3>
              <p className="font-mono text-lg font-bold text-[var(--color-ink-3)] uppercase tracking-wider mb-6">
                {typeof item.company === 'object' ? item.company[lang] : item.company}
              </p>
              <p className="text-lg text-[var(--color-ink-2)] font-body max-w-3xl leading-relaxed">
                {item.description[lang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
