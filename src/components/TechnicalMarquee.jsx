import React from 'react';
import { useApp } from './AppContext';

export default function TechnicalMarquee() {
  const { lang } = useApp();

  const techItems = [
    "ANTIGRAVITY",
    "CODEX",
    "KIRO AI",
    "ZCODE",
    lang === 'vi' ? "KỸ NGHỆ CỘNG TÁC AI" : "AI-AUGMENTED ENGINEERING",
    "REACT & VITE",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "DEXIE.JS",
    "SUPABASE",
    "PWA (OFFLINE-FIRST)",
    lang === 'vi' ? "TOÁN TIN HỌC" : "COMPUTATIONAL MATH",
    lang === 'vi' ? "TƯ DUY THUẬT TOÁN" : "ALGORITHMIC LOGIC",
    "GIT & GITHUB"
  ];

  return (
    <div className="relative w-full overflow-hidden border-y border-black/[0.04] dark:border-white/[0.04] py-5 bg-black/[0.01] dark:bg-white/[0.01] my-16 pointer-events-none select-none">
      {/* Gradient overlay for fading edges */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap items-center">
        {/* First list of items */}
        <div className="flex shrink-0 items-center gap-12 px-6 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
          {techItems.map((item, index) => (
            <React.Fragment key={`marquee-1-${index}`}>
              <span>{item}</span>
              <span className="text-accent-violet opacity-65 font-sans font-normal">∮</span>
            </React.Fragment>
          ))}
        </div>
        {/* Second list of items (identical for seamless looping) */}
        <div className="flex shrink-0 items-center gap-12 px-6 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase" aria-hidden="true">
          {techItems.map((item, index) => (
            <React.Fragment key={`marquee-2-${index}`}>
              <span>{item}</span>
              <span className="text-accent-violet opacity-65 font-sans font-normal">∮</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
