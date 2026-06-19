import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useApp } from './AppContext';

export default function ExperienceTimeline() {
  const { lang } = useApp();
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-32 px-6 md:px-8 max-w-4xl mx-auto overflow-hidden math-grid"
    >
      {/* Section Header */}
      <div className="mb-20 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-accent-emerald font-semibold tracking-wider uppercase mb-4">
          {lang === 'vi' ? "Cột mốc phát triển" : "Journey & Milestones"}
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none mb-6">
          {lang === 'vi' ? (
            <>
              HÀNH TRÌNH <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Phát Triển.</span>
            </>
          ) : (
            <>
              MY GROWTH <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Journey.</span>
            </>
          )}
        </h2>
        <p className="max-w-md text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
          {lang === 'vi'
            ? "Quá trình tích lũy tư duy toán học tại giảng đường và phát triển dự án công nghệ cá nhân."
            : "My path of acquiring mathematical logic in university and building my personal technology project."}
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 md:pl-10 border-l border-black/[0.08] dark:border-white/[0.1] flex flex-col gap-12">
        {/* Glow Line Indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-violet via-accent-cyan to-transparent pointer-events-none" />

        {portfolioData.experience.map((item, idx) => (
          <div
            key={idx}
            style={{
              transitionDelay: `${idx * 150}ms`
            }}
            className={`relative transform transition-all duration-1000 ease-out-custom ${
              inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
            }`}
          >
            {/* Dot Node Indicator */}
            <div className="absolute -left-[31px] md:-left-[47px] top-2.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-accent-cyan flex items-center justify-center transition-colors duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet dark:bg-white animate-pulse" />
            </div>

            {/* Timeline Card */}
            <div className="blueprint-card">
              <div className="blueprint-inner p-6 md:p-8 relative overflow-hidden">
                
                <div className="absolute top-4 right-4 font-mono text-[7px] text-neutral-400 dark:text-neutral-600 pointer-events-none select-none">
                  [T_COORD_0{idx + 1}]
                </div>

                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white tracking-tight">
                      {item.role[lang]}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
                      {typeof item.company === 'object' ? item.company[lang] : item.company}
                    </p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-[10px] text-accent-emerald font-medium uppercase tracking-wider w-max font-mono">
                    {item.duration[lang]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light">
                  {item.description[lang]}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
