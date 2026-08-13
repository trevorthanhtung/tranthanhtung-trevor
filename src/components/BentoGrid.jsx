import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon } from '@hugeicons/core-free-icons';

export default function BentoGrid() {
  const { lang } = useApp();

  return (
    <section id="projects" className="w-full bg-[var(--color-paper-2)] border-b-[3px] border-[var(--color-rule)]">
      
      {/* Section Head - S1 Left Margin Numbered (Brutalist style) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row border-b-[3px] border-[var(--color-rule)]">
        <div className="lg:w-1/4 p-6 lg:p-12 lg:border-r-[3px] border-[var(--color-rule)] flex items-start">
          <span className="font-mono text-2xl font-black text-[var(--color-ink)]">01 /</span>
        </div>
        <div className="lg:w-3/4 p-6 lg:p-12">
          <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-[var(--color-ink)] mb-6">
            {lang === 'vi' ? 'Sản phẩm' : 'Products'}
          </h2>
          <p className="font-mono text-lg max-w-2xl text-[var(--color-ink-2)]">
            {lang === 'vi' ? 'Các dự án thực tế, triển khai từ zero-to-one.' : 'Real-world projects, built from zero-to-one.'}
          </p>
        </div>
      </div>

      {/* Projects List - Brutalist Grid */}
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioData.projects.map((project, idx) => (
            <div key={idx} className="brutal-card flex flex-col h-full relative group">
              
              {/* Coming Soon Overlay */}
              {project.id === 'monat' && (
                <div className="absolute inset-0 bg-[var(--color-ink)]/90 z-20 flex items-center justify-center">
                   <div className="bg-[var(--color-accent)] text-[var(--color-paper)] font-display font-black uppercase text-3xl px-8 py-4 -rotate-3 border-4 border-[var(--color-ink)]">
                     {lang === 'vi' ? 'Sắp ra mắt' : 'Coming Soon'}
                   </div>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 md:p-8 border-b-[3px] border-[var(--color-rule)] bg-[var(--color-paper)] flex justify-between items-start">
                <div>
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h3>
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink-3)]">
                    {project.category[lang]}
                  </div>
                </div>
                {(project.links?.demo || project.link) && project.links?.demo !== '#' && !project.isComingSoon && (
                  <a href={project.links?.demo || project.link} target="_blank" rel="noreferrer" className="w-12 h-12 brutal-border flex items-center justify-center bg-[var(--color-paper-2)] hover:bg-[var(--color-accent)] hover:text-[var(--color-paper)] transition-colors shrink-0" title="Truy cập ứng dụng">
                    <HugeiconsIcon icon={ArrowUpRightIcon} className="w-6 h-6" />
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 bg-[var(--color-paper-2)]">
                <p className="font-body text-[var(--color-ink-2)] leading-relaxed text-lg mb-8">
                  {project.description[lang]}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-[var(--color-ink)] text-[var(--color-ink)] bg-[var(--color-paper)]">
                      {typeof tag === 'object' ? tag[lang] : tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
