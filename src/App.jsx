import React, { useState, useEffect } from 'react';
import FloatingNavbar from './components/FloatingNavbar';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import TechnicalMarquee from './components/TechnicalMarquee';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactForm from './components/ContactForm';
import MathUniverseEasterEgg from './components/MathUniverseEasterEgg';
import { AppProvider, useApp } from './components/AppContext';
import { portfolioData } from './data/portfolioData';

function AppContent() {
  const { lang, easterEggActive, setEasterEggActive } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-body select-none transition-colors duration-300">
      {/* Hallmark Floating Menu */}
      <FloatingNavbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full">
        <HeroSection />
        <BentoGrid />
        <TechnicalMarquee />
        <ExperienceTimeline />
        <ContactForm />
      </main>

      {/* Footer */}
      <footer className="w-full border-t-[3px] border-[var(--color-rule)] bg-[var(--color-ink)] text-[var(--color-paper)] p-6 md:p-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm leading-relaxed">
          
          <div>
            <p className="font-display font-black text-2xl uppercase tracking-tighter mb-4">{portfolioData.profile.fullName}.</p>
            <p className="text-[var(--color-ink-3)] uppercase tracking-widest text-xs mb-2">
              {lang === 'vi' ? 'ĐỊA ĐIỂM' : 'LOCATION'}
            </p>
            <p className="text-[var(--color-paper-2)]">
              {lang === 'vi' ? 'Việt Nam / TP. Hồ Chí Minh' : 'Vietnam / HCMC'}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <p className="text-[var(--color-ink-3)] uppercase tracking-widest text-xs mb-2 w-full md:text-right">Index</p>
            <div className="flex flex-col gap-2 w-full md:items-end">
              {portfolioData.profile.github && <a href={portfolioData.profile.github} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)] transition-colors inline-block w-fit">GitHub ↗</a>}
              {portfolioData.profile.linkedin && <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)] transition-colors inline-block w-fit">LinkedIn ↗</a>}
              {portfolioData.profile.facebook && <a href={portfolioData.profile.facebook} target="_blank" rel="noreferrer" className="hover:text-[var(--color-accent)] transition-colors inline-block w-fit">Facebook ↗</a>}
            </div>
            <p className="text-[var(--color-ink-3)] mt-auto pt-8">
              © {new Date().getFullYear()} {lang === 'vi' ? 'BẢN QUYỀN ĐƯỢC BẢO LƯU.' : 'ALL RIGHTS RESERVED.'}
            </p>
          </div>

        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 bg-[var(--color-paper)] border-[3px] border-[var(--color-rule)] p-3 shadow-[4px_4px_0_var(--color-rule)] hover:bg-[var(--color-rule)] hover:text-[var(--color-paper)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 ${
          showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>

      {/* Easter Egg Overlay */}
      {easterEggActive && (
        <MathUniverseEasterEgg onClose={() => setEasterEggActive(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
