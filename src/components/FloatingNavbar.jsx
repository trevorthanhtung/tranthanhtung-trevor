import React from 'react';
import { useApp } from './AppContext';
import { portfolioData } from '../data/portfolioData';
import { Sun01Icon, Moon01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function FloatingNavbar() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();

  const navLinks = [
    { name: lang === 'vi' ? "Tổng quan" : "Overview", href: "#hero" },
    { name: lang === 'vi' ? "Dự án" : "Projects", href: "#projects" },
    { name: lang === 'vi' ? "Kinh nghiệm" : "Experience", href: "#experience" },
    { name: lang === 'vi' ? "Truyền thông" : "Media", href: "#media" },
    { name: lang === 'vi' ? "Liên hệ" : "Contact", href: "#contact" }
  ];

  return (
    <header className="w-full bg-[var(--color-paper)] border-b-[3px] border-[var(--color-rule)] z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <a href="#hero" className="font-display font-extrabold text-2xl uppercase tracking-tighter text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
          {portfolioData.profile.lastName}.
        </a>

        {/* Links row */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-widest font-semibold">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline decoration-2 underline-offset-4 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="font-mono text-sm font-bold uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
          >
            {lang === 'vi' ? 'EN' : 'VI'}
          </button>
          
          <button 
            onClick={toggleTheme}
            className="text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <HugeiconsIcon icon={Sun01Icon} className="w-5 h-5" /> : <HugeiconsIcon icon={Moon01Icon} className="w-5 h-5" />}
          </button>
          
          {/* CTA */}
          <a href="#projects" className="hidden md:flex btn-brutal-primary !px-6 !py-2 !text-sm">
            {lang === 'vi' ? 'Khám phá' : 'Explore'}
          </a>
        </div>
      </div>
    </header>
  );
}
