import React, { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRightIcon } from '@hugeicons/core-free-icons';
import { YoutubeIcon as Youtube } from './SocialIcons';
import { useApp } from './AppContext';
import { portfolioData } from '../data/portfolioData';

export default function SocialMediaSection() {
  const { lang } = useApp();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const channels = [
    {
      id: 'youtube',
      name: 'YouTube',
      handle: '@kat.thanhtungg',
      url: portfolioData.profile.youtube,
      icon: Youtube,
      colorClass: 'group-hover:border-red-500/30 group-hover:shadow-[0_16px_48px_-12px_rgba(239,68,68,0.15)] dark:group-hover:shadow-[0_16px_48px_-12px_rgba(239,68,68,0.25)]',
      badgeColor: 'bg-red-500/10 text-red-500 dark:bg-red-500/20',
      tagVi: 'Vlog & Ẩm thực',
      tagEn: 'Vlog & Food',
      descVi: 'Nơi tôi chia sẻ những trải nghiệm khám phá ẩm thực độc đáo, các món ăn ngon cùng những thước phim vlog xoay quanh cuộc sống thường ngày.',
      descEn: 'My space for sharing exciting food reviews, culinary discoveries, and personal daily life vlogs.',
      topicsVi: ['Vlog đời thường', 'Review ẩm thực', 'Khám phá quán ngon'],
      topicsEn: ['Daily Life Vlogs', 'Food Reviews', 'Culinary Discoveries']
    }
  ];

  return (
    <section 
      id="media" 
      ref={sectionRef}
      className="py-32 px-6 md:px-8 max-w-6xl mx-auto overflow-hidden math-grid"
    >
      {/* Section Header */}
      <div className="mb-20 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-[9px] text-accent-violet font-semibold tracking-wider uppercase mb-4 font-mono">
          {lang === 'vi' ? "Kênh truyền thông" : "Content & Media"}
        </span>
        <h2 className="font-display font-black text-4xl md:text-6xl text-neutral-900 dark:text-white tracking-tight leading-none mb-6">
          {lang === 'vi' ? (
            <>
              SÁNG TẠO <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Nội Dung.</span>
            </>
          ) : (
            <>
              CONTENT <br />
              <span className="font-sans italic font-normal text-neutral-400 dark:text-neutral-500">Creation.</span>
            </>
          )}
        </h2>
        <p className="max-w-md text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans font-light">
          {lang === 'vi'
            ? "Bên cạnh viết code, tôi đam mê chia sẻ tri thức công nghệ và hành trình học tập cá nhân tới cộng đồng thông qua các nội dung số."
            : "Beyond software development, I build digital assets and logs sharing my tech journey and math knowledge with the developer community."}
        </p>
      </div>

      {/* Media Cards Grid */}
      <div className="flex justify-center items-stretch w-full">
        {channels.map((chan, idx) => {
          const Icon = chan.icon;
          return (
            <div
              key={chan.id}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`group w-full max-w-xl transform transition-all duration-1000 ease-out-custom ${
                inView ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-16 opacity-0 blur-md'
              }`}
            >
              <div 
                className={`block blueprint-card h-full ${chan.colorClass}`}
              >
                <div className="blueprint-inner p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden bg-white/40 dark:bg-neutral-950/45 backdrop-blur-md">
                  {/* Grid Position Coordinates */}
                  <div className="absolute top-4 right-4 font-mono text-[7px] text-neutral-400 dark:text-neutral-600 pointer-events-none select-none">
                    [MEDIA_CHAN_0{idx + 1} // {chan.name.toUpperCase()}]
                  </div>

                  <div>
                    {/* Header Info */}
                    <div className="flex items-center justify-between mb-8">
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${chan.badgeColor}`}>
                        {lang === 'vi' ? chan.tagVi : chan.tagEn}
                      </span>
                      <a 
                        href={chan.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-8 h-8 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:bg-[#ff0000]/10 hover:text-[#ff0000] hover:border-[#ff0000]/30 transition-all duration-300 z-10"
                      >
                        <HugeiconsIcon icon={ArrowUpRightIcon} className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
 
                    {/* Channel Title */}
                    <a 
                      href={chan.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-4.5 mb-6 group/title w-fit relative z-10"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center text-neutral-800 dark:text-neutral-200 group-hover/title:bg-[#ff0000]/10 group-hover/title:text-[#ff0000] group-hover/title:border-[#ff0000]/30 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white tracking-tight group-hover/title:text-[#ff0000] transition-colors duration-300">
                          {chan.name}
                        </h3>
                        <p className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 group-hover/title:text-neutral-500 transition-colors duration-300">
                          {chan.handle}
                        </p>
                      </div>
                    </a>

                    {/* Channel Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans font-light mb-8">
                      {lang === 'vi' ? chan.descVi : chan.descEn}
                    </p>
                  </div>

                  {/* Core Topics tags */}
                  <div className="mt-auto pt-6 border-t border-black/[0.04] dark:border-white/[0.04]">
                    <span className="block font-mono text-[8px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                      {lang === 'vi' ? 'Chủ đề chính:' : 'Core Topics:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(lang === 'vi' ? chan.topicsVi : chan.topicsEn).map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.06] text-neutral-500 dark:text-neutral-400 font-mono text-[9px]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
